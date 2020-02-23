namespace AlgoVisualizer.Services.PathFindingAlgorithms.Interfaces
{
    using Models;
    using Models.PathFinding;
    using Models.PathFinding.Dfs;

    public interface IDfsService
    {
        Result FindPath(DfsServiceModel model);
    }
}
