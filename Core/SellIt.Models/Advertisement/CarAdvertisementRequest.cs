using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SellIt.Models.Advertisement
{
    public class CarAdvertisementRequest : AdvertisementRequest
    {
        public string Brand { get; set; }

        public string Model { get; set; }

        public string Body { get; set; }

        public string Color { get; set; }

        public int Year { get; set; }

        public int KmTraveled { get; set; }
    }
}
