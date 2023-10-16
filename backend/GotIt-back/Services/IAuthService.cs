using GotIt_back.Models;

namespace GotIt_back.Services
{
    public interface IAuthService
    {
        Task<bool> RegisterUser(User user);
        Task<bool> Login(User user);
    }
}