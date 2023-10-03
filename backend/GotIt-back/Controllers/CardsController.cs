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
            var cards = await _dataContext.Cards
                .Include(x => x.Repeats)
                .ToListAsync();

            cards = cards.Where(x => !x.Repeats.Any(r => r.NextRepeatTime > DateTime.UtcNow)).ToList();

            cards = cards.OrderBy(c =>
            {
                if (c.Repeats == null || c.Repeats.Count == 0)
                {
                    //Sort at create date, if there is no Repeats
                    return c.CreateDate;
                }
                else
                {
                    //Sort after last Repeat
                    var lastUpdate = c.Repeats.Max(r => r.LastUpdateTime);
                    return lastUpdate;
                }
            }).ToList();

            var card = cards.FirstOrDefault();

            return Ok(card);
        }

        // GET api/<CardsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Card>>> Get(int id)
        {
            var card = await _dataContext.Cards.FindAsync(id);

            if (card == null) return BadRequest("Card not found");

            return Ok(card);
        }

        // POST api/<CardsController>
        [HttpPost]
        public async Task<ActionResult<List<Card>>> AddCard(Card request)
        {
            request.CreateDate = DateTime.Now;
            _dataContext.Cards.Add(request);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Cards.ToListAsync());
        }

        // PUT api/<CardsController>/5
        [HttpPut]
        public async Task<ActionResult<List<Card>>> UpdateCard(Card request)
        {
            var card = await _dataContext.Cards.FindAsync(request.Id);
            if (card == null) return BadRequest("Card not found");

            card.Answer = request.Answer;
            card.Question = request.Question;
            card.CategoryId = request.CategoryId;

            _dataContext.Update(card);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("Repeat/{id}")]
        public async Task<ActionResult<List<Card>>> UpdateRepatOfCard(int id)
        {
            var card = await _cardService.GetCardByIdAsync(id);

            if (card == null) return BadRequest("Card not found");

            _cardService.EnsureRepeatsListExists(card);

            var lastRepeat = _cardService.GetLastRepeat(card);

            _cardService.UpdateCardRepeats(card, lastRepeat);

            await _cardService.SaveChangesAsync();

            return Ok();
        }

        // DELETE api/<CardsController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Card>>> Delete(int id)
        {
            var card = await _dataContext.Cards.FindAsync(id);
            if (card == null) return BadRequest("Card not found");

            _dataContext.Cards.Remove(card);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }
    }
}
