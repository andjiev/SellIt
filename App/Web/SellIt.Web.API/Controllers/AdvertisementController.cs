using SellIt.Models.Advertisement;
using SellIt.Models.Common;
using SellIt.Services.Advertisement;
using SellIt.Web.API.Extensions;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SellIt.Web.API.Controllers
{
    [RoutePrefix("api/advertisements")]
    public class AdvertisementController : ApiController
    {
        private readonly IAdvertisementService _advertisementService;

        public AdvertisementController(IAdvertisementService advertisementService)
        {
            _advertisementService = advertisementService;
        }

        [HttpGet]
        [Route("")]
        [AllowAnonymous]
        public async Task<ListResultDto<AdvertisementDto>> GetAllActiveAdvertisements(int? page, int? pageSize, int? category, string searchString, string location)
        {
            Paging paging = new Paging(page, pageSize, category, searchString, location);
            ListResultDto<AdvertisementDto> response = await _advertisementService.GetAllActiveAdvertisements(paging);
            return response;
        }

        [HttpGet]
        [Route("{advertUid:guid}")]
        [AllowAnonymous]
        public async Task<AdvertisementDetails> GetAdvertisementDetails([FromUri]Guid advertUid)
        {
            AdvertisementDetails response = await _advertisementService.GetAdvertisementDetails(advertUid);
            return response;
        }

        [HttpPost]
        [Route("car")]
        [CustomAuthorize]
        public async Task<HttpResponseMessage> CreateCarAdvertisement()
        {
            await _advertisementService.CreateCarAdvertisement(HttpContext.Current.Request);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpPost]
        [Route("mobile")]
        [CustomAuthorize]
        public async Task<HttpResponseMessage> CreateMobileAdvertisement()
        {
            await _advertisementService.CreateMobileAdvertisement(HttpContext.Current.Request);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [HttpDelete]
        [Route("{advertUid:guid}")]
        [CustomAuthorize]
        public async Task<HttpResponseMessage> DeleteAdvertisement([FromUri] Guid advertUid)
        {
            await _advertisementService.DeleteAdvertisement(advertUid);
            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}