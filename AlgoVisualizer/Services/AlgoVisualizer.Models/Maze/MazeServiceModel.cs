namespace AlgoVisualizer.Models.Maze
{
    using System.ComponentModel.DataAnnotations;

    public class MazeServiceModel
    {
        [Required]
        public MazeNode[,] Grid { get; set; }
    }
}
