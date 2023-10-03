using GotIt_back.Models;

namespace GotIt_back.Services
{
    public interface ICardService
    {
        void EnsureRepeatsListExists(Card card);
        Task<List<Card>> GetAll();
        Task<Card> GetCardByIdAsync(int id);
        Repeat GetLastRepeat(Card card);
        Task SaveChangesAsync();
        void UpdateCardRepeats(Card card, Repeat lastRepeat);
    }
}