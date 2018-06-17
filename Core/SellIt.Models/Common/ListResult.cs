using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SellIt.Models.Common
{
    public class ListResultDto<T>
    {
        public IEnumerable<T> List { get; set; }
        public int TotalCount { get; set; }
    }
}
