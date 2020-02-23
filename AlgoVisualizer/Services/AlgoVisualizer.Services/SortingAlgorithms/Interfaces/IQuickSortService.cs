namespace AlgoVisualizer.Services.SortingAlgorithms.Interfaces
{
    using Models.SortingAlgorithms;

    public interface IQuickSortService
    {
        Result<int> Sort(int[] data);
    }
}
