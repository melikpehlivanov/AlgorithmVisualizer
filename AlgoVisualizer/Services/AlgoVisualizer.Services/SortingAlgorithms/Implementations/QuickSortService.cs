namespace AlgoVisualizer.Services.SortingAlgorithms.Implementations
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Common;
    using Interfaces;
    using Models.SortingAlgorithms;

    public class QuickSortService : BaseSortingService, IQuickSortService
    {
        private readonly List<int[]> result = new List<int[]>();

        public Result Sort<T>(T[] data)
            where T : struct,
            IComparable,
            IComparable<T>,
            IConvertible,
            IEquatable<T>,
            IFormattable
        {
            if (!data.Any())
            {
                return new Result(NotificationMessages.SortingAlgorithms.EmptyArrayErrorMessage);
            }

            var unsortedData = new List<T>(data);

            this.QuickSort(data, 0, data.Length - 1);

            return this.GenerateResult(data, unsortedData, this.result);
        }

        private void QuickSort<T>(IList<T> array, int start, int end)
            where T : struct,
            IComparable,
            IComparable<T>,
            IConvertible,
            IEquatable<T>,
            IFormattable
        {
            if (start < end)
            {
                var partitionIndex = this.Partition(array, start, end);
                this.QuickSort(array, start, partitionIndex - 1);
                this.QuickSort(array, partitionIndex + 1, end);
            }
        }

        private int Partition<T>(IList<T> array, int start, int end)
            where T : struct,
            IComparable,
            IComparable<T>,
            IConvertible,
            IEquatable<T>,
            IFormattable
        {
            var pivot = array[end];
            var partitionIndex = start;

            for (var i = start; i < end; i++)
            {
                if (array[i].CompareTo(pivot) < 0)
                {
                    this.Swap(array, i, partitionIndex);
                    this.result.Add(new[] { i, partitionIndex });

                    partitionIndex++;
                }
            }

            this.Swap(array, partitionIndex, end);

            return partitionIndex;
        }
    }
}
