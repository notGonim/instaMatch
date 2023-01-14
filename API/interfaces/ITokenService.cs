using API.Models;

namespace API.interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}