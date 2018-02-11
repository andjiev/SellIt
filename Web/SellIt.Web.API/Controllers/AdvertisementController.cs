using SellIt.Models.Advertisement;
using SellIt.Services.Advertisement;
using SellIt.Web.API.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<List<AdvertisementDto>> GetAllActiveAdvertisements()
        {
            List<AdvertisementDto> response = await _advertisementService.GetAllActiveAdvertisements();
            return response;
        }

        [HttpPost]
        [Route("car")]
        [CustomAuthorize]
        public async Task CreateCarAdvertisement([FromBody]CarAdvertisementRequest request)
        {
            await _advertisementService.CreateCarAdvertisement(request);
        }

        [HttpPost]
        [Route("mobile")]
        [CustomAuthorize]
        public async Task CreateMobileAdvertisement([FromBody]MobileAdvertisementRequest request)
        {
            await _advertisementService.CreateMobileAdvertisement(request);
        }
    }
}