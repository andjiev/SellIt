using SellIt.Models.User;
using SellIt.Services.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace SellIt.Web.API.Controllers
{
    [RoutePrefix("api/users")]
    public class UserController : ApiController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("")]
        public async Task CreateUser([FromBody]CreateUserRequest request)
        {
            await _userService.CreateUser(request);
        }

        //[HttpGet]
        //[Route("")]
        //public async Task<List<UserDto>> GetUsers()
        //{
        //    List<UserDto> users = await _userService.GetAllUsers();
        //    return users;
        //}
    }
}
