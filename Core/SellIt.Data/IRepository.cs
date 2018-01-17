namespace SellIt.Data
{
    using System.Linq;

    public interface IRepository<T> where T : class
    {
        IQueryable<T> All();

        void Insert(T entityToInsert);

        void Update(T entityToUpdate);

        void Delete(T entityToDelete);
    }
}
