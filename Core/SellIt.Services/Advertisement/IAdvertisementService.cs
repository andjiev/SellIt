namespace SellIt.Services.Advertisement
{
    using SellIt.Models.Advertisement;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IAdvertisementService
    {
        Task<List<AdvertisementDto>> GetAllActiveAdvertisements();

        Task CreateCarAdvertisement(CarAdvertisementRequest request);

        Task CreateMobileAdvertisement(MobileAdvertisementRequest request);
    }
}
