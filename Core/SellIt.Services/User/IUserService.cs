namespace SellIt.Services.User
{
    using SellIt.Models.User;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IUserService
    {
        Task CreateUser(CreateUserRequest request);
    }
}
