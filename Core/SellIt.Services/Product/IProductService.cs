namespace SellIt.Services.Product
{
    using SellIt.Models.Product;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IProductService
    {
        Task<List<ProductDto>> GetAllProducts();
    }
}
