namespace AlgoVisualizer.Models.Dfs
{
    using System.ComponentModel.DataAnnotations;
    using Enums;

    public class DfsNode : INode
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
