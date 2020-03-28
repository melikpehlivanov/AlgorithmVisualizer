namespace AlgoVisualizer.Services.SortingAlgorithms.Implementations
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Common;
    using Interfaces;
    using Models.SortingAlgorithms;

    public class HeapSortService : BaseSortingService, IHeapSortService
    {
        private readonly List<int[]> swappingIndexes = new List<int[]>();

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

            var unsortedArray = new List<T>(data);

            this.HeapSort(data);

            return this.GenerateResult(data, unsortedArray, this.swappingIndexes);
        }

        private void HeapSort<T>(IList<T> data)
            where T : struct,
            IComparable,
            IComparable<T>,
            IConvertible,
            IEquatable<T>,
            IFormattable
        {
            //ALGORITHM:
            //1. Build a "max heap" out of the unsorted data (a heap with the largest value as the first node).
            //2. Swap the first element of the heap with the final element.  That element, now at final position is considered sorted.
            //   In effect, this makes the largest element, the last one in the considered range.
            //3. Decrease the range of considered elements (those still needing to be sorted) by 1.
            //4. Continue until the considered range of elements is 1.

            var length = data.Count - 1;
            for (var i = length / 2; i >= 0; i--)
            {
                this.Heapify(data, data.Count, i);
            }

            for (var i = length; i >= 0; i--)
            {
                this.Swap(data, 0, i);
                this.swappingIndexes.Add(new[] { 0, i });
                this.Heapify(data, i, 0);
            }
        }

        private void Heapify<T>(IList<T> array, int length, int index)
            where T : struct,
            IComparable,
            IComparable<T>,
            IConvertible,
            IEquatable<T>,
            IFormattable
        {
            var largestElementIndex = index;
            var left = 2 * index + 1;
            var right = 2 * index + 2;

            if (left < length
                && array[left].CompareTo(array[largestElementIndex]) > 0)
            {
                largestElementIndex = left;
            }

            if (right < length
                && array[right].CompareTo(array[largestElementIndex]) > 0)
            {
                largestElementIndex = right;
            }

            if (largestElementIndex != index)
            {
                this.Swap(array, index, largestElementIndex);
                this.swappingIndexes.Add(new[] { index, largestElementIndex });
                this.Heapify(array, length, largestElementIndex);
            }
        }
    }
}