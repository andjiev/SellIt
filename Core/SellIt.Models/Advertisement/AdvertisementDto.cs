using System;

namespace SellIt.Models.Advertisement
{
    public class AdvertisementDto
    {
        public Guid Uid { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? DeletedOn { get; set; }

        public AdvertisementCategory AdvertisementCategory { get; set; }
    }
}
 