namespace AlgoVisualizer.Services.SortingAlgorithms.Implementations
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Common;
    using Interfaces;
    using Models.SortingAlgorithms;

    public class BubbleSortService : BaseSortingService, IBubbleSortService
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

            this.BubbleSort(data);

            return this.GenerateResult(data, unsortedData, this.swappingIndexes);
        }

        private void BubbleSort<T>(IList<T> data)
            where T : struct,
            IComparable,
            IComparable<T>,
            IConvertible,
            IEquatable<T>,
            IFormattable
        {
            for (var i = 1; i <= data.Count - 1; i++)
            {
                var isSortingMade = false;
                for (var j = 0; j < data.Count - 1; j++)
                {
                    var firstElementIndex = j;
                    var adjacentElementIndex = j + 1;
                    if (data[firstElementIndex].CompareTo(data[adjacentElementIndex]) > 0)
                    {
                        this.Swap(data, firstElementIndex, adjacentElementIndex);
                        this.swappingIndexes.Add(new[] { firstElementIndex, adjacentElementIndex });

                        isSortingMade = true;
                    }
                }

                if (!isSortingMade)
                {
                    break;
                }
            }
        }
    }
}