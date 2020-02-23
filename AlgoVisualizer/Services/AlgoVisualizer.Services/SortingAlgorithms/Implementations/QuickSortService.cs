namespace AlgoVisualizer.Services.SortingAlgorithms.Implementations
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Interfaces;
    using Models.SortingAlgorithms;

    public class QuickSortService : IQuickSortService
    {
        public const string EmptyArrayErrorMessage = "There is nothing to sort!";

        private int[] array;
        private readonly List<int[]> result = new List<int[]>();

        public Result<int> Sort(int[] data)
        {
            this.array = data;

            if (!data.Any())
            {
                return new Result<int>(EmptyArrayErrorMessage);
            }

            this.QuickSort(0, this.array.Length - 1);

            return new Result<int>(this.result);
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
                if (this.array[i] <= pivot)
                {
                    this.Swap(i, partitionIndex);
                    partitionIndex++;
                }
            }

            this.Swap(partitionIndex, end);

            return partitionIndex;
        }

        private void Swap(int firstElementIndex, int secondElementIndex)
        {
            this.result.Add(new []{firstElementIndex, secondElementIndex});
            var temp = this.array[firstElementIndex];
            this.array[firstElementIndex] = this.array[secondElementIndex];
            this.array[secondElementIndex] = temp;
        }
    }
}
