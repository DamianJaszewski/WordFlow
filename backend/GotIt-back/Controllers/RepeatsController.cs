using GotIt_back.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GotIt_back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RepeatsController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public RepeatsController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        // GET: api/<RepeatsController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            return Ok(await _dataContext.Repeats.ToListAsync());
        }

        // GET api/<RepeatsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var repeat = await _dataContext.Repeats.FindAsync(id);

            if (repeat == null) return BadRequest("Repet not found");

            return Ok(repeat);
        }

        // POST api/<RepeatsController>
        [HttpPost]
        public async Task<ActionResult> Post(Repeat repeat)
        {
            _dataContext.Repeats.Add(repeat);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Repeats.ToListAsync());
        }

        // PUT api/<RepeatsController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Repeat request)
        {
            var repeat = _dataContext.Repeats.Find(id);
            if (repeat == null) return BadRequest("Repet not found");

            _dataContext.Repeats.Update(repeat);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Repeats.ToListAsync());
        }

        // DELETE api/<RepeatsController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var repeat = _dataContext.Repeats.Find(id);
            if (repeat == null) return BadRequest("Repeat not found");

            _dataContext.Repeats.Remove(repeat);
            return Ok();
        }
    }
}
