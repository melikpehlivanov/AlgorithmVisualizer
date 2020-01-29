namespace AlgoVisualizer.Services.Interfaces
{
    using Models;
    using Models.Bfs;

    public interface IBfsService
    {
        Result FindPath(BfsServiceModel model);
    }
}
