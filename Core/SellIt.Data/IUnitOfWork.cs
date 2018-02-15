using System;
using System.Threading.Tasks;

namespace SellIt.Data
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<User> Users { get; }

        IRepository<Advertisement> Advertisements { get; }

        IRepository<CarAdvertisement> CarAdvertisements { get; }

        IRepository<MobileAdvertisement> MobileAdvertisements { get; }

        IRepository<AdvertisementImage> AdvertisementImages { get; }

        Task<int> SaveAsync();
    }
}
