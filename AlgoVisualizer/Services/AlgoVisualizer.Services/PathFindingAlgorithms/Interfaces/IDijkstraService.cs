namespace AlgoVisualizer.Services.PathFindingAlgorithms.Interfaces
{
    using Models.PathFinding;
    using Models.PathFinding.Dijkstra;

    public interface IDijkstraService
    {
        Result FindPath(DijkstraServiceModel model);
    }
}