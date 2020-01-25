namespace AlgoVisualizer.Services.Interfaces
{
    using Models;
    using Models.Dijkstra;

    public interface IDijkstraService
    {
        Result FindPath(DijkstraServiceModel model);
    }
}
