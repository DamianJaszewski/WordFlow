using GotIt_back;
using GotIt_back.Models;
using GotIt_back.Services;
using GotItTest;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Moq;

namespace TestXUnit
{
    public class UnitTest1
    {
        //private readonly CardService _cardService;

        //public UnitTest1()
        //{
        //    var serviceProvider = TestStartup.CreateServiceProvider();

        //    _cardService = serviceProvider.GetRequiredService<CardService>();
        //}

        //private readonly CardService _cardService;

        //public UnitTest1(CardService cardService)
        //{
        //    _cardService = cardService;
        //}

        [Theory]
        [InlineData(4,3,7)]
        public void UpdateCardRepeats(double x, double y, double expected)
        {
            //Arrange
            //Card expected = new Card();
            //var expected1 = 1;

            //Act
            var card = new Card();
            var repeat = new Repeat();
            //_cardService.UpdateCardRepeats(card, repeat);

            var myDataMock = new Mock<CardService>();

            var actual = card;
            var actual1 = 1.0;

            AddMethod(x, y);
            void AddMethod(double x, double y)
            {
                actual1 = x + y;          
            }

            //Assert
            Assert.Equal(expected, actual1);
        }
    }
}