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
            int indexOfMinElement = FindIndexOfMinElement(data);

            if (indexOfMinElement != zeroIndex)
            {
                swappingIndexes.Add(new int[] { zeroIndex, indexOfMinElement });
                this.Swap(data, zeroIndex, indexOfMinElement);
            }

            for (int i = 1; i < data.Length - 1; i++)
            {
                T currentMinElement = data[i];
                T newMinElement = data[i];
                int index = 0;

                for (int j = i + 1; j < data.Length; j++)
                {
                    if (newMinElement.CompareTo(data[j]) == 1)
                    {
                        newMinElement = data[j];
                        index = j;
                    }
                }

                if (newMinElement.CompareTo(currentMinElement) == 0)
                {
                    continue;
                }

                swappingIndexes.Add(new int[] { i, index });
                this.Swap(data, i, index);
            }
        }

        private int FindIndexOfMinElement<T>(T[] data)
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
