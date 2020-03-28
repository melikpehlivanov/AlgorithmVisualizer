namespace AlgoVisualizer.Services.Tests
{
    using System;

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
    }
}
