using System;

namespace SellIt.Models.Advertisement
{
    public class AdvertisementDto
    {
        public Guid Uid { get; set; }

        public DateTime CreatedOn { get; set; }

        public string Title { get; set; }

        public AdvertisementCategory Category { get; set; }

        public int? Price { get; set; }

        public string Location { get; set; }
    }
}
 