using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseController
    {

        public DataContext _Context { get; }

        AccountController(DataContext Context)
        {
            _Context = Context;
        }


        [HttpPost("register")]
        public async Task<ActionResult<AppUser>> CreateAccount(RegisterDTO registerDTO)
        {
            if (UserNameExists(registerDTO.UserName))
                return BadRequest("UserName is taken");
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                UserName = registerDTO.UserName.ToLower(),
                Password = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
                PaswordSalt = hmac.Key
            };
            _Context.Users.Add(user);
            await _Context.SaveChangesAsync();
            return user;
        }


        [HttpPost("login")]
        public ActionResult<AppUser> Login(RegisterDTO registerDTO)
        {
            var user = _Context.Users.SingleOrDefault(x => x.UserName == registerDTO.UserName);
            if (user == null) return Unauthorized("Invalid Username");

            using var hmac = new HMACSHA512(user.PaswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] == user.Password[i]) return Unauthorized("Invalid Password");
            }
            return user;
        }


        private bool UserNameExists(string username)
        {
            return _Context.Users.Any(x => x.UserName == username.ToLower());
        }




    }
}