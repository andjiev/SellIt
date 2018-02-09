namespace SellIt.Services.User
{
    using Microsoft.IdentityModel.Tokens;
    using SellIt.Data;
    using SellIt.Models.CurrentUser;
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

    public class UserService : IUserService
    {
        public readonly IUnitOfWork _unitOfWork;

        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<string> CreateUser(CreateUserRequest request)
        {
            User user = new User
            {
                Uid = Guid.NewGuid(),
                CreatedOn = DateTime.Now,
                Name = request.Name,
                Email = request.Email,
                Password = request.Password,
                City = request.City,
                Phone = request.Phone
            };

            _unitOfWork.Users.Insert(user);
            await _unitOfWork.SaveAsync();

            return GenerateTokenForUser(user.Uid);
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

        public async Task<string> LoginUser(LoginUserRequest request)
        {
            User user = await _unitOfWork.Users.All()
                 .FirstOrDefaultAsync(x => x.Email == request.Email && x.Password == request.Password);

            if (user == null)
            {
                throw new Exception();
            }

            return GenerateTokenForUser(user.Uid);      
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
