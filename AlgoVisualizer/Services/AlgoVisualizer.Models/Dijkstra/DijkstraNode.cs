namespace AlgoVisualizer.Models.Dijkstra
{
    using System.ComponentModel.DataAnnotations;
    using AStar;
    using Enums;

    public class DijkstraNode : INode
    {
        [Required]
        public int Row { get; set; }

        [Required]
        public int Col { get; set; }

        public bool IsVisited { get; set; }

        public double Distance { get; set; } = double.PositiveInfinity;

        public int Weight { get; set; } = 1;

        public INode PreviousNode { get; set; }

        public NodeType? NodeType { get; set; }

        public int CompareTo(object obj)
            => obj switch
            {
                DijkstraNode otherNode => this.Distance.CompareTo(otherNode.Distance),
                _ => 0
            };


        public override bool Equals(object obj)
            => obj is INode other && (this.Row == other.Row && this.Col == other.Col);

        protected bool Equals(DijkstraNode other)
            => this.Row == other.Row && this.Col == other.Col;

        public override int GetHashCode()
        {
            unchecked
            {
                return (this.Row * 397) ^ this.Col;
            }
        }
    }
}
