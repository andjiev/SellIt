using SellIt.Data;
using SellIt.Models.CurrentUser;
using SellIt.Models.User;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.Caching;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace SellIt.Web.API.Extensions
{
    public class CustomAuthorize : AuthorizeAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            AuthenticationHeaderValue header = actionContext.Request.Headers.Authorization;

            if (header == null || header.Parameter == "null")
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                return;
            }

            JwtSecurityTokenHandler jwtHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken token = jwtHandler.ReadToken(header.Parameter) as JwtSecurityToken;

            if (token == null || token.ValidTo < DateTime.Now)
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                return;
            }

            Claim tokenClaim = token.Claims.FirstOrDefault();

            if (tokenClaim == null)
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                return;
            }

            SellItDbContext context = new SellItDbContext();

            CurrentUser currentUser = context.Users
                .Where(x => x.Uid == new Guid(tokenClaim.Value))
                .Select(s => new CurrentUser
                {
                    Id = s.Id,
                    Uid = s.Uid,
                    Role = s.Role
                }).FirstOrDefault();

            if (currentUser == null || (!string.IsNullOrEmpty(Roles) && !Roles.Contains(((UserRole)currentUser.Role).ToString())))
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                return;
            }

            CacheItemPolicy policy = new CacheItemPolicy
            {
                AbsoluteExpiration = DateTimeOffset.Now.AddMinutes(15)
            };

            MemoryCache.Default.Set("currentUser", currentUser, policy);
        }
    }
}