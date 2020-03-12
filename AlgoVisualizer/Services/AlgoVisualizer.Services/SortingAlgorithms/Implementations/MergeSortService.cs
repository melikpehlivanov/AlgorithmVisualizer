namespace AlgoVisualizer.Services.SortingAlgorithms.Implementations
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Common;
    using Interfaces;
    using Models.SortingAlgorithms;

    public class MergeSortService : BaseSortingService, IMergeSortService
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

            this.MergeSort(0, data.Length - 1, data);

            return this.GenerateResult(data, unsortedArray, this.swappingIndexes);
        }

        private void MergeSort<T>(int start, int end, T[] array)
            where T : struct,
            IComparable,
            IComparable<T>,
            IConvertible,
            IEquatable<T>,
            IFormattable
        {
            if (start < end)
            {
                var midPoint = (start + end) / 2;
                this.MergeSort(start, midPoint, array);
                this.MergeSort(midPoint + 1, end, array);
                this.Merge(array, start, midPoint, end);
            }
        }

        private void Merge<T>(T[] array, int start, int midPoint, int end)
            where T : struct,
            IComparable,
            IComparable<T>,
            IConvertible,
            IEquatable<T>,
            IFormattable
        {
            var newArray = new MergeSortConciseModel<T>[end - start + 1];

            var leftSideIndex = start;
            var rightSideIndex = midPoint + 1;
            var index = 0;

            while (leftSideIndex <= midPoint
                   && rightSideIndex <= end)
            {
                if (array[leftSideIndex].CompareTo(array[rightSideIndex]) < 0)
                {
                    newArray[index] = new MergeSortConciseModel<T>(array[leftSideIndex], leftSideIndex);
                    leftSideIndex++;
                }
                else
                {
                    newArray[index] = new MergeSortConciseModel<T>(array[rightSideIndex], rightSideIndex);
                    rightSideIndex++;
                }

                index++;
            }

            index = CopyRemainingElementsFromTheLeft(array, midPoint, leftSideIndex, newArray, index);
            CopyRemainingElementsFromTheRight(array, end, rightSideIndex, newArray, index);

            this.CopyElements(array, start, newArray);
        }

        private static void CopyRemainingElementsFromTheRight<T>(
            IReadOnlyList<T> array,
            int end,
            int rightSideIndex,
            IList<MergeSortConciseModel<T>> newArray,
            int index)
            where T : struct,
            IComparable,
            IComparable<T>,
            IConvertible,
            IEquatable<T>,
            IFormattable
        {
            while (rightSideIndex <= end)
            {
                newArray[index] = new MergeSortConciseModel<T>(array[rightSideIndex], rightSideIndex);
                rightSideIndex++;
                index++;
            }
        }

        private static int CopyRemainingElementsFromTheLeft<T>(
            IReadOnlyList<T> array,
            int midPoint,
            int leftSideIndex,
            IList<MergeSortConciseModel<T>> newArray,
            int index)
            where T : struct,
            IComparable,
            IComparable<T>,
            IConvertible,
            IEquatable<T>,
            IFormattable
        {
            while (leftSideIndex <= midPoint)
            {
                newArray[index] = new MergeSortConciseModel<T>(array[leftSideIndex], leftSideIndex);
                leftSideIndex++;
                index++;
            }

            return index;
        }

        private void CopyElements<T>(
            IList<T> array,
            int start,
            IReadOnlyList<MergeSortConciseModel<T>> newArray)
            where T : struct,
            IComparable,
            IComparable<T>,
            IConvertible,
            IEquatable<T>,
            IFormattable
        {
            for (var i = 0; i < newArray.Count; i++)
            {
                var element = newArray[i];
                var swappingIndex = start + i;
                if (array[swappingIndex].CompareTo(element.Value) != 0)
                {
                    this.AddSwappingIndexes(array, newArray, swappingIndex, element);
                }
            }
        }

        private void AddSwappingIndexes<T>(
            IList<T> array,
            IEnumerable<MergeSortConciseModel<T>> newArray,
            int swappingIndex,
            MergeSortConciseModel<T> element)
            where T : struct,
            IComparable,
            IComparable<T>,
            IConvertible,
            IEquatable<T>,
            IFormattable
        {
            var temp = array[swappingIndex];
            array[swappingIndex] = element.Value;
            array[element.CurrentIndex] = temp;

            this.swappingIndexes.Add(new[] { swappingIndex, element.CurrentIndex });

            var elementsToIterateThrough = newArray.Where(x => x.Value.CompareTo(temp) == 0);
            foreach (var item in elementsToIterateThrough)
            {
                item.CurrentIndex = element.CurrentIndex;
                if (elementsToIterateThrough.Count() > 1)
                {
                    element.CurrentIndex++;
                }
            }

            element.CurrentIndex = swappingIndex;
        }
    }
}