namespace AlgoVisualizer.Services.PathFindingAlgorithms.Interfaces
{
    using Models;
    using Models.Bfs;

    public interface IBfsService
    {
        Result FindPath(BfsServiceModel model);
    }
}
