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

        public async Task<Card> GetRandom()
        {
            var cards = await GetCardsWithRepeats();

            cards = FilterCardsByNextRepetTime(cards);

            cards = OrderCardsByRepeats(cards);

            return cards.FirstOrDefault();
        }

        public async Task<Card> GetCardByIdAsync(int id)
        {
            return await _dataContext.Cards
                .Include(x => x.Repeats)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task AddCard(Card request)
        {
            request.CreateDate = DateTime.Now;
            _dataContext.Cards.Add(request);
            await SaveChangesAsync();
        }

        public async Task UpdateCard(Card card, Card request)
        {
            card.Answer = request.Answer;
            card.Question = request.Question;
            card.CategoryId = request.CategoryId;

            _dataContext.Update(card);
            await SaveChangesAsync();
        }

        public async Task<Card> UpdateRepatOfCard(Card card)
        {
            EnsureRepeatsListExists(card);
            var lastRepeat = GetLastRepeat(card);
            UpdateCardRepeats(card, lastRepeat);

            await SaveChangesAsync();
            return card;
        }

        public async Task DeleteCard(Card card)
        {
            _dataContext.Cards.Remove(card);
            await SaveChangesAsync();
        }

        #region private 

        private void EnsureRepeatsListExists(Card card)
        {
            if (card.Repeats == null)
            {
                card.Repeats = new List<Repeat>();
            }
        }

        private Repeat GetLastRepeat(Card card)
        {
            return card.Repeats.OrderBy(x => x.Id).FirstOrDefault();
        }

        private void UpdateCardRepeats(Card card, Repeat lastRepeat)
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

        private async Task<List<Card>> GetCardsWithRepeats()
        {
            return await _dataContext.Cards
           .Include(x => x.Repeats)
           .ToListAsync();
        }

        private List<Card> FilterCardsByNextRepetTime(List<Card> cards )
        {
            return cards.Where(x => !x.Repeats.Any(r => r.NextRepeatTime > DateTime.UtcNow)).ToList();
        }

        private List<Card> OrderCardsByRepeats(List<Card> cards)
        {
            return cards.OrderBy(c =>
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
        }
        #endregion
    }
}
