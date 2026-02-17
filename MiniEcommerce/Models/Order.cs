namespace MiniEcommerceBackend.Models
{
    public class Order
    {
        public int Id { get; set; }

        public string CustomerName { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // default to current time

        public List<OrderItem> Items { get; set; } = new(); //Items is the name of the collection, OrderItem is the type

        public decimal Discount { get; set; }

        public decimal TotalAmount { get; set; } //Total money
    }
}
