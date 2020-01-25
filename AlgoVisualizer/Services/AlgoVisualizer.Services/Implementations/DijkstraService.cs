﻿namespace AlgoVisualizer.Services.Implementations
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Common.DataStructures;
    using Interfaces;
    using Models;
    using Models.Dijkstra;
    using Models.Enums;

    public class DijkstraService : BaseService, IDijkstraService
    {
        private DijkstraNode startNode;
        private DijkstraNode endNode;

        public Result FindPath(DijkstraServiceModel model)
        {
            this.startNode = model.StartNode;
            this.endNode = model.EndNode;
            var grid = model.Grid;

            var heap = new Queue<DijkstraNode>();
            var allSteps = new HashSet<INode>();

            this.startNode.Distance = 0;
            this.startNode.IsVisited = true;
            heap.Enqueue(this.startNode);

            while (heap.Count != 0)
            {
                var currentNode = heap.Dequeue();

                if (grid[currentNode.Row, currentNode.Col].NodeType == NodeType.Wall)
                    continue;

                // Destination target found
                if (currentNode.Equals(this.endNode))
                {
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

                    var targetNode = grid[currentRowDirection, currentColDirection];
                    this.AddNodeToHeap(currentNode, targetNode, heap);
                }
            }

            return new Result(allSteps);
        }

        private void AddNodeToHeap(
            DijkstraNode currentNode,
            DijkstraNode targetNode,
            Queue<DijkstraNode> heap)
        {
            if (targetNode.IsVisited || !(targetNode.Distance > currentNode.Distance))
                return;

            var newDistance = currentNode.Distance + targetNode.Weight + this.AddAdditionalWeight(currentNode, targetNode);
            targetNode.Distance = newDistance < targetNode.Distance ? newDistance : int.MaxValue;

            targetNode.PreviousNode = currentNode;
            targetNode.IsVisited = true;
            heap.Enqueue(targetNode);
        }

        private double AddAdditionalWeight(
            INode currentNode,
            INode targetNode)
        {
            /*This code computes the vector cross-product between the start to goal vector and the current point to goal vector.
             When these vectors don’t line up, the cross product will be larger. 
             The result is that this code will give some slight preference to a path that lies along the STRAIGHT LINE
             path from the start to the goal.*.*/

            var dx1 = currentNode.Row - targetNode.Row;
            var dy1 = currentNode.Col - targetNode.Col;
            var dx2 = this.startNode.Row - this.endNode.Row;
            var dy2 = this.startNode.Col - this.endNode.Col;
            var cross = Math.Abs(dx1 * dy2 - dx2 * dy1);
            return cross * 0.001;
        }
    }
}