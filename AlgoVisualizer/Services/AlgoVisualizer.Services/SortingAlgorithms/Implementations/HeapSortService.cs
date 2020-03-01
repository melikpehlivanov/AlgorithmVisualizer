namespace AlgoVisualizer.Services.SortingAlgorithms.Implementations
{
    using System.Collections.Generic;
    using System.Linq;
    using Common;
    using Interfaces;
    using Models.SortingAlgorithms;

    public class HeapSortService : BaseSortingService, IHeapSortService
    {
        private List<int> unsortedArray;
        private readonly List<int[]> swappingIndexes = new List<int[]>();

        public Result<int> Sort(int[] data)
        {
            if (!data.Any())
            {
                return new Result<int>(NotificationMessages.SortingAlgorithms.EmptyArrayErrorMessage);
            }

            this.unsortedArray = new List<int>(data);

            this.HeapSort(data);

            return this.GenerateResult(data, this.unsortedArray, this.swappingIndexes);
        }

        private void HeapSort(int[] data)
        {
            //ALGORITHM:
            //1. Build a "max heap" out of the unsorted data (a heap with the largest value as the first node).
            //2. Swap the first element of the heap with the final element.  That element, now at final position is considered sorted.
            //   In effect, this makes the largest element, the last one in the considered range.
            //3. Decrease the range of considered elements (those still needing to be sorted) by 1.
            //4. Continue until the considered range of elements is 1.

            var length = data.Length - 1;
            for (int i = length / 2; i >= 0; i--)
            {
                this.Heapify(data, length, i);
            }

            for (int i = length; i >= 0; i--)
            {
                this.Swap(data, 0, i);
                this.swappingIndexes.Add(new[] { 0, i });
                this.Heapify(data, i, 0);
            }
        }

        private void Heapify(IList<int> array, int length, int index)
        {
            var largestElementIndex = index;
            var left = 2 * index + 1;
            var right = 2 * index + 2;

            if (left < length && array[left] > array[largestElementIndex])
            {
                largestElementIndex = left;
            }
            if (right < length && array[right] > array[largestElementIndex])
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
