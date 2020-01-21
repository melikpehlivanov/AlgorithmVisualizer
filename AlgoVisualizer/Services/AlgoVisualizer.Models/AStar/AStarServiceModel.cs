namespace AlgoVisualizer.Models.AStar
{
    using System.ComponentModel.DataAnnotations;

    public class AStarServiceModel
    {
        [Required]
        public AStarNode StartNode { get; set; }

        [Required]
        public AStarNode EndNode { get; set; }

        [Required]
        public AStarNode[,] Grid { get; set; }
    }
}
