using Microsoft.AspNetCore.Identity;

namespace GotIt_back.Models
{
    public class MyUser : IdentityUser
    {
        public MyUser()
        {
            Cards = new HashSet<Card>();
        }
        public virtual ICollection<Card> Cards { get; set; }
    }
}
