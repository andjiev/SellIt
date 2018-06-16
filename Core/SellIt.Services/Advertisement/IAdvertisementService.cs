namespace SellIt.Services.Advertisement
{
    using SellIt.Models.Advertisement;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using System.Web;

    public interface IAdvertisementService
    {
        Task<List<AdvertisementDto>> GetAllActiveAdvertisements();

        Task<AdvertisementDetails> GetAdvertisementDetails(Guid advertUid);

        Task CreateCarAdvertisement(HttpRequest request);

        Task CreateMobileAdvertisement(HttpRequest request);

        Task DeleteAdvertisement(Guid advertUid);
    }
}
