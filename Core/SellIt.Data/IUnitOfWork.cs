using System;
using System.Threading.Tasks;

namespace SellIt.Data
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<User> Users { get; }

        IRepository<Advertisement> Advertisements { get; }

        IRepository<CarAdvertisement> CarAdvertisements { get; }

        IRepository<PhoneAdvertisement> PhoneAdvertisements { get; }

        Task<int> SaveAsync();
    }
}
