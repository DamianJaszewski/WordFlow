using GotIt_back.Models;
using Microsoft.EntityFrameworkCore;

namespace GotIt_back.Services
{
    public class CardService : ICardService
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

        public async Task<Card> GetCardByIdAsync(int id)
        {
            return await _dataContext.Cards
                .Include(x => x.Repeats)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public void EnsureRepeatsListExists(Card card)
        {
            if (card.Repeats == null)
            {
                card.Repeats = new List<Repeat>();
            }
        }

        public Repeat GetLastRepeat(Card card)
        {
            return card.Repeats.OrderBy(x => x.Id).FirstOrDefault();
        }

        public void UpdateCardRepeats(Card card, Repeat lastRepeat)
        {
            int[] repetitionList = { 1, 7, 30, 180, 360 };
            int repetitionDays = lastRepeat?.RepetLevel ?? 0;
            var repetitionDate = DateTime.Now.AddDays(repetitionList[repetitionDays]);

            card.Repeats.Add(new Repeat
            {
                LastUpdateTime = DateTime.Now,
                NextRepeatTime = repetitionDate,
                Result = true,
                RepetLevel = lastRepeat?.RepetLevel + 1 ?? 0
            });
        }

        public async Task SaveChangesAsync()
        {
            await _dataContext.SaveChangesAsync();
        }
    }
}
