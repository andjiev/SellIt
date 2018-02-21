using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SellIt.Models.Exceptions
{
    public class BadRequestException : Exception
    {
        public BadRequestException() : base("Item not found")
        {

        }

        public BadRequestException(string message)
            : base(message)
        {

        }
    }
}
