using SellIt.Models.User;
using SellIt.Services.User;
using SellIt.Web.API.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Routing;

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

        [HttpGet]
        [Route("")]
        [CustomAuthorize]
        public async Task<UserDto> GetUserData()
        {
            UserDto userData = await _userService.GetUserData();
            return userData;
        }

        [HttpPost]
        [Route("")]
        [AllowAnonymous]
        public async Task<string> CreateUser([FromBody]CreateUserRequest request)
        {
            string authToken = await _userService.CreateUser(request);
            return authToken;
        }        

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<string> LoginUser([FromBody]LoginUserRequest request)
        {
            string authToken = await _userService.LoginUser(request);
            return authToken;
        }
    }
}
