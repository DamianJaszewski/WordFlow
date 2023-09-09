namespace GotIt_back.Models
{
    public class Category
    {
        public Category()
        {
            Cards = new HashSet<Card>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Card> Cards{ get; set; }
    }
}
