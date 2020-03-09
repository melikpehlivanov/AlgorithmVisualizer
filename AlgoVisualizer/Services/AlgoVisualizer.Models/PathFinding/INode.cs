namespace AlgoVisualizer.Models.PathFinding
{
    using System;
    using Enums;

    public interface INode : IComparable
    {
        int Row { get; }

        int Col { get; }

        bool IsVisited { get; set; }

        INode PreviousNode { get; set; }

        NodeType? NodeType { get; set; }
    }
}