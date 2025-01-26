using API.Data;
using API.DTOs;
using API.Entities;
using API.Entities.OrderAggregate;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class OrdersController(
  StoreContext context,
  DiscountService discountService
) : BaseApiController
{
  [HttpGet]
  public async Task<ActionResult<List<OrderDto>>> GetOrders()
  {
    var orders = await context.Orders
      .ProjectToDto()
      .Where(x => x.BuyerEmail == User.GetUsername())
      .ToListAsync();

    return orders;
  }

  [HttpGet("{id:int}")]
  public async Task<ActionResult<OrderDto>> GetOrderDetails(int id)
  {
    var order = await context.Orders
      .ProjectToDto()
      .Where(x => x.BuyerEmail == User.GetUsername() && x.Id == id)
      .FirstOrDefaultAsync();

    if (order == null) return NotFound();

    return order;
  }

  [HttpPost]
  public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
  {
    var basketId = Request.Cookies["basketId"];
    var basket = await context.Baskets.GetBasketWithItems(basketId);
    if (basket == null
      || basket.Items.Count == 0
      || string.IsNullOrEmpty(basket.PaymentIntentId))
      return BadRequest("Bsket is empty or not found");

    var items = CreateOrderItems(basket.Items);
    if (items == null) return BadRequest("Some items out of stock");

    long subtotal = items.Sum(x => x.Price * x.Quantity);
    long deliveryFee = CalculateDeliveryFee(subtotal);
    long discount = 0;

    if (basket.Coupon != null)
    {
      discount = await discountService.CalculateDiscountFromAmount(
        basket.Coupon, subtotal);
    }

    var order = await context.Orders
      .Include(x => x.OrderItems)
      .FirstOrDefaultAsync(x => x.PaymentIntentId == basket.PaymentIntentId);
    if (order == null)
    {
      order = new Order
      {
        OrderItems = items,
        BuyerEmail = User.GetUsername(),
        ShippingAddress = orderDto.ShippingAddress,
        DeliveryFee = deliveryFee,
        Subtotal = subtotal,
        Discount = discount,
        PaymentSummary = orderDto.PaymentSummary,
        PaymentIntentId = basket.PaymentIntentId
      };

      context.Orders.Add(order);
    }
    else 
    {
      order.OrderItems = items;
    }

    var result = await context.SaveChangesAsync() > 0;
    if (!result) return BadRequest("Problem creating order");

    return CreatedAtAction(nameof(GetOrderDetails), new { id = order.Id }, order.ToDto());
  }

  private long CalculateDeliveryFee(long subtotal)
  {
    return subtotal > 10000
      ? 0
      : 500;
  }

  private List<OrderItem>? CreateOrderItems(List<BasketItem> items)
  {
    var orderItems = new List<OrderItem>();
    foreach (var item in items)
    {
      if (item.Product.QuantityInStock < item.Quantity) return null;

      var orderItem = new OrderItem
      {
        ItemOrdered = new ProductItemOrdered
        {
          ProductId = item.ProductId,
          PictureUrl = item.Product.PictureUrl,
          Name = item.Product.Name
        },
        Quantity = item.Quantity,
        Price = item.Product.Price
      };

      orderItems.Add(orderItem);

      item.Product.QuantityInStock -= item.Quantity;
    }

    return orderItems;
  }
}