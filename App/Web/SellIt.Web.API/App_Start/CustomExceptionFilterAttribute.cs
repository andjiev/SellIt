using SellIt.Models.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Filters;

namespace SellIt.Web.API.App_Start
{
    public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            HttpStatusCode resultStatusCode = HttpStatusCode.InternalServerError;

            if (actionExecutedContext.Exception is NotFoundException)
            {
                resultStatusCode = HttpStatusCode.NotFound;
            }

            if(actionExecutedContext.Exception is BadRequestException)
            {
                resultStatusCode = HttpStatusCode.BadRequest;
            }


            actionExecutedContext.Response = actionExecutedContext.Request.CreateErrorResponse(resultStatusCode,
                actionExecutedContext.Exception.Message);
        }
    }
}