using GotIt_back.Models;

namespace GotIt_back.Services
{
    public interface ICardService
    {
        Task<List<Card>> GetAll();
        Task<Card> GetCardByIdAsync(int id);
        Task SaveChangesAsync();
        Task<Card> UpdateRepatOfCard(Card card);
        Task<Card> GetRandom();
        Task AddCard(Card request);
        Task UpdateCard(Card card, Card request);
    }
}