namespace AlgoVisualizer.Models
{
    using System;
    using Enums;

    public class AStarNode : Node
    {
        public AStarNode(int row, int col, INode previousNode = null, double distance = double.PositiveInfinity)
            : base(row, col, previousNode, distance)
        {
            this.PreviousNode = previousNode;
        }

        public double H { get; set; }

        public double FScore => this.Distance + this.H;

        public NodeDirection? Direction { get; set; }

        public override int CompareTo(object obj)
        {
            var otherNode = obj as AStarNode;
            if (otherNode != null && Math.Abs(this.FScore - otherNode.FScore) < 1)
            {
                if (this.H > otherNode.H)
                {
                    return 1;
                }

                if (this.H < otherNode.H)
                {
                    return -1;
                }
            }

            return this.FScore.CompareTo(otherNode.FScore);
        }
    }
}
