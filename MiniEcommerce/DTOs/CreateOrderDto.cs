namespace MiniEcommerceBackend.DTOs
{
    public class CreateOrderDto
    {
        public string CustomerName { get; set; }

        public List<OrderItemDto> Items { get; set; }
    }

    public class OrderItemDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
