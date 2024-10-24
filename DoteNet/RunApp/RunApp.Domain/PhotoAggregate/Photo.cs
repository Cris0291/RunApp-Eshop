namespace RunApp.Domain.PhotoAggregate
{
    public class Photo
    {
        private Photo() { }
        public string PhotoId { get; set; }
        public string Url { get; private set; }
    }
}
