using Microsoft.EntityFrameworkCore;
using MiniEcommerceBackend.Models;

namespace MiniEcommerceBackend.Data
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options)
            : base(options)
        {
        }
0
        //Registering the models (model to table)
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
    }
}
