using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SellIt.Models.Common
{
    public class Paging
    {
        public Paging(int? page, int? pageSize, int? category, string searchString, string location)
        {
            Page = page.HasValue ? page.Value : 1;
            PageSize = pageSize.HasValue ? pageSize.Value : 10;
            Category = category.HasValue ? category.Value : 0;
            SearchString = searchString;
            Location = location;
        }

        public int Page { get; private set; }
        public int PageSize { get; private set; }
        public string SearchString { get; private set; }
        public int Category { get; private set; }
        public string Location { get; private set; }
    }
}
