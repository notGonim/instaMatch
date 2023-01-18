using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTO;
using API.interfaces;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseController
    {

        private readonly DataContext _Context;
        private readonly ITokenService _tokenService;


        public AccountController(DataContext Context, ITokenService tokenService)
        {
            _tokenService = tokenService;
            _Context = Context;
        }


        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> CreateAccount(RegisterDTO registerDTO)
        {
            if (UserNameExists(registerDTO.userName))
                return BadRequest("UserName is taken");
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                UserName = registerDTO.userName.ToLower(),
                Password = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.password)),
                PaswordSalt = hmac.Key
            };
            _Context.Users.Add(user);
            await _Context.SaveChangesAsync();
            return new UserDTO
            {
                userName = user.UserName,
                token = _tokenService.CreateToken(user)
            };
        }


        [HttpPost("login")]
        public ActionResult<UserDTO> Login(RegisterDTO registerDTO)
        {
            var user = _Context.Users.SingleOrDefault(x => x.UserName == registerDTO.userName);
            if (user == null) return Unauthorized("Invalid Username");

            using var hmac = new HMACSHA512(user.PaswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.Password[i]) return Unauthorized("Invalid Password");
            }

            return new UserDTO
            {
                userName = user.UserName,
                token = _tokenService.CreateToken(user)
            };
        }


        private bool UserNameExists(string username)
        {
            return _Context.Users.Any(x => x.UserName == username.ToLower());
        }




    }
}