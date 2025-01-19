using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderAggregate;

[Owned]
public class ProductItemOrdered
{
  public int ProductId { get; set; }
  public required string Name { get; set; } = null!;
  public required string PictureUrl { get; set; } = null!;
}
