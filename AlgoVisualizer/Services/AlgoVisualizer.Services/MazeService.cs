namespace AlgoVisualizer.Services
{
    using System;
    using System.Collections.Generic;
    using Common.Utils;
    using Models.Maze;
    using Models.PathFinding.Enums;
    using PathFindingAlgorithms.Implementations;

    public class MazeService : BaseService, IMazeService
    {
        private readonly List<int[]> elements = new List<int[]>();
        private readonly Random random = new Random();

        public List<int[]> GenerateWallMaze(MazeServiceModel model)
        {
            if (!ValidationUtil.IsObjectValid(model))
            {
                return null;
            }

            this.GenerateMaze(model.Grid, 0, 0, NodeType.Wall);

            return this.elements;
        }

        public List<int[]> GenerateWeightMaze(MazeServiceModel model)
        {
            if (!ValidationUtil.IsObjectValid(model))
            {
                return null;
            }

            this.GenerateMaze(model.Grid, 0, 0, NodeType.Weight);

            return this.elements;
        }

        private void GenerateMaze(MazeNode[,] grid, int startRow, int startCol, NodeType nodeType)
        {
            this.GenerateMazeFrame(grid, startRow, startCol, nodeType);
            this.GenerateNodesVertically(grid, startRow + 1, startCol + 1, nodeType);
        }

        private void GenerateNodesVertically(MazeNode[,] grid, int row, int col, NodeType nodeType)
        {
            if (!CanTraverse(grid, row, col)
                || grid[row, col].IsVisited)
            {
                return;
            }

            this.SetNode(grid, row, col, nodeType);
            this.GenerateNodesVertically(grid, row + 1, col, nodeType);
            this.GenerateNodesVertically(grid, 1, col + 1, nodeType);
        }

        private void GenerateMazeFrame(MazeNode[,] grid, int row, int col, NodeType nodeType)
        {
            if (!CanTraverse(grid, row, col)
                    || grid[row, col].IsVisited)
            {
                return;
            }

            this.SetNode(grid, row, col, nodeType, false);
            if (row == 0)
            {
                this.GenerateMazeFrame(grid, row, col + 1, nodeType);
            }
            if (col == grid.GetLength(1) - 1)
            {
                this.GenerateMazeFrame(grid, row + 1, col, nodeType);
            }
            if (row == grid.GetLength(0) - 1)
            {
                this.GenerateMazeFrame(grid, row, col - 1, nodeType);
            }
            if (col == 0)
            {
                this.GenerateMazeFrame(grid, row - 1, col, nodeType);
            }
        }

        private void SetNode(MazeNode[,] grid, int row, int col, NodeType nodeType, bool shouldRandomize = true)
        {
            var node = grid[row, col];
            if (node.NodeType != NodeType.Start && node.NodeType != NodeType.End)
            {
                if (this.random.Next(1, 11) > 7)
                {
                    node.NodeType = nodeType;
                    this.elements.Add(new[] { row, col });
                }
                else if (!shouldRandomize)
                {
                    node.NodeType = nodeType;
                    this.elements.Add(new[] { row, col });
                }

                node.IsVisited = true;
            }
        }

        private static bool CanTraverse(
            MazeNode[,] grid,
            int currentRowDirection,
            int currentColDirection)
            => currentRowDirection >= 0 && currentColDirection >= 0
                                        && (currentRowDirection < grid.GetLength(0)
                                            && currentColDirection < grid.GetLength(1));
    }
}
