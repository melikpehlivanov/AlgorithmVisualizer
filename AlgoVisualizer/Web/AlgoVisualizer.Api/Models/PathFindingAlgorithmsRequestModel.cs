namespace AlgoVisualizer.Api.Models
{
    using System.ComponentModel.DataAnnotations;
    using AlgoVisualizer.Models.PathFinding.AStar;
    using AlgoVisualizer.Models.PathFinding.Bfs;
    using AlgoVisualizer.Models.PathFinding.Dfs;
    using AlgoVisualizer.Models.PathFinding.Dijkstra;
    using Common.AutoMapping.Interfaces;

    public class PathFindingAlgorithmsRequestModel : 
        IMapWith<AStarServiceModel>, 
        IMapWith<DijkstraServiceModel>, 
        IMapWith<DfsServiceModel>, 
        IMapWith<BfsServiceModel>
    {
        [Required]
        public NodeDto StartNode { get; set; }

        [Required]
        public NodeDto EndNode { get; set; }

        [Required]
        public NodeDto[,] Grid { get; set; }
    }
}