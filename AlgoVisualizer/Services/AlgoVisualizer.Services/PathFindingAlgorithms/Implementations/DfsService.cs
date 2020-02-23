namespace AlgoVisualizer.Services.PathFindingAlgorithms.Implementations
{
    using System.Collections.Generic;
    using System.Linq;
    using Interfaces;
    using Models;
    using Models.Dfs;
    using Models.Enums;

    public class DfsService : BaseService, IDfsService
    {
        public Result FindPath(DfsServiceModel model)
        {
            if (!this.IsEntityStateValid(model))
            {
                return null;
            }

            var path = new List<INode>();

            return this.PathFound(model.Grid, model.StartNode, model.EndNode, path)
                ? new Result(path, path)
                : new Result(path);
        }

        private bool PathFound(
            DfsNode[,] grid,
            INode node,
            INode endNode,
            ICollection<INode> path)
        {
            if (node.Equals(endNode))
            {
                path.Remove(path.ElementAt(path.Count - 1));
                return true;
            }

            var rowDirection = new[] { -1, 0, +1, 0 };
            var columnDirection = new[] { 0, +1, 0, -1 };
            for (int i = 0; i < 4; i++)
            {
                var currentRowDirection = node.Row + rowDirection[i];
                var currentColDirection = node.Col + columnDirection[i];

                if (!CanTraverse(grid, currentRowDirection, currentColDirection))
                {
                    continue;
                }

                var nextNode = grid[currentRowDirection, currentColDirection];
                if (nextNode.IsVisited || nextNode.NodeType == NodeType.Wall)
                    continue;

                nextNode.IsVisited = true;
                path.Add(nextNode);

                if (this.PathFound(grid, nextNode, endNode, path))
                {
                    return true;
                }
            }

            return false;
        }

        private static bool CanTraverse(
            DfsNode[,] grid,
            int currentRowDirection,
            int currentColDirection)
            => currentRowDirection >= 0 && currentColDirection >= 0
                                        && (currentRowDirection < grid.GetLength(0)
                                            && currentColDirection < grid.GetLength(1));
    }
}
