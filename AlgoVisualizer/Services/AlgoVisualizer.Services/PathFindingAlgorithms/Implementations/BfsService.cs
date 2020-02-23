namespace AlgoVisualizer.Services.PathFindingAlgorithms.Implementations
{
    using System.Collections.Generic;
    using System.Linq;
    using Interfaces;
    using Models;
    using Models.PathFinding;
    using Models.PathFinding.Bfs;
    using Models.PathFinding.Enums;

    public class BfsService : BaseService, IBfsService
    {
        public Result FindPath(BfsServiceModel model)
        {
            if (!this.IsEntityStateValid(model))
            {
                return null;
            }

            var startNode = model.StartNode;
            var endNode = model.EndNode;
            var grid = model.Grid;

            var allSteps = new HashSet<BfsNode>();
            var queue = new Queue<BfsNode>();
            queue.Enqueue(startNode);

            while (queue.Count != 0)
            {
                var currentNode = queue.Dequeue();

                if (grid[currentNode.Row, currentNode.Col].NodeType == NodeType.Wall)
                    continue;

                // Destination target found
                if (currentNode.Equals(endNode))
                {
                    allSteps.Remove(allSteps.ElementAt(0));
                    var shortestPathOrder = this.GetAllNodesInShortestPathOrder(currentNode);
                    return new Result(allSteps, shortestPathOrder);
                }

                allSteps.Add(currentNode);

                // Up 
                if (currentNode.Row - 1 >= 0 &&
                    !grid[currentNode.Row - 1, currentNode.Col].IsVisited)
                {
                    AddNodeToQueue(grid, queue, currentNode, currentNode.Row - 1, currentNode.Col);
                }

                // Right 
                if (currentNode.Col + 1 < grid.GetLength(1)
                    && !grid[currentNode.Row, currentNode.Col + 1].IsVisited)
                {
                    AddNodeToQueue(grid, queue, currentNode, currentNode.Row, currentNode.Col + 1);
                }

                // Down 
                if (currentNode.Row + 1 < grid.GetLength(0) &&
                    !grid[currentNode.Row + 1, currentNode.Col].IsVisited)
                {
                    AddNodeToQueue(grid, queue, currentNode, currentNode.Row + 1, currentNode.Col);
                }

                // Left 
                if (currentNode.Col - 1 >= 0 &&
                    !grid[currentNode.Row, currentNode.Col - 1].IsVisited)
                {
                    AddNodeToQueue(grid, queue, currentNode, currentNode.Row, currentNode.Col - 1);
                }
            }

            return new Result(allSteps);
        }

        private static void AddNodeToQueue(
            BfsNode[,] grid,
            Queue<BfsNode> queue,
            BfsNode node,
            int nodeRow,
            int nodeCol)
        {
            queue.Enqueue(new BfsNode(nodeRow, nodeCol, node, node.Distance + 1));
            grid[nodeRow, nodeCol].IsVisited = true;
        }
    }
}
