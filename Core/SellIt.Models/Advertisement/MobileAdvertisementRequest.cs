using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SellIt.Models.Advertisement
{
    public class MobileAdvertisementRequest : AdvertisementRequest
    {
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Memory { get; set; }
        public string Color { get; set; }
    }
}
