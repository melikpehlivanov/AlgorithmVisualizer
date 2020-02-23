namespace AlgoVisualizer.Services.PathFindingAlgorithms.Interfaces
{
    using Models;
    using Models.PathFinding;
    using Models.PathFinding.AStar;

    public interface IAStarService
    {
         Result FindPath(AStarServiceModel model);
    }
}
