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
            int zeroIndex = 0;
            int indexOfMinElement = FindIndexOfFirstMinElement(data);

            if (indexOfMinElement != zeroIndex)
            {
                swappingIndexes.Add(new int[] { zeroIndex, indexOfMinElement });
                this.Swap(data, zeroIndex, indexOfMinElement);
            }

            for (int i = 1; i < data.Length - 1; i++)
            {
                T currentElement = data[i];
                int indexOfSmallestElement = GetIndexOfSmallestElement(data, currentElement, i);

                if (indexOfSmallestElement != -1)
                {
                    swappingIndexes.Add(new int[] { i, indexOfSmallestElement });
                    this.Swap(data, i, indexOfSmallestElement);
                }
            }
        }

        private int GetIndexOfSmallestElement<T>(T[] data, T currentElement, int startIndex)
             where T : struct,
             IComparable,
             IComparable<T>,
             IConvertible,
             IEquatable<T>,
             IFormattable
        {
            //if there is no element smaller than currentElement this method will return -1
            int indexOfSmallestElement = -1;

            for (int j = startIndex + 1; j < data.Length; j++)
            {
                if (currentElement.CompareTo(data[j]) == 1)
                {
                    currentElement = data[j];
                    indexOfSmallestElement = j;
                }
            }

            return indexOfSmallestElement;
        }

        private int FindIndexOfFirstMinElement<T>(T[] data)
            where T : struct,
            IComparable,
            IComparable<T>,
            IConvertible,
            IEquatable<T>,
            IFormattable
        {
            T minElement = data.First();

            for (int i = 1; i < data.Length; i++)
            {
                if (minElement.CompareTo(data[i]) == 1)
                {
                    minElement = data[i];
                }
            }

            return Array.IndexOf(data, minElement);
        }
    }
}
