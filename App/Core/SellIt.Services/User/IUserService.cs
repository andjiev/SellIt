namespace SellIt.Services.User
{
    using SellIt.Models.User;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IUserService
    {
        Task<UserDto> GetUserData();

        Task<string> CreateUser(CreateUserRequest request);        

        Task<string> LoginUser(LoginUserRequest request);

        Task UpdateUserProfile(UpdateUserProfileRequest request);

        Task UpdateUserPassword(UpdateUserPasswordRequest request);
    }
}
