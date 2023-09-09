using GotIt_back.Models;
using Microsoft.EntityFrameworkCore;

namespace GotIt_back
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        //Add all models
        public DbSet<Card> Cards { get; set; }
        public DbSet<Repeat> Repeats { get; set; }
        public DbSet<Category> Category { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Card>()
                .HasMany(c => c.Repeats)
                .WithOne(r => r.Card)
                .HasForeignKey(r => r.CardId);

            modelBuilder.Entity<Category>()
                .HasMany(cat => cat.Cards)
                .WithOne(c => c.Category)
                .HasForeignKey(c => c.CategoryId);
        }
    }
}
