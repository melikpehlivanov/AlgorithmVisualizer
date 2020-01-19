namespace AlgoVisualizer.Services.Interfaces
{
    using Models;

    public interface IAStarService
    {
         Result FindPath(INode[,] grid, AStarNode startNode, AStarNode endNode);
    }
}
