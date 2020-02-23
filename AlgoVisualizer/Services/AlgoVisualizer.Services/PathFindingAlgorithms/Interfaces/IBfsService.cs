namespace AlgoVisualizer.Services.PathFindingAlgorithms.Interfaces
{
    using Models;
    using Models.PathFinding;
    using Models.PathFinding.Bfs;

    public interface IBfsService
    {
        Result FindPath(BfsServiceModel model);
    }
}
