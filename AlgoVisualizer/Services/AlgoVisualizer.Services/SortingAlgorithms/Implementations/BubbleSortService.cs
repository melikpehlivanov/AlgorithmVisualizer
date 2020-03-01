namespace AlgoVisualizer.Services.SortingAlgorithms.Implementations
{
    using System.Collections.Generic;
    using System.Linq;
    using Common;
    using Interfaces;
    using Models.SortingAlgorithms;

    public class BubbleSortService : BaseSortingService, IBubbleSortService
    {
        private List<int> unsortedData;
        private readonly List<int[]> swappingIndexes = new List<int[]>();

        public Result<int> Sort(int[] data)
        {
            if (!data.Any())
            {
                return new Result<int>(NotificationMessages.SortingAlgorithms.EmptyArrayErrorMessage);
            }

            this.unsortedData = new List<int>(data);

            this.BubbleSort(data);

            return this.GenerateResult(data, this.unsortedData, this.swappingIndexes);
        }

        private void BubbleSort(IList<int> data)
        {
            for (int i = 1; i <= data.Count - 1; i++)
            {
                bool isSortingMade = false;
                for (int j = 0; j < data.Count - 1; j++)
                {
                    var firstElementIndex = j;
                    var adjacentElementIndex = j + 1;
                    if (data[firstElementIndex] > data[adjacentElementIndex])
                    {
                        this.Swap(data, firstElementIndex, adjacentElementIndex);
                        this.swappingIndexes.Add(new[] { firstElementIndex, adjacentElementIndex });

                        isSortingMade = true;
                    }
                }

                if (!isSortingMade)
                {
                    break;
                }
            }
        }
    }
}
