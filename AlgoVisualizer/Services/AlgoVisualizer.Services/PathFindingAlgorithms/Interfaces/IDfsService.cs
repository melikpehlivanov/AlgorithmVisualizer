namespace AlgoVisualizer.Services.PathFindingAlgorithms.Interfaces
{
    using Models;
    using Models.Dfs;

    public interface IDfsService
    {
        Result FindPath(DfsServiceModel model);
    }
}
