namespace AlgoVisualizer.Services.SortingAlgorithms.Implementations
{
    using System.Collections.Generic;
    using System.Linq;
    using Common;
    using Models.SortingAlgorithms;

    public class BaseSortingService
    {
        public Result<int> GenerateResult(IEnumerable<int> data, IEnumerable<int> unsortedData, List<int[]> swappingIndexes)
        {
            return data.SequenceEqual(unsortedData) ?
                new Result<int>(NotificationMessages.SortingAlgorithms.DataAlreadySortedErrorMessage)
                : new Result<int>(swappingIndexes);
        }

        public void Swap(IList<int> data, int firstIndex, int secondIndex)
        {
            var firstElement = data[firstIndex];
            data[firstIndex] = data[secondIndex];
            data[secondIndex] = firstElement;
        }
    }
}
