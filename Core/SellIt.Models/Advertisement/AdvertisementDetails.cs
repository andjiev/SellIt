using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SellIt.Models.Advertisement
{
    public class AdvertisementDetails
    {
        public string Title { get; set; }

        public DateTime CreatedOn { get; set; }   
        
        public int Type { get; set; }

        public int Category { get; set; }

        public int? Price { get; set; }

        public string Description { get; set; }

        public string Name { get; set; }

        public string Location { get; set; }        

        public string Phone { get; set; }

        public string Brand { get; set; }

        public string Model { get; set; }

        public string Memory { get; set; }

        public string Color { get; set; }

        public string Body { get; set; }

        public int? Year { get; set; }

        public int? KmTraveled { get; set; }

        public string[] Base64Images { get; set; }
    }
}
