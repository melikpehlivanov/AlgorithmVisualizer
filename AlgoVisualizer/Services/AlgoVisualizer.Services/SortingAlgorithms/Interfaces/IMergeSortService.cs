namespace AlgoVisualizer.Services.SortingAlgorithms.Interfaces
{
    using Models.SortingAlgorithms;

    public interface IMergeSortService
    {
        Result<int> Sort(int[] array);
    }
}
