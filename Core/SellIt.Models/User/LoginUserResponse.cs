sing System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SellIt.Models.User
{
    public class LoginUserResponse
    {
        public Guid Uid { get; set; }

        public string Token { get; set; }
    }
}
