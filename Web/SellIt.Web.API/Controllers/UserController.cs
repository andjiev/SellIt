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

        [HttpPost]
        [Route("")]
        [AllowAnonymous]
        public async Task<Guid> CreateUser([FromBody]CreateUserRequest request)
        {
            Guid userUid = await _userService.CreateUser(request);
            return userUid;
        }


        [HttpGet]
        [Route("")]
        [Authorize(Roles ="Admin")]
        public async Task<UserDto> GetUserData()
        {
            var c = RequestContext.Principal.Identity;


            UserDto userData = await _userService.GetUserData();
            return userData;
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
