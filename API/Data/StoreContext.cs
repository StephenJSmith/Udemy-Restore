using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{

    public required DbSet<Product> Products { get; set; }
    public required DbSet<Basket> Baskets { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole { Id="af173b07-5708-43ed-b6a1-86555f87fb0c", Name = "Member", NormalizedName = "MEMBER" },
                new IdentityRole { Id="4b3728ec-748b-4555-bd77-ff593eb3ea91", Name = "Admin", NormalizedName = "ADMIN" }
            );
    }
}