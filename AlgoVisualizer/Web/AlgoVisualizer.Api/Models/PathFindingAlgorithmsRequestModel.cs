namespace AlgoVisualizer.Api.Models
{
    using System.ComponentModel.DataAnnotations;
    using AlgoVisualizer.Models.AStar;
    using AlgoVisualizer.Models.Bfs;
    using AlgoVisualizer.Models.Dfs;
    using AlgoVisualizer.Models.Dijkstra;
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