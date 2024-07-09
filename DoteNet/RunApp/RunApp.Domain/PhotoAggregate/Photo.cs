namespace RunApp.Domain.PhotoAggregate
{
    public class Photo
    {
        private Photo() { }
        public Guid PhotoId { get; set; }
        public string URL { get; private set; }
        public bool IsMain { get; private set; }

    }
}
