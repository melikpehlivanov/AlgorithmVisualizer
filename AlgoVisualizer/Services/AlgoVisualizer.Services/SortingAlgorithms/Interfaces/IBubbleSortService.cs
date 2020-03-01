namespace AlgoVisualizer.Services.SortingAlgorithms.Interfaces
{
    using Models.SortingAlgorithms;

    public interface IBubbleSortService
    {
        Result<int> Sort(int[] data);
    }
}
