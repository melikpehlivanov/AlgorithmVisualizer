namespace AlgoVisualizer.Services.SortingAlgorithms.Implementations
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Common;
    using Models.SortingAlgorithms;

    public class BaseSortingService
    {
        public Result GenerateResult<T>(IEnumerable<T> data, IEnumerable<T> unsortedData, List<int[]> swappingIndexes)
            where T : struct,
            IComparable,
            IComparable<T>,
            IConvertible,
            IEquatable<T>,
            IFormattable
        {
            return data.SequenceEqual(unsortedData) ?
                new Result(NotificationMessages.SortingAlgorithms.DataAlreadySortedErrorMessage)
                : new Result(swappingIndexes);
        }

        public void Swap<T>(IList<T> data, int firstIndex, int secondIndex)
            where T : struct,
            IComparable,
            IComparable<T>,
            IConvertible,
            IEquatable<T>,
            IFormattable
        {
            var firstElement = data[firstIndex];
            data[firstIndex] = data[secondIndex];
            data[secondIndex] = firstElement;
        }
    }
}
