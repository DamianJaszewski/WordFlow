using GotIt_back.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GotIt_back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public CategoriesController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Category>>> Get()
        {
            var categories = await _dataContext.Category.ToListAsync();

            return Ok(categories);
        }

        [HttpPost]
        public async Task<ActionResult<Category>> Add(Category request)
        {
            _dataContext.Category.Add(request);
            await _dataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("AddToCard")]
        public async Task<ActionResult<Category>> AddToCard(int cardId, int categoryId)
        {
            var card = await _dataContext.Cards.FindAsync(cardId);
            if (card == null) return BadRequest("Card not found");

            var category = await _dataContext.Category.FindAsync(categoryId);
            if (category == null) return BadRequest("Category not found");

            category.Cards.Add(card);
            await _dataContext.SaveChangesAsync();
            return Ok();
        }
    }
}

