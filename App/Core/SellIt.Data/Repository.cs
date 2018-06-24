using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SellIt.Data
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly SellItDbContext _context;
        private readonly DbSet<T> _dbSet;

        public Repository(SellItDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public IQueryable<T> All()
        {
            return _dbSet;
        }        

        public void Insert(T entityToInsert)
        {
            _dbSet.Add(entityToInsert);
        }

        public void Update(T entityToUpdate)
        {
            _dbSet.Attach(entityToUpdate);
            _context.Entry(entityToUpdate).State = EntityState.Modified;
        }

        public void Delete(T entityToDelete)
        {
            if (_context.Entry(entityToDelete).State == EntityState.Detached)
            {
                _dbSet.Attach(entityToDelete);
            }

            _dbSet.Remove(entityToDelete);
        }
    }
}
