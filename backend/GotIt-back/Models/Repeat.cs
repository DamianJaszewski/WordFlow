namespace GotIt_back.Models
{
    public class Repeat
    {
        public int Id { get; set; }
        public int CardId { get; set; }
        public DateTime LastUpdateTime { get; set; }
        public DateTime NextRepeatTime { get; set; }
        public bool Result { get; set; }
        public int RepetLevel { get; set; }

        public virtual Card Card { get; set; }
    }
}
