namespace AlgoVisualizer.Models.AStar
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using Common;
    using Enums;

    public class AStarNode : INode
    {
        [Required]
        public int Row { get; set; }

        [Required]
        public int Col { get; set; }

        public bool IsVisited { get; set; }

        public int Weight { get; set; } = ModelConstants.DefaultWeightNodeValue;

        public INode PreviousNode { get; set; }

        public double GScore { get; set; } = double.PositiveInfinity;

        public double HScore { get; set; }

        public double FScore => this.GScore + this.HScore;

        public NodeType? NodeType { get; set; }

        public NodeDirection? Direction { get; set; }

        public override bool Equals(object obj)
            => obj is AStarNode other && (this.Row == other.Row && this.Col == other.Col);

        protected bool Equals(AStarNode other)
            => this.Row == other.Row && this.Col == other.Col;

        public override int GetHashCode()
        {
            unchecked
            {
                return (this.Row * 397) ^ this.Col;
            }
        }

        public int CompareTo(object obj)
        {
            var otherNode = obj as AStarNode;
            if (otherNode != null && Math.Abs(this.FScore - otherNode.FScore) < 1)
            {
                if (this.HScore > otherNode.HScore)
                {
                    return 1;
                }

                if (this.HScore < otherNode.HScore)
                {
                    return -1;
                }
            }

            return this.FScore.CompareTo(otherNode.FScore);
        }
    }
}
