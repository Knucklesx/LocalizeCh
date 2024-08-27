
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using LocalizeApi.Data;
using LocalizeApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;


namespace BretonBackend.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly LocalizeContext _localizeContext;


        public LoginController(LocalizeContext localizeContext)
        {
            _localizeContext = localizeContext;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.Email) || string.IsNullOrEmpty(loginRequest.Senha))
            {
                return BadRequest("Invalid login request");
            }

            var user = await _localizeContext.Users
                .FirstOrDefaultAsync(u => u.Email == loginRequest.Email && u.Senha == loginRequest.Senha);


            if (user == null)
            {
                return Unauthorized("Invalid credentials");
            }

            return Ok(user);
        }
    }
}
