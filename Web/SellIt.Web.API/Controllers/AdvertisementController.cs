using SellIt.Models.Advertisement;
using SellIt.Services.Advertisement;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace SellIt.Web.API.Controllers
{
    [RoutePrefix("api/advertisement")]
    public class AdvertisementController : ApiController
    {
        private readonly IAdvertisementService _advertisementService;

        public AdvertisementController(IAdvertisementService advertisementService)
        {
            _advertisementService = advertisementService;
        }

        [Route("")]
        [HttpGet]
        public async Task<List<AdvertisementDto>> GetAllActiveAdvertisements()
        {
            List<AdvertisementDto> response = await _advertisementService.GetAllActiveAdvertisements();
            return response;
        }

        [HttpPost]
        [Route("car")]
        public async Task CreateCarAdvertisement([FromBody]CarAdvertisementRequest request)
        {
            await _advertisementService.CreateCarAdvertisement(request);
        }

        [HttpPost]
        [Route("phone")]
        public async Task CreatePhoneAdvertisement([FromBody]PhoneAdvertisementRequest request)
        {
            await _advertisementService.CreatePhoneAdvertisement(request);
        }
    }
}