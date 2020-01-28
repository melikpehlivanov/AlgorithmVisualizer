namespace AlgoVisualizer.Models
{
    using Enums;

    public class Node : INode
    {
        public int Row { get; set; }

        public int Col { get; set; }

        public double Distance { get; set; }

        public bool IsVisited { get; set; }

        public INode PreviousNode { get; set; }

        public NodeType? NodeType { get; set; }

        public int CompareTo(object obj)
            => 0;
    }
}
