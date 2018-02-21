namespace SellIt.Models.Exceptions
{
    using System;

    public class NotFoundException : Exception
    {
        public NotFoundException() : base("Item not found")
        {

        }

        public NotFoundException(string message)
            : base(message)
        {

        }
    }
}
