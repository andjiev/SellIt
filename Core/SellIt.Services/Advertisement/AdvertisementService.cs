namespace SellIt.Services.Advertisement
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using SellIt.Data;
    using SellIt.Models.Advertisement;

    public class AdvertisementService : IAdvertisementService
    {
        public readonly IUnitOfWork _unitOfWork;

        public AdvertisementService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<AdvertisementDto>> GetAllActiveAdvertisements()
        {
            List<AdvertisementDto> advertisements = await _unitOfWork.Advertisements.All()
                .Where(x => x.DeletedOn == null)
                .Select(x => new AdvertisementDto
                {
                    Uid = x.Uid,
                    CreatedOn = x.CreatedOn,
                    DeletedOn = x.DeletedOn,
                    AdvertisementCategory = (AdvertisementCategory)x.Category
                }).ToListAsync();

            return advertisements;
        }

        public async Task CreateCarAdvertisement(CarAdvertisementRequest request)
        {
            CarAdvertisement carAdvertisement = new CarAdvertisement
            {
                Advertisement = new Advertisement
                {
                    Uid = Guid.NewGuid(),
                    CreatedOn = DateTime.Now,
                    Category = (int)AdvertisementCategory.Car,
                    UserFk = 1
                },
                Year = request.Year
            };

            _unitOfWork.CarAdvertisements.Insert(carAdvertisement);
            await _unitOfWork.SaveAsync();
        }

        //public async Task<CarAdvertisementDto> GetCarAdvertisement(Guid advertisementUid)
        //{
        //    CarAdvertisement advertisement = _unitOfWork.CarAdvertisements.All()
        //        .FirstOrDefault(x => x.Advertisement.Uid == advertisementUid);

        //    if(advertisement == null)
        //    {
        //        throw new Exception();
        //    }

        //    CarAdvertisementDto adcertisementDto = new CarAdvertisementDto
        //    {
               
        //    }
        //}

        public async Task CreatePhoneAdvertisement(PhoneAdvertisementRequest request)
        {
            PhoneAdvertisement phoneAdvertisement = new PhoneAdvertisement
            {
                Advertisement = new Advertisement
                {
                    Uid = Guid.NewGuid(),
                    CreatedOn = DateTime.Now,
                    Category = (int)AdvertisementCategory.Phone,
                    UserFk = 1
                },
                Model = request.Model
            };

            _unitOfWork.PhoneAdvertisements.Insert(phoneAdvertisement);
            await _unitOfWork.SaveAsync();
        }
    }
}
