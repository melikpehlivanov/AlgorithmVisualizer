namespace AlgoVisualizer.Services.SortingAlgorithms.Implementations
{
    using System.Collections.Generic;
    using System.Linq;
    using Common;
    using Interfaces;
    using Models.SortingAlgorithms;

    public class MergeSortService : IMergeSortService
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

            this.MergeSort(0, data.Length - 1, data);

            return data.SequenceEqual(this.unsortedArray) ?
                new Result<int>(NotificationMessages.SortingAlgorithms.DataAlreadySortedErrorMessage)
                : new Result<int>(this.swappingIndexes);
        }

        private void MergeSort(int start, int end, IList<int> array)
        {
            if (start < end)
            {
                var midPoint = (start + end) / 2;
                this.MergeSort(start, midPoint, array);
                this.MergeSort(midPoint + 1, end, array);
                this.Merge(array, start, midPoint, end);
            }
        }

        private void Merge(IList<int> array, int start, int midPoint, int end)
        {
            var newArray = new MergeSortConciseModel[(end - start) + 1];

            var leftSideIndex = start;
            var rightSideIndex = midPoint + 1;
            var index = 0;

            while ((leftSideIndex <= midPoint) && (rightSideIndex <= end))
            {
                if (array[leftSideIndex] < array[rightSideIndex])
                {
                    newArray[index] = new MergeSortConciseModel(array[leftSideIndex], leftSideIndex);
                    leftSideIndex++;

                }
                else
                {
                    newArray[index] = new MergeSortConciseModel(array[rightSideIndex], rightSideIndex);
                    rightSideIndex++;
                }

                index++;
            }

            index = CopyRemainingElementsFromTheLeft(array, midPoint, leftSideIndex, newArray, index);
            CopyRemainingElementsFromTheRight(array, end, rightSideIndex, newArray, index);

            this.CopyElements(array, start, newArray);
        }

        private static void CopyRemainingElementsFromTheRight(
            IList<int> array,
            int end,
            int rightSideIndex,
            IList<MergeSortConciseModel> newArray,
            int index)
        {
            while (rightSideIndex <= end)
            {
                newArray[index] = new MergeSortConciseModel(array[rightSideIndex], rightSideIndex);
                rightSideIndex++;
                index++;
            }
        }

        private static int CopyRemainingElementsFromTheLeft(
            IList<int> array,
            int midPoint,
            int leftSideIndex,
            IList<MergeSortConciseModel> newArray,
            int index)
        {
            while (leftSideIndex <= midPoint)
            {
                newArray[index] = new MergeSortConciseModel(array[leftSideIndex], leftSideIndex);
                leftSideIndex++;
                index++;
            }

            return index;
        }

        private void CopyElements(
            IList<int> array,
            int start,
            IReadOnlyList<MergeSortConciseModel> newArray)
        {
            for (var i = 0; i < newArray.Count; i++)
            {
                var element = newArray[i];
                var swappingIndex = start + i;

                if (array[start + i] != element.Value)
                {
                    this.AddSwappingIndexes(array, newArray, swappingIndex, element);
                }
                else
                {
                    array[swappingIndex] = element.Value;
                }
            }
        }

        private void AddSwappingIndexes(
            IList<int> array,
            IEnumerable<MergeSortConciseModel> newArray,
            int swappingIndex,
            MergeSortConciseModel element)
        {
            var temp = array[swappingIndex];
            array[swappingIndex] = element.Value;
            array[element.CurrentIndex] = temp;

            this.swappingIndexes.Add(new[] { swappingIndex, element.CurrentIndex });

            newArray.First(x => x.Value == temp).CurrentIndex = element.CurrentIndex;
            element.CurrentIndex = swappingIndex;
        }
    }
}