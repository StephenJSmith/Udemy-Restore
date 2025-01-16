using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class BasketExtensions
{
  public static BasketDto ToDto(this Basket basket)
  {
    var basketDto = new BasketDto
    {
      BasketId = basket.BasketId,
      ClientSecret = basket.ClientSecret,
      PaymentIntentId = basket.PaymentIntentId,
      Items = basket.Items.Select(x =>
        new BasketItemDto
        {
          ProductId = x.ProductId,
          Name = x.Product.Name,
          Price = x.Product.Price,
          PictureUrl = x.Product.PictureUrl,
          Brand = x.Product.Brand,
          Type = x.Product.Type,
          Quantity = x.Quantity
        }).ToList()
    };

    return basketDto;
  }

  public static async Task<Basket> GetBasketWithItems(
    this IQueryable<Basket> query, string? basketId)
  {
    var basket = await query
        .Include(x => x.Items)
        .ThenInclude(x => x.Product)
        .FirstOrDefaultAsync(x => x.BasketId == basketId)
            ?? throw new Exception("Cannot get basket");

    return basket;
  }
}