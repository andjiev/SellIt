namespace SellIt.Services.User
{
    using SellIt.Models.User;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IUserService
    {
        Task<UserDto> GetUserData();

        Task<List<UserDto>> GetAllUserDetails();

        Task<UserManagerDto> CreateUser(CreateUserRequest request);        

        Task<UserManagerDto> LoginUser(LoginUserRequest request);

        Task UpdateUserProfile(UpdateUserProfileRequest request);

        Task UpdateUserPassword(UpdateUserPasswordRequest request);

        Task UpdateUserRole(UpdateUserRoleRequest request);
    }
}
