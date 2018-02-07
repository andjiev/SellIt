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
        public async Task<Guid> CreateUser([FromBody]CreateUserRequest request)
        {
            Guid userUid = await _userService.CreateUser(request);
            return userUid;
        }

        [HttpPost]
        [Route("login")]
        public async Task<string> LoginUser([FromBody]LoginUserRequest request)
        {
            string authToken = await _userService.LoginUser(request);
            return authToken;
        }
    }
}
