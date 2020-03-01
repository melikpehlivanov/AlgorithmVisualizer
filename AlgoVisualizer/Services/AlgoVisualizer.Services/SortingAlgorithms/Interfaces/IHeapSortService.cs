namespace AlgoVisualizer.Services.SortingAlgorithms.Interfaces
{
    using Models.SortingAlgorithms;

    public interface IHeapSortService
    {
        Result<int> Sort(int[] data);
    }
}
