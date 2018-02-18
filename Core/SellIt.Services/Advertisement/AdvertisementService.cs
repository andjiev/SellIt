namespace SellIt.Services.Advertisement
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Linq;
    using System.Runtime.Caching;
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
                    Category = x.Category,
                    Price = x.Price,
                    Location = x.User.City
                }).ToListAsync();


            List<AdvertisementImage> advertImages = await _unitOfWork.AdvertisementImages.All().ToListAsync();

            foreach (AdvertisementDto advertDto in advertisements)
            {
                AdvertisementImage image = advertImages.FirstOrDefault(x => x.Advertisement.Uid == advertDto.Uid);

                if (image != null)
                {
                    advertDto.base64Image = Convert.ToBase64String(image.ImageContent);
                }
            }

            return advertisements;
        }

        public async Task<AdvertisementDetails> GetAdvertisementDetails(Guid advertUid)
        {
            Advertisement advert = await _unitOfWork.Advertisements.All()
                    .FirstOrDefaultAsync(x => x.Uid == advertUid);

            AdvertisementDetails advertisementDetails = new AdvertisementDetails();

            if (advert == null)
            {
                throw new Exception();
            }

            switch ((AdvertisementCategory)advert.Category)
            {
                case AdvertisementCategory.Mobile:
                    advertisementDetails = GetMobileAdvertisement(advert);
                    break;
                case AdvertisementCategory.Car:
                    advertisementDetails = GetCarAdvertisement(advert);
                    break;
            }

            advertisementDetails.Base64Images = _unitOfWork.AdvertisementImages.All()
                    .Where(x => x.AdvertisementFk == advert.Id).ToList()
                    .Select(x => Convert.ToBase64String(x.ImageContent))
                    .ToArray();

            return advertisementDetails;
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

        public async Task DeleteAdvertisement(Guid advertUid)
        {
            Advertisement advertisement = await _unitOfWork.Advertisements.All()
                    .FirstOrDefaultAsync(x => x.Uid == advertUid);

            if (advertisement == null)
            {
                throw new Exception();
            }

            CurrentUser currentUser = MemoryCache.Default["currentUser"] as CurrentUser;

            if (currentUser.Id != advertisement.User.Id)
            {
                throw new Exception();
            }

            _unitOfWork.Advertisements.Delete(advertisement);
            await _unitOfWork.SaveAsync();
        }

        private AdvertisementDetails GetCarAdvertisement(Advertisement advert)
        {
            AdvertisementDetails advertisementDetails = _unitOfWork.CarAdvertisements.All()
                        .Where(x => x.AdvertisementFk == advert.Id)
                        .Select(s => new AdvertisementDetails
                        {
                            Title = advert.Title,
                            CreatedOn = advert.CreatedOn,
                            Type = advert.Type,
                            Category = advert.Category,
                            Price = advert.Price,
                            Description = advert.Description,
                            Name = advert.User.Name,
                            Location = advert.User.City,
                            Phone = advert.User.Phone,
                            Brand = s.Brand,
                            Model = s.Model,
                            Memory = string.Empty,
                            Color = s.Color,
                            Body = s.Body,
                            Year = s.Year,
                            KmTraveled = s.KmTraveled
                        }).First();

            return advertisementDetails;
        }

        private AdvertisementDetails GetMobileAdvertisement(Advertisement advert)
        {
            AdvertisementDetails advertisementDetails = _unitOfWork.MobileAdvertisements.All()
                        .Where(x => x.AdvertisementFk == advert.Id)
                        .Select(s => new AdvertisementDetails
                        {
                            Title = advert.Title,
                            CreatedOn = advert.CreatedOn,
                            Type = advert.Type,
                            Category = advert.Category,
                            Price = advert.Price,
                            Description = advert.Description,
                            Name = advert.User.Name,
                            Location = advert.User.City,
                            Phone = advert.User.Phone,
                            Brand = s.Brand,
                            Model = s.Model,
                            Memory = s.Memory,
                            Color = s.Color,
                            Body = string.Empty
                        }).First();

            return advertisementDetails;
        }
    }
}
