using API.DTOs;
using API.Entities;

namespace API.Extensions;

public static class BasketExtensions
{
  public static BasketDto ToDto(this Basket basket)
  {
    var basketDto = new BasketDto
    {
      BasketId = basket.BasketId,
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
}