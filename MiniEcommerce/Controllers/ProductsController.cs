using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniEcommerceBackend.Data;
using MiniEcommerceBackend.Models;

namespace MiniEcommerceBackend.Controllers
{
    [ApiController] // Automatically handles validation errors
    [Route("api/[controller]")] // api/products
    public class ProductsController : ControllerBase
    {
        private readonly MyContext _context;

        public ProductsController(MyContext context)
        {
            //use the registered context from Program.cs (dependency injection)
            _context = context;
        }

        [HttpPost] //POST /api/products
        public async Task<IActionResult> Create(Product product)
        {
            //Check the validators from (Product.cs)
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Products.Add(product); //Add the product to the context
            await _context.SaveChangesAsync(); //Save the changes to the database

            return Ok(product);
        }

        [HttpGet] //GET /api/products
        public async Task<IActionResult> GetAll()
        {
            //Get all products from the database 
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }
    }
}
