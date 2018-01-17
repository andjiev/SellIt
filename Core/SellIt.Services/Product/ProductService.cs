using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SellIt.Data;
using SellIt.Models.Product;

namespace SellIt.Services.Product
{
    public class ProductService : IProductService
    {
        public readonly IUnitOfWork _unitOfWork;

        public ProductService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<List<ProductDto>> GetAllProducts()
        {
            List<ProductDto> products = await _unitOfWork.Products.All()
                .Select(x => new ProductDto
                {
                    Id = x.Id,
                    ProductName = x.ProductName
                }).ToListAsync();

            return products;
        }
    }
}
