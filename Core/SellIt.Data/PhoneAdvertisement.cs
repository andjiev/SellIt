//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SellIt.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class PhoneAdvertisement
    {
        public int Id { get; set; }
        public string Model { get; set; }
        public int AdvertisementFk { get; set; }
    
        public virtual Advertisement Advertisement { get; set; }
    }
}