using GotIt_back.Models;
using GotIt_back.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GotIt_back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (await _authService.Login(user))
            {
                //JWTBearer
                var tokenString = _authService.GenerateTokenString(user);
                return Ok(tokenString);
            }
            return BadRequest();
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(User user)
        {
            if (await _authService.RegisterUser(user))
            {
                return Ok();
            }
            return BadRequest("Something went wrong.");
        }
    }
}
