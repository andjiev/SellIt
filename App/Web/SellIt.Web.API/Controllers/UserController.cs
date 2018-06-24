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
        public async Task<UserManagerDto> CreateUser([FromBody] CreateUserRequest request)
        {
            UserManagerDto userManager = await _userService.CreateUser(request);
            return userManager;
        }

        [HttpPatch]
        [Route("")]
        [CustomAuthorize]
        public async Task<HttpResponseMessage> UpdateUserProfile([FromBody] UpdateUserProfileRequest request)
        {
            await _userService.UpdateUserProfile(request);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpGet]
        [Route("details")]
        [CustomAuthorize(Roles = "Administrator")]
        public async Task<List<UserDto>> GetAllUserDetails()
        {
            List<UserDto> users = await _userService.GetAllUserDetails();
            return users;
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<UserManagerDto> LoginUser([FromBody] LoginUserRequest request)
        {
            UserManagerDto userManager = await _userService.LoginUser(request);
            return userManager;
        }

        [HttpPatch]
        [Route("password")]
        [CustomAuthorize]
        public async Task<HttpResponseMessage> UpdateUserPassword([FromBody] UpdateUserPasswordRequest request)
        {
            await _userService.UpdateUserPassword(request);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPatch]
        [Route("settings")]
        [CustomAuthorize(Roles = "Administrator")]
        public async Task<HttpResponseMessage> UpdateUserRole([FromBody] UpdateUserRoleRequest request)
        {
            await _userService.UpdateUserRole(request);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
