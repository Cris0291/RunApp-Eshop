namespace RunApp.Domain.PhotoAggregate
{
    public class Photo
    {
        private Photo() { }
        public string PhotoId { get; set; }
        public string URL { get; private set; }
    }
}
