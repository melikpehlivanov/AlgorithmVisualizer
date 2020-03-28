namespace AlgoVisualizer.Services.Tests
{
    using System;
    using System.Collections.Generic;

    public abstract class BaseTest
    {
        private readonly Random random = new Random();

        protected int[] GenerateSortedArray(int count)
        {
            var data = new int[count];

            for (var i = 0; i < count; i++)
            {
                data[i] = i;
            }

            return data;
        }

        protected int[] GenerateRandomArray(int count)
        {
            var data = new int[count];

            for (var i = 0; i < count; i++)
            {
                data[i] = this.random.Next(1, 1500);
            }

            return data;
        }

        protected void Swap<T>(IList<T> data, int firstIndex, int secondIndex)
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

        protected void SortArrayWithGivenIndexes(IEnumerable<int[]> swapIndexes, IList<int> untouchedData)
        {
            foreach (var swappingIndexes in swapIndexes)
            {
                var firstIndex = swappingIndexes[0];
                var secondIndex = swappingIndexes[1];
                this.Swap(untouchedData, firstIndex, secondIndex);
            }
        }
    }
}
