using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SellIt.Models.Advertisement
{
    public class AdvertisementRequest 
    {
        public string Title { get; set; } 
        public int Type { get; set; }
        public string Description { get; set; }
        public int? Price { get; set; }
    }
}
