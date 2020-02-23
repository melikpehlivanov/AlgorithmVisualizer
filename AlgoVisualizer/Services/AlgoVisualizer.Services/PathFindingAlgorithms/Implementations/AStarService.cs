namespace AlgoVisualizer.Services.PathFindingAlgorithms.Implementations
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Common.DataStructures;
    using Interfaces;
    using Models;
    using Models.AStar;
    using Models.Enums;

    public class AStarService : BaseService, IAStarService
    {
        public Result FindPath(AStarServiceModel model)
        {
            if (!this.IsEntityStateValid(model))
            {
                return null;
            }

            var heap = new MinHeap<AStarNode>();
            var allSteps = new HashSet<INode>();

            var startNode = model.StartNode;
            var endNode = model.EndNode;
            var grid = model.Grid;

            startNode.GScore = 0;
            startNode.HScore = this.ManhattanDistance(startNode, endNode);
            startNode.IsVisited = true;
            startNode.Direction = NodeDirection.Up;
            heap.Add(startNode);

            while (heap.Count != 0)
            {
                var currentNode = heap.Pop();

                if (currentNode.NodeType == NodeType.Wall)
                    continue;

                if (currentNode.Equals(endNode))
                {
                    // Remove StartNode
                    allSteps.Remove(allSteps.ElementAt(0));
                    return new Result(allSteps, this.GetAllNodesInShortestPathOrder(currentNode));
                }

                allSteps.Add(currentNode);

                var rowDirection = new[] { -1, +1, 0, 0 };
                var columnDirection = new[] { 0, 0, +1, -1 };
                for (int i = 0; i < 4; i++)
                {
                    var currentRowDirection = currentNode.Row + rowDirection[i];
                    var currentColDirection = currentNode.Col + columnDirection[i];

                    if ((currentRowDirection < 0 || currentColDirection < 0)
                        || (currentRowDirection >= grid.GetLength(0)
                            || currentColDirection >= grid.GetLength(1)))
                    {
                        continue;
                    }

                    var nextNode = grid[currentRowDirection, currentColDirection];
                    this.AddNodeToHeap(currentNode, nextNode, endNode, heap);
                }
            }

            return new Result(allSteps);
        }

        private void AddNodeToHeap(AStarNode currentNode, AStarNode nextNode, INode end, MinHeap<AStarNode> heap)
        {
            if (nextNode.IsVisited)
                return;

            var (additionalWeight, direction) = this.ApplyWeightAndDirection(currentNode, nextNode);
            var g = currentNode.GScore + nextNode.Weight + additionalWeight;
            var h = this.ManhattanDistance(nextNode, end);

            if (g < nextNode.GScore)
            {
                nextNode.GScore = g;
                nextNode.HScore = h;
                nextNode.PreviousNode = currentNode;
                nextNode.IsVisited = true;
            }

            currentNode.Direction = direction;

            heap.Add(nextNode);
        }

        private double ManhattanDistance(INode currentNode, INode end)
        {
            var dx = Math.Abs(end.Row - currentNode.Row);
            var dy = Math.Abs(end.Col - currentNode.Col);
            return (dx + dy);
        }

        private (double weight, NodeDirection? Direction) ApplyWeightAndDirection(AStarNode nodeOne, INode nodeTwo)
        {
            var x1 = nodeOne.Row;
            var y1 = nodeOne.Col;
            var x2 = nodeTwo.Row;
            var y2 = nodeTwo.Col;

            if (x2 < x1 && y1 == y2)
            {
                switch (nodeOne.Direction)
                {
                    case NodeDirection.Up:
                        return (1, NodeDirection.Up);
                    case NodeDirection.Right:
                        return (2, NodeDirection.Up);
                    case NodeDirection.Left:
                        return (2, NodeDirection.Up);
                    case NodeDirection.Down:
                        return (3, NodeDirection.Up);
                }
            }
            else if (x2 > x1 && y1 == y2)
            {
                switch (nodeOne.Direction)
                {
                    case NodeDirection.Up:
                        return (3, NodeDirection.Down);
                    case NodeDirection.Right:
                        return (2, NodeDirection.Down);
                    case NodeDirection.Left:
                        return (2, NodeDirection.Down);
                    case NodeDirection.Down:
                        return (1, NodeDirection.Down);
                }
            }
            if (y2 < y1 && x1 == x2)
            {
                switch (nodeOne.Direction)
                {
                    case NodeDirection.Up:
                        return (2, NodeDirection.Left);
                    case NodeDirection.Right:
                        return (3, NodeDirection.Left);
                    case NodeDirection.Left:
                        return (1, NodeDirection.Left);
                    case NodeDirection.Down:
                        return (2, NodeDirection.Left);
                }
            }
            else if (y2 > y1 && x1 == x2)
            {
                switch (nodeOne.Direction)
                {
                    case NodeDirection.Up:
                        return (2, NodeDirection.Right);
                    case NodeDirection.Right:
                        return (1, NodeDirection.Right);
                    case NodeDirection.Left:
                        return (3, NodeDirection.Right);
                    case NodeDirection.Down:
                        return (2, NodeDirection.Right);
                }
            }

            return default;
        }
    }
}
