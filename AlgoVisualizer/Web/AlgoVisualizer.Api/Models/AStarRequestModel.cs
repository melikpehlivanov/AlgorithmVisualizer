namespace AlgoVisualizer.Api.Models
{
    using System.ComponentModel.DataAnnotations;
    using AlgoVisualizer.Models.AStar;
    using Common.AutoMapping.Interfaces;

    public class AStarRequestModel : IMapWith<AStarServiceModel>
    {
        [Required]
        public NodeDto StartNode { get; set; }

        [Required]
        public NodeDto EndNode { get; set; }

        [Required]
        public NodeDto[,] Grid { get; set; }
    }
}