﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class SellItDbContext : DbContext
    {
        public SellItDbContext()
            : base("name=SellItDbContext")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<CarAdvertisement> CarAdvertisements { get; set; }
        public virtual DbSet<Advertisement> Advertisements { get; set; }
        public virtual DbSet<PhoneAdvertisement> PhoneAdvertisements { get; set; }
        public virtual DbSet<AdvertisementImage> AdvertisementImages { get; set; }
        public virtual DbSet<User> Users { get; set; }
    }
}
