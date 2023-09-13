using GotIt_back.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GotIt_back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardsController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public CardsController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        // GET: api/<CardsController>
        [HttpGet]
        public async Task<ActionResult<List<Card>>> Get()
        {
            var cards = await _dataContext.Cards.ToListAsync();

            return Ok(cards);
        }

        [HttpGet("Random")]
        public async Task<ActionResult<Card>> GetRandom()
        {
            var cards = await _dataContext.Cards
                .Include(x => x.Repeats)
                .ToListAsync();

            cards = cards.Where(x => !x.Repeats.Any(r => r.NextRepeatTime > DateTime.UtcNow)).ToList();

            //var card = cards.OrderBy(c => c.Repeat == null || c.Repeat.Count == 0 ? c.CreateDate : c.Repeat.Max(r => r.LastUpdateTime));

            cards = cards.OrderBy(c =>
            {
                if (c.Repeats == null || c.Repeats.Count == 0)
                {
                    return c.CreateDate; // Sortowanie po dacie utworzenia, jeśli brak powtórzeń
                }
                else
                {
                    var lastUpdate = c.Repeats.Max(r => r.LastUpdateTime); // Pobranie ostatniej daty z powtórzeń
                    return lastUpdate; // Sortowanie po ostatniej dacie powtórzenia
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
        [HttpPut("{id}")]
        public async Task<ActionResult<List<Card>>> UpdateCard(int id, Card request)
        {
            var card = await _dataContext.Cards.FindAsync(id);
            if (card == null) return BadRequest("Card not found");

            _dataContext.Update(card);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("Repeat/{id}")]
        public async Task<ActionResult<List<Card>>> UpdateRepatOfCard(int id)
        {
            var card = await _dataContext.Cards
                .Include(x => x.Repeats)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (card == null) return BadRequest("Card not found");

            if(card.Repeats == null)
            {
                card.Repeats = new List<Repeat>();
            }

            //add Repeat with new RepeatLevel

            if (card.Repeats.Count > 0)
            {
                var lastCard = card.Repeats.OrderBy(x => x.Id).FirstOrDefault();

                if (lastCard.RepetLevel == null) lastCard.RepetLevel = 0;

                int[] repetitionList = { 1, 7, 30, 180, 360 };
                int repetitionDays = repetitionList[(lastCard.RepetLevel++)];
                var repetitionDate = DateTime.Now.AddDays(repetitionDays);

                card.Repeats.Add(new Repeat
                {
                    LastUpdateTime = DateTime.Now,
                    NextRepeatTime = repetitionDate,
                    Result = true,
                    RepetLevel = lastCard.RepetLevel++
                });
            }
            else
            {
                card.Repeats.Add(new Repeat
                {
                    LastUpdateTime = DateTime.Now,
                    NextRepeatTime = DateTime.Now,
                    Result = true,
                    RepetLevel = 0
                });
            }

            _dataContext.Update(card);
            await _dataContext.SaveChangesAsync();

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
