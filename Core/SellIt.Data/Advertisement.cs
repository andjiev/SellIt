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
    
    public partial class Advertisement
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Advertisement()
        {
            this.CarAdvertisements = new HashSet<CarAdvertisement>();
            this.PhoneAdvertisements = new HashSet<PhoneAdvertisement>();
            this.AdvertisementImages = new HashSet<AdvertisementImage>();
        }
    
        public int Id { get; set; }
        public System.Guid Uid { get; set; }
        public System.DateTime CreatedOn { get; set; }
        public Nullable<System.DateTime> DeletedOn { get; set; }
        public int UserFk { get; set; }
        public int Category { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CarAdvertisement> CarAdvertisements { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PhoneAdvertisement> PhoneAdvertisements { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AdvertisementImage> AdvertisementImages { get; set; }
        public virtual User User { get; set; }
    }
}
