namespace AlgoVisualizer.Services.SortingAlgorithms.Implementations
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Common;
    using Interfaces;
    using Models.SortingAlgorithms;

    public class SelectionSortService : BaseSortingService, ISelectionSortService
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

            var unsortedData = new List<T>(data);

            this.SelectionSort(data);

            return this.GenerateResult(data, unsortedData, this.swappingIndexes);
        }

        private void SelectionSort<T>(T[] data)
            where T : struct,
            IComparable,
            IComparable<T>,
            IConvertible,
            IEquatable<T>,
            IFormattable
        {
            for (var i = 0; i < data.Length - 1; i++)
            {
                var smallestElementIndex = this.GetIndexOfSmallestElement(data, i);

                // If there's no smaller element than the current - continue
                if (smallestElementIndex == i)
                {
                    continue;
                }

                this.swappingIndexes.Add(new[] { i, smallestElementIndex });
                this.Swap(data, i, smallestElementIndex);
            }
        }

        private int GetIndexOfSmallestElement<T>(IReadOnlyList<T> data, int currentSmallestElementIndex)
            where T : struct,
            IComparable,
            IComparable<T>,
            IConvertible,
            IEquatable<T>,
            IFormattable
        {
            for (var i = currentSmallestElementIndex + 1; i < data.Count; i++)
            {
                if (data[currentSmallestElementIndex].CompareTo(data[i]) > 0)
                {
                    currentSmallestElementIndex = i;
                }
            }

            return currentSmallestElementIndex;
        }
    }
}