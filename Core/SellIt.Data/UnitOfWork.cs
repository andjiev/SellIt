using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SellIt.Data
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        #region Fields

        private readonly SellItDbContext _context;

        private IRepository<User> _users;

        private IRepository<Advertisement> _advertisements;

        private IRepository<CarAdvertisement> _carAdvertisements;

        private IRepository<PhoneAdvertisement> _phoneAdvertisements;

        #endregion

        #region Properties

        public IRepository<User> Users => _users ?? (_users = new Repository<User>(_context));

        public IRepository<Advertisement> Advertisements => _advertisements ?? (_advertisements = new Repository<Advertisement>(_context));

        public IRepository<CarAdvertisement> CarAdvertisements => _carAdvertisements ?? (_carAdvertisements = new Repository<CarAdvertisement>(_context));

        public IRepository<PhoneAdvertisement> PhoneAdvertisements => _phoneAdvertisements ?? (_phoneAdvertisements = new Repository<PhoneAdvertisement>(_context));

        #endregion

        public UnitOfWork(SellItDbContext context)
        {
            _context = context;
        }

        public async Task<int> SaveAsync()
        {
            try
            {
                return await _context.SaveChangesAsync();
            }
            catch (DbEntityValidationException e)
            {
                StringBuilder sb = new StringBuilder();
                foreach (var eve in e.EntityValidationErrors)
                {
                    sb.AppendFormat("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    sb.Append(Environment.NewLine);

                    foreach (var ve in eve.ValidationErrors)
                    {
                        sb.AppendFormat("- Property: \"{0}\", Error: \"{1}\"", ve.PropertyName, ve.ErrorMessage);
                        sb.Append(Environment.NewLine);
                    }
                }
                string errorMessage = sb.ToString();
                throw new DbEntityValidationException(errorMessage, e);
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Dispose(bool disposing)
        {
            _context.Dispose();
        }
    }
}
