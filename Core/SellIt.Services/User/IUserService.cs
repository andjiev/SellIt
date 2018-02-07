namespace SellIt.Services.User
{
    using SellIt.Models.User;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IUserService
    {
        Task<Guid> CreateUser(CreateUserRequest request);

        Task<Guid> LoginUser(LoginUserRequest request);
    }
}
