namespace SellIt.Services.Advertisement
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.IO;
    using System.Linq;
    using System.Runtime.Caching;
    using System.Threading.Tasks;
    using System.Web;
    using Newtonsoft.Json;
    using SellIt.Data;
    using SellIt.Models.Advertisement;
    using SellIt.Models.Common;
    using SellIt.Models.CurrentUser;
    using SellIt.Models.Exceptions;

    public class AdvertisementService : IAdvertisementService
    {
        public readonly IUnitOfWork _unitOfWork;

        public AdvertisementService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ListResultDto<AdvertisementDto>> GetAllActiveAdvertisements(Paging paging)
        {
            List<Advertisement> advertisements = await _unitOfWork.Advertisements.All()
                .Where(w => (paging.Category == 0 || w.Category == paging.Category) &&
                    (string.IsNullOrEmpty(paging.SearchString) || w.Title.Contains(paging.SearchString)) &&
                    (string.IsNullOrEmpty(paging.Location) || w.User.City.Contains(paging.Location))).ToListAsync();

            List<AdvertisementDto> filteredAdvertisements = advertisements
                .OrderByDescending(x => x.CreatedOn)
                .Skip((paging.Page - 1) * paging.PageSize)
                .Take(paging.PageSize)
                .Select(x => new AdvertisementDto
                {
                    Uid = x.Uid,
                    CreatedOn = x.CreatedOn,
                    Title = x.Title,
                    Category = x.Category,
                    Price = x.Price,
                    Location = x.User.City
                }).ToList();

            if (filteredAdvertisements.Any())
            {
                List<AdvertisementImage> advertImages = await _unitOfWork.AdvertisementImages.All().ToListAsync();

                foreach (AdvertisementDto advertDto in filteredAdvertisements)
                {
                    AdvertisementImage image = advertImages.FirstOrDefault(x => x.Advertisement.Uid == advertDto.Uid);

                    if (image != null)
                    {
                        advertDto.base64Image = Convert.ToBase64String(image.ImageContent);
                    }
                }
            }

            return new ListResultDto<AdvertisementDto>()
            {
                List = filteredAdvertisements,
                TotalCount = advertisements.Count
            };
        }

        public async Task<AdvertisementDetails> GetAdvertisementDetails(Guid advertUid)
        {
            Advertisement advert = await _unitOfWork.Advertisements.All()
                    .FirstOrDefaultAsync(x => x.Uid == advertUid);

            AdvertisementDetails advertisementDetails = new AdvertisementDetails();

            if (advert == null)
            {
                throw new NotFoundException();
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

        public async Task CreateCarAdvertisement(HttpRequest request)
        {
            CurrentUser currentUser = MemoryCache.Default["currentUser"] as CurrentUser;

            if (currentUser == null)
            {
                throw new NotFoundException();
            }

            if (string.IsNullOrEmpty(request.Form["model"]))
            {
                throw new BadRequestException();
            }

            string modelValue = request.Form["model"];
            CarAdvertisementRequest model = JsonConvert.DeserializeObject<CarAdvertisementRequest>(modelValue);

            CarAdvertisement carAdvertisement = new CarAdvertisement
            {
                Advertisement = new Advertisement
                {
                    Uid = Guid.NewGuid(),
                    CreatedOn = DateTime.Now,
                    Category = (int)AdvertisementCategory.Car,
                    UserFk = currentUser.Id,
                    Title = model.Title,
                    Type = model.Type,
                    Description = model.Description,
                    Price = model.Price
                },
                Brand = model.Brand,
                Model = model.Model,
                Body = model.Body,
                Color = model.Color,
                Year = model.Year,
                KmTraveled = model.KmTraveled
            };

            for (int i = 0; i < request.Files.Count; ++i)
            {
                using (BinaryReader binaryReader = new BinaryReader(request.Files[i].InputStream))
                {
                    carAdvertisement.Advertisement.AdvertisementImages.Add(new AdvertisementImage
                    {
                        ImageContent = binaryReader.ReadBytes(request.Files[i].ContentLength)
                    });
                }
            }

            _unitOfWork.CarAdvertisements.Insert(carAdvertisement);
            await _unitOfWork.SaveAsync();
        }

        public async Task CreateMobileAdvertisement(HttpRequest request)
        {
            CurrentUser currentUser = MemoryCache.Default["currentUser"] as CurrentUser;

            if (currentUser == null)
            {
                throw new NotFoundException();
            }

            if (string.IsNullOrEmpty(request.Form["model"]))
            {
                throw new BadRequestException();
            }

            string modelValue = request.Form["model"];
            MobileAdvertisementRequest model = JsonConvert.DeserializeObject<MobileAdvertisementRequest>(modelValue);

            MobileAdvertisement mobileAdvertisement = new MobileAdvertisement
            {
                Advertisement = new Advertisement
                {
                    Uid = Guid.NewGuid(),
                    CreatedOn = DateTime.Now,
                    Category = (int)AdvertisementCategory.Mobile,
                    UserFk = currentUser.Id,
                    Title = model.Title,
                    Type = model.Type,
                    Description = model.Description,
                    Price = model.Price
                },
                Brand = model.Brand,
                Model = model.Model,
                Memory = model.Memory,
                Color = model.Color
            };

            for (int i = 0; i < request.Files.Count; ++i)
            {
                using (BinaryReader binaryReader = new BinaryReader(request.Files[i].InputStream))
                {
                    mobileAdvertisement.Advertisement.AdvertisementImages.Add(new AdvertisementImage
                    {
                        ImageContent = binaryReader.ReadBytes(request.Files[i].ContentLength)
                    });
                }
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
                throw new NotFoundException();
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
