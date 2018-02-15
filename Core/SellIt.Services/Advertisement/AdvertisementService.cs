namespace SellIt.Services.Advertisement
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Runtime.Caching;
    using System.Text;
    using System.Threading.Tasks;
    using SellIt.Data;
    using SellIt.Models.Advertisement;
    using SellIt.Models.CurrentUser;

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
                .OrderByDescending(x => x.CreatedOn)
                .Select(x => new AdvertisementDto
                {
                    Uid = x.Uid,
                    CreatedOn = x.CreatedOn,
                    Title = x.Title,
                    Category = (AdvertisementCategory)x.Category,
                    Price = x.Price,
                    Location = x.User.City
                }).ToListAsync();


            foreach (AdvertisementDto advertDto in advertisements)
            {
                AdvertisementImage image = await _unitOfWork.AdvertisementImages.All()
                    .FirstOrDefaultAsync(x => x.Advertisement.Uid == advertDto.Uid);

                if (image != null)
                {
                    advertDto.base64Image = Convert.ToBase64String(image.ImageContent);
                }                
            }

            return advertisements;
        }

        public async Task CreateCarAdvertisement(CarAdvertisementRequest request)
        {
            CurrentUser currentUser = MemoryCache.Default["currentUser"] as CurrentUser;

            if (currentUser == null)
            {
                throw new Exception();
            }

            CarAdvertisement carAdvertisement = new CarAdvertisement
            {
                Advertisement = new Advertisement
                {
                    Uid = Guid.NewGuid(),
                    CreatedOn = DateTime.Now,
                    Category = (int)AdvertisementCategory.Car,
                    UserFk = currentUser.Id,
                    Title = request.Title,
                    Type = request.Type,
                    Description = request.Description,
                    Price = request.Price
                },
                Brand = request.Brand,
                Model = request.Model,
                Body = request.Body,
                Color = request.Color,
                Year = request.Year,
                KmTraveled = request.KmTraveled
            };

            foreach (string base64Image in request.Base64Images)
            {
                carAdvertisement.Advertisement.AdvertisementImages.Add(new AdvertisementImage
                {
                    ImageContent = Convert.FromBase64String(base64Image)
                });
            }

            _unitOfWork.CarAdvertisements.Insert(carAdvertisement);
            await _unitOfWork.SaveAsync();
        }

        public async Task CreateMobileAdvertisement(MobileAdvertisementRequest request)
        {
            CurrentUser currentUser = MemoryCache.Default["currentUser"] as CurrentUser;

            if (currentUser == null)
            {
                throw new Exception();
            }

            MobileAdvertisement mobileAdvertisement = new MobileAdvertisement
            {
                Advertisement = new Advertisement
                {
                    Uid = Guid.NewGuid(),
                    CreatedOn = DateTime.Now,
                    Category = (int)AdvertisementCategory.Mobile,
                    UserFk = currentUser.Id,
                    Title = request.Title,
                    Type = request.Type,
                    Description = request.Description,
                    Price = request.Price
                },
                Brand = request.Brand,
                Model = request.Model,
                Memory = request.Memory,
                Color = request.Color
            };

            foreach (string base64Image in request.Base64Images)
            {
                mobileAdvertisement.Advertisement.AdvertisementImages.Add(new AdvertisementImage
                {
                    ImageContent = Convert.FromBase64String(base64Image)
                });
            }

            _unitOfWork.MobileAdvertisements.Insert(mobileAdvertisement);
            await _unitOfWork.SaveAsync();
        }
    }
}
