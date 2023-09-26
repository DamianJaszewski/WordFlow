using GotIt_back.Models;
using Microsoft.EntityFrameworkCore;

namespace GotIt_back.Services
{
    public class CardService
    {
        private readonly DataContext _dataContext;

        public CardService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<Card>> GetAll()
        {
            return await _dataContext.Cards.ToListAsync();
        }
    }
}
