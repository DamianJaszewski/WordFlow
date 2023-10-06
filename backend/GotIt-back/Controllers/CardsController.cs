using GotIt_back.Models;
using GotIt_back.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GotIt_back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class CardsController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly ICardService _cardService;

        public CardsController(DataContext dataContext, ICardService cardService)
        {
            _dataContext = dataContext;
            _cardService = cardService;
        }

        // GET: api/<CardsController>
        [HttpGet]
        public async Task<ActionResult<List<Card>>> Get()
        {
            var cards = await _cardService.GetAll();

            return Ok(cards);
        }

        [HttpGet("Random")]
        public async Task<ActionResult<Card>> GetRandom()
        {
            var card = await _cardService.GetRandom();

            return Ok(card);
        }

        // GET api/<CardsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Card>>> GetById(int id)
        {
            var card = await _dataContext.Cards.FindAsync(id);

            if (card == null) return BadRequest("Card not found");

            return Ok(card);
        }

        // POST api/<CardsController>
        [HttpPost]
        public async Task<ActionResult<List<Card>>> AddCard(Card request)
        {
            await _cardService.AddCard(request);

            return Ok();
        }

        // PUT api/<CardsController>/5
        [HttpPut]
        public async Task<ActionResult<List<Card>>> UpdateCard(Card request)
        {
            var card = await _dataContext.Cards.FindAsync(request.Id);
            if (card == null) return BadRequest("Card not found");

            await _cardService.UpdateCard(card, request);

            return Ok();
        }

        [HttpPut("Repeat/{id}")]
        public async Task<ActionResult<List<Card>>> UpdateRepatOfCard(int id)
        {
            var card = await _cardService.GetCardByIdAsync(id);
            if (card == null) return BadRequest("Card not found");

            await _cardService.UpdateRepatOfCard(card);

            return Ok();
        }

        // DELETE api/<CardsController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Card>>> Delete(int id)
        {
            var card = await _dataContext.Cards.FindAsync(id);
            if (card == null) return BadRequest("Card not found");

            await _cardService.DeleteCard(card);

            return Ok();
        }
    }
}
