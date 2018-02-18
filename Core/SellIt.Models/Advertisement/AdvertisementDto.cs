using System;

namespace SellIt.Models.Advertisement
{
    public class AdvertisementDto
    {
        public Guid Uid { get; set; }

        public DateTime CreatedOn { get; set; }

        public string Title { get; set; }

        public int Category { get; set; }

        public int? Price { get; set; }

        public string Location { get; set; }

        public string base64Image { get; set; }
    }
}
 