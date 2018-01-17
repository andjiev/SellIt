using System;
using System.Threading.Tasks;

namespace SellIt.Data
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<User> Users { get; }

        IRepository<Product> Products { get; }

        Task<int> SaveAsync();
    }
}
