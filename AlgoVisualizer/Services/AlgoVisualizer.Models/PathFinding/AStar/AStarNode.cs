namespace AlgoVisualizer.Models.PathFinding.AStar
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using Common;
    using Enums;

    public class AStarNode : INode
    {
        public int Weight { get; set; } = ModelConstants.DefaultWeightNodeValue;

        public double GScore { get; set; } = double.PositiveInfinity;

        public double HScore { get; set; }

        public double FScore => this.GScore + this.HScore;

        public NodeDirection? Direction { get; set; }

        [Required]
        public int Row { get; set; }

        [Required]
        public int Col { get; set; }

        public bool IsVisited { get; set; }

        public INode PreviousNode { get; set; }

        public NodeType? NodeType { get; set; }

        public int CompareTo(object obj)
        {
            var otherNode = obj as AStarNode;
            if (otherNode != null
                && Math.Abs(this.FScore - otherNode.FScore) < 1)
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

        public override bool Equals(object obj)
            => obj is AStarNode other && this.Row == other.Row && this.Col == other.Col;

        public override int GetHashCode()
        {
            unchecked
            {
                return (this.Row * 397) ^ this.Col;
            }
        }
    }
}