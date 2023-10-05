using GotIt_back;
using GotIt_back.Models;
using GotIt_back.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TestXUnit
{
    public class UnitTest1
    {

        [Theory]
        [InlineData(4, 3, 7)]
        public void UpdateCardRepeats(double x, double y, double expected)
        {
            var actual = 1.0;

            AddMethod(x, y);
            void AddMethod(double x, double y)
            {
                actual = x + y;
            }

            //Assert
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void GetAll_DemoTest()
        {
            // Arrange
            var _contextOptions = new DbContextOptionsBuilder<DataContext>()
               .UseInMemoryDatabase("BloggingControllerTest")
               .ConfigureWarnings(b => b.Ignore(InMemoryEventId.TransactionIgnoredWarning))
               .Options;

            using var context = new DataContext(_contextOptions);

            var card = 
            new Card
            {
                Answer = "",
                Category = null,
                CategoryId = 1,
                CreateDate = DateTime.UtcNow,
                Id = 0,
                Question = "",
                Remembered = false,
                Repeats = new List<Repeat>()
            };

            // Act
            context.Add(card);
            context.SaveChanges();

            var weatherForecasts = context.Cards.ToList();

            // Assert
            Assert.Equal(1, weatherForecasts.Count());

            //Clean up
            context.Database.EnsureDeleted();
        }
    }
}