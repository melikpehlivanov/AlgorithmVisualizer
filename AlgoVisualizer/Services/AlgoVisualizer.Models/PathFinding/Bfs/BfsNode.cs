namespace AlgoVisualizer.Models.PathFinding.Bfs
{
    using System.ComponentModel.DataAnnotations;
    using Enums;

    public class BfsNode : INode
    {
        public BfsNode(int row, int col, INode previousNode = null, double distance = double.PositiveInfinity)
        {
            this.Row = row;
            this.Col = col;
            this.PreviousNode = previousNode;
            this.Distance = distance;
        }

        [Required]
        public int Row { get; set; }

        [Required]
        public int Col { get; set; }

        public bool IsVisited { get; set; }

        public double Distance { get; set; }

        public INode PreviousNode { get; set; }

        public NodeType? NodeType { get; set; }

        public override bool Equals(object obj)
            => obj is BfsNode other && (this.Row == other.Row && this.Col == other.Col);

        public override int GetHashCode()
        {
            unchecked
            {
                return (this.Row * 397) ^ this.Col;
            }
        }

        public int CompareTo(object obj)
            => 0;
    }
}
