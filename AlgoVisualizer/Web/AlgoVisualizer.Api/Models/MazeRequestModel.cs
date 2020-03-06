namespace AlgoVisualizer.Api.Models
{
    using System.ComponentModel.DataAnnotations;
    using AlgoVisualizer.Models.Maze;
    using AlgoVisualizer.Models.PathFinding;
    using Common.AutoMapping.Interfaces;

    public class MazeRequestModel : IMapWith<MazeServiceModel>
    {
        [Required]
        public NodeDto[,] Grid { get; set; }
    }
}
