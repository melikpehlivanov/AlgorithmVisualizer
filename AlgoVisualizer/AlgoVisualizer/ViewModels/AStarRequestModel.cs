namespace AlgoVisualizer.ViewModels
{
    using AlgoVisualizer.Services.Models;

    public class AStarRequestModel
    {
        public string Algorithm { get; set; }

        public NodeDto[][] Grid { get; set; }
    }
}
