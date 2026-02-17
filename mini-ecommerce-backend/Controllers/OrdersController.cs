using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MiniEcommerceBackend.Data;
using MiniEcommerceBackend.Models;
using MiniEcommerceBackend.DTOs;

namespace MiniEcommerceBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly MyContext _context;

        public OrdersController(MyContext context)
        {
            _context = context;
        }


        // POST: api/orders
        //Make new order
        [HttpPost]
        public async Task<IActionResult> CreateOrder(CreateOrderDto dto)
        {
            // Check if items are provided in the request
            if (dto.Items == null || !dto.Items.Any())
                return BadRequest("Order must contain at least one item.");

            var order = new Order
            {
                CustomerName = dto.CustomerName,
                Items = new List<OrderItem>()
            };

            decimal total = 0;
            int totalItems = 0;

            //For each item in the order, 
            // check if product exists,
            // check if quantity is valid,
            // reduce stock,
            // calculate totals,
            // add to order
            foreach (var item in dto.Items)
            {
                //Search for the product in database
                var product = await _context.Products
                    .FirstOrDefaultAsync(p => p.Id == item.ProductId);

                //Exist?
                if (product == null)
                    return BadRequest($"Product with ID {item.ProductId} not found.");

                // Check if quantity is valid
                if (item.Quantity <= 0)
                    return BadRequest("Quantity must be greater than zero.");

                // Check if there is enough stock
                if (product.Stock < item.Quantity)
                    return BadRequest($"Not enough stock for product '{product.Name}'.");

                // Reduce stock
                product.Stock -= item.Quantity;

                // Calculate total money
                total += product.Price * item.Quantity;
                totalItems += item.Quantity;

                order.Items.Add(new OrderItem
                {
                    ProductId = product.Id,
                    Quantity = item.Quantity
                });
            }

            // Apply discount
            var discountRate = CalculateDiscountRate(totalItems);
            order.Discount = total * discountRate;
            order.TotalAmount = total - order.Discount;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }


        // GET: api/orders/{id}

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            //Eager Loading, Load the order with its items and products
            var order = await _context.Orders
                .Include(o => o.Items)
                .ThenInclude(i => i.Product)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound($"Order with ID {id} not found.");

            return Ok(order);
        }


        // Discount Logic

        private decimal CalculateDiscountRate(int totalItems)
        {
            if (totalItems >= 5)
                return 0.10m; // 10% discount
               

            if (totalItems >= 2)
                return 0.05m; // 5% discount

            return 0m; // No discount
        }
    }
}
