namespace AlgoVisualizer.Services.SortingAlgorithms.Implementations
{
    using System.Collections.Generic;
    using System.Linq;
    using Common;
    using Interfaces;
    using Models.SortingAlgorithms;

    public class QuickSortService : BaseSortingService, IQuickSortService
    {
        private int[] array;
        private List<int> unsortedData;
        private readonly List<int[]> result = new List<int[]>();

        public Result<int> Sort(int[] data)
        {
            this.array = data;
            this.unsortedData = new List<int>(data);

            if (!data.Any())
            {
                return new Result<int>(NotificationMessages.SortingAlgorithms.EmptyArrayErrorMessage);
            }

            this.QuickSort(0, this.array.Length - 1);

            return this.GenerateResult(data, this.unsortedData, this.result);
        }

        private void QuickSort(int start, int end)
        {
            if (start < end)
            {
                var partitionIndex = this.Partition(start, end);
                this.QuickSort(start, partitionIndex - 1);
                this.QuickSort(partitionIndex + 1, end);
            }
        }

        private int Partition(int start, int end)
        {
            var pivot = this.array[end];
            var partitionIndex = start;

            for (var i = start; i < end; i++)
            {
                if (this.array[i] < pivot)
                {
                    this.Swap(this.array, i, partitionIndex);
                    this.result.Add(new[] { i, partitionIndex });

                    partitionIndex++;
                }
            }

            this.Swap(this.array, partitionIndex, end);

            return partitionIndex;
        }
    }
}
