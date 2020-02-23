namespace AlgoVisualizer.Services.PathFindingAlgorithms.Interfaces
{
    using Models;
    using Models.AStar;

    public interface IAStarService
    {
         Result FindPath(AStarServiceModel model);
    }
}
