using System.ComponentModel.DataAnnotations; // for validation attributes

namespace MiniEcommerceBackend.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Range(0.01, double.MaxValue)] // minimum price is 0.01, max is double.MaxValue (practically unlimited)
        public decimal Price { get; set; }

        [Range(0, int.MaxValue)] // minimum stock is 0
        public int Stock { get; set; }
    }
}
