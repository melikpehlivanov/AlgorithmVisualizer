namespace AlgoVisualizer.Services.Interfaces
{
    using Models;
    using Models.AStar;

    public interface IAStarService
    {
         Result FindPath(AStarServiceModel model);
    }
}
