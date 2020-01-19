namespace AlgoVisualizer.Models
{
    using Enums;

    public class Node : INode
    {
        public Node(int row, int col, INode previousNode = null, double distance = double.PositiveInfinity)
        {
            this.Row = row;
            this.Col = col;
            this.PreviousNode = previousNode;
            this.Distance = distance;
        }

        public int Row { get; set; }

        public int Col { get; set; }

        public bool IsVisited { get; set; }

        public double Distance { get; set; }

        public int Weight { get; set; } = 1;

        public NodeType? NodeType { get; set; }

        public INode PreviousNode { get; set; }

        public virtual int CompareTo(object obj)
            => obj switch
            {
                Node otherNode => this.Distance.CompareTo(otherNode.Distance),
                _ => 0
            };
    }
}
