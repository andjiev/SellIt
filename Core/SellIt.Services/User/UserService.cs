namespace SellIt.Services.User
{
    using SellIt.Data;
    using SellIt.Models.User;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    public class UserService : IUserService
    {
        public readonly IUnitOfWork _unitOfWork;

        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Guid> CreateUser(CreateUserRequest request)
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

            return user.Uid;
        }
    }
}
