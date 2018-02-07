using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SellIt.Models.CurrentUser
{
    public class CurrentUser : ICurrentUser
    {
        public int Id { get; set; }

        public Guid Uid { get; set; }
    }
}
