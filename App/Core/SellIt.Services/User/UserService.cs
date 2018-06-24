namespace SellIt.Services.User
{
    using Microsoft.IdentityModel.Tokens;
    using SellIt.Data;
    using SellIt.Models.CurrentUser;
    using SellIt.Models.Exceptions;
    using SellIt.Models.User;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Runtime.Caching;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;
    using System.Web;

    public class UserService : IUserService
    {
        public readonly IUnitOfWork _unitOfWork;

        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<UserDto> GetUserData()
        {
            CurrentUser currentUser = MemoryCache.Default[$"currentUser"] as CurrentUser;

            UserDto userDto = await _unitOfWork.Users.All()
                .Where(x => x.Uid == currentUser.Uid)
                .Select(s => new UserDto
                {
                    Name = s.Name,
                    City = s.City,
                    CreatedOn = s.CreatedOn,
                    Email = s.Email,
                    Phone = s.Phone
                }).FirstOrDefaultAsync();

            return userDto;
        }

        public async Task<List<UserDto>> GetAllUserDetails()
        {
            List<UserDto> users = await _unitOfWork.Users.All()
               .Select(s => new UserDto
               {
                   Name = s.Name,
                   City = s.City,
                   CreatedOn = s.CreatedOn,
                   Email = s.Email,
                   Phone = s.Phone
               }).ToListAsync();

            return users;
        }

        public async Task<UserManagerDto> CreateUser(CreateUserRequest request)
        {
            bool userEmailExists = _unitOfWork.Users.All().Any(x => x.Email == request.Email);

            if (userEmailExists)
            {
                throw new BadRequestException();
            }

            User user = new User
            {
                Uid = Guid.NewGuid(),
                CreatedOn = DateTime.Now,
                Name = request.Name,
                Email = request.Email,
                Password = request.Password,
                City = request.City,
                Phone = request.Phone,
                Role = (int)UserRole.User
            };

            _unitOfWork.Users.Insert(user);
            await _unitOfWork.SaveAsync();

            string authToken = GenerateTokenForUser(user.Uid);

            return new UserManagerDto
            {
                AuthToken = authToken,
                Role = user.Role
            };
        }

        public async Task<UserManagerDto> LoginUser(LoginUserRequest request)
        {
            User user = await _unitOfWork.Users.All()
                 .FirstOrDefaultAsync(x => x.Email == request.Email && x.Password == request.Password);

            if (user == null)
            {
                throw new NotFoundException();
            }
            string authToken = GenerateTokenForUser(user.Uid);

            return new UserManagerDto
            {
                AuthToken = authToken,
                Role = user.Role
            };
        }

        public async Task UpdateUserProfile(UpdateUserProfileRequest request)
        {
            CurrentUser currentUser = MemoryCache.Default["currentUser"] as CurrentUser;

            User user = await _unitOfWork.Users.All()
                .FirstOrDefaultAsync(x => x.Id == currentUser.Id);

            if (user == null)
            {
                throw new NotFoundException();
            }

            bool userEmailExists = _unitOfWork.Users.All()
                .Any(x => x.Email == request.Email && x.Id != user.Id);

            if (userEmailExists)
            {
                throw new BadRequestException();
            }

            user.Name = request.Name;
            user.Email = request.Email;
            user.City = request.City;
            user.Phone = request.Phone;

            _unitOfWork.Users.Update(user);
            await _unitOfWork.SaveAsync();
        }

        public async Task UpdateUserPassword(UpdateUserPasswordRequest request)
        {
            CurrentUser currentUser = MemoryCache.Default["currentUser"] as CurrentUser;

            User user = await _unitOfWork.Users.All()
                .FirstOrDefaultAsync(x => x.Id == currentUser.Id);

            if (user == null)
            {
                throw new NotFoundException();
            }

            if (user.Password != request.CurrentPassword)
            {
                throw new BadRequestException();
            }

            user.Password = request.NewPassword;

            _unitOfWork.Users.Update(user);
            await _unitOfWork.SaveAsync();
        }

        public async Task UpdateUserRole(UpdateUserRoleRequest request)
        {
            User user = await _unitOfWork.Users.All()
                .FirstOrDefaultAsync(w => w.Email == request.Email);

            if (user == null)
            {
                throw new NotFoundException();
            }
            user.Role = request.Role;

            _unitOfWork.Users.Update(user);
            await _unitOfWork.SaveAsync();
        }

        private string GenerateTokenForUser(Guid userUid)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes("qKKy1ugpXrznGWOknVRt");

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, userUid.ToString())
                }),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
