namespace AlgoVisualizer.Api.Models
{
    using System.ComponentModel.DataAnnotations;

    public class AStarRequestModel
    {
        [Required]
        public NodeDto StartNode { get; set; }

        [Required]
        public NodeDto EndNode { get; set; }

        [Required]
        public NodeDto[][] Grid { get; set; }
    }
}