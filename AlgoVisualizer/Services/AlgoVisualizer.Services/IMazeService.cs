namespace AlgoVisualizer.Services
{
    using System.Collections.Generic;
    using Models.Maze;

    public interface IMazeService
    {
        List<int[]> GenerateWallMaze(MazeServiceModel model);

        List<int[]> GenerateWeightMaze(MazeServiceModel model);
    }
}