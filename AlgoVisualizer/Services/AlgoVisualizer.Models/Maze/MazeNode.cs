namespace AlgoVisualizer.Models.Maze
{
    using System.ComponentModel.DataAnnotations;
    using PathFinding;
    using PathFinding.Enums;

    public class MazeNode : INode
    {
        [Required]
        public int Row { get; set; }

        [Required]
        public int Col { get; set; }

        public bool IsVisited { get; set; }

        public INode PreviousNode { get; set; }

        public NodeType? NodeType { get; set; }

        public int CompareTo(object obj)
            => 0;
    }
}