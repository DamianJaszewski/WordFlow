using GotIt_back;
using GotIt_back.Models;
using GotIt_back.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace TestXUnit
{
    public class CardServiceTests : IDisposable
    {
        public DataContext context { get; set; }
        private readonly CardService _cardService;

        public CardServiceTests()
        {
            var _contextOptions = new DbContextOptionsBuilder<DataContext>()
               .UseInMemoryDatabase("BloggingControllerTest")
               .ConfigureWarnings(b => b.Ignore(InMemoryEventId.TransactionIgnoredWarning))
               .Options;

            context = new DataContext(_contextOptions);
            _cardService = new CardService(context);
        }
        public void Dispose()
        {
            context.Dispose();
        }

        [Theory]
        [InlineData(4, 3, 7)]
        public void DemoTest(double x, double y, double expected)
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
        public async Task GetAll_ShouldReturnListOfCards()
        {
            // Arrange
            var card = InitializeCardObject();

            context.Add(card);
            context.SaveChanges();

            // Act
            var actual = await _cardService.GetAll();

            // Assert
            Assert.Single(actual);

            //Clean up
            context.Database.EnsureDeleted();
        }

        [Fact]
        public async Task UpdateCardRepeats_ShouldReturnCardWithUpdatedRepet()
        {
            //Arrange
            var card = InitializeCardObject();

            // Act
            var actual = await _cardService.UpdateRepatOfCard(card);
            var lastRepeat = card.Repeats.OrderBy(x => x.Id).FirstOrDefault();
            // Assert
            Assert.True(lastRepeat.LastUpdateTime < lastRepeat.NextRepeatTime);

            //Clean up
            context.Database.EnsureDeleted();
        }

        private Card InitializeCardObject()
        {
            return new Card
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
        }

        private Repeat InitializeRepeatObject()
        {
            return new Repeat()
            {
                CardId = 1,
                Id = 0,
                LastUpdateTime = DateTime.UtcNow,
                NextRepeatTime = DateTime.UtcNow,
            };
        }
    }
}