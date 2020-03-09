namespace AlgoVisualizer.Models.PathFinding.Dijkstra
{
    using System.ComponentModel.DataAnnotations;
    using Common;
    using Enums;

    public class DijkstraNode : INode
    {
        public double Distance { get; set; } = double.PositiveInfinity;

        public int Weight { get; set; } = ModelConstants.DefaultWeightNodeValue;

        [Required]
        public int Row { get; set; }

        [Required]
        public int Col { get; set; }

        public bool IsVisited { get; set; }

        public INode PreviousNode { get; set; }

        public NodeType? NodeType { get; set; }

        public int CompareTo(object obj)
            => obj switch
            {
                DijkstraNode otherNode => this.Distance.CompareTo(otherNode.Distance),
                _ => 0
            };

        public override bool Equals(object obj)
            => obj is INode other && this.Row == other.Row && this.Col == other.Col;

        public override int GetHashCode()
        {
            unchecked
            {
                return (this.Row * 397) ^ this.Col;
            }
        }
    }
}