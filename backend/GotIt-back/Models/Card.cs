namespace GotIt_back.Models
{
    public class Card
    {
        public Card()
        {
            Repeats = new HashSet<Repeat>();
        }

        public int Id { get; set; }
        public string? UserId { get; set; }
        public int? CategoryId { get; set; }
        public DateTime? CreateDate { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public bool Remembered { get; set; }


        public virtual Category? Category { get; set; }
        public virtual MyUser? User { get; set; }
        public virtual ICollection<Repeat> Repeats { get; set; }
    }
}