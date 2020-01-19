namespace AlgoVisualizer.Services.Models
{
    using System;

    public interface INode : IComparable
    {
        int Row { get; set; }

        int Col { get; set; }

        bool IsVisited { get; set; }

        double Distance { get; set; }

        int Weight { get; set; }

        NodeType? NodeType { get; set; }

        INode PreviousNode { get; set; }
    }
}
