using System;

namespace SellIt.Models.User
{
    public class UserDto
    {
        public DateTime CreatedOn { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string City { get; set; }
        
        public string Phone { get; set; }
    }
}
