namespace AlgoVisualizer.Services.Tests.SortingAlgorithmsTests
{
    using System.Collections.Generic;
    using Common;
    using FluentAssertions;
    using Models.SortingAlgorithms;
    using SortingAlgorithms.Implementations;
    using SortingAlgorithms.Interfaces;
    using Xunit;

    public class HeapSortServiceTests : BaseTest
    {
        private readonly IHeapSortService heapSortService;

        public HeapSortServiceTests()
        {
            this.heapSortService = new HeapSortService();
        }

        [Fact]
        public void Sort_With_AlreadySortedData_Should_Return_DataAlreadySortedErrorMessage()
        {
            // Arrange
            const int arrayLength = 49;
            var sortedData = this.GenerateSortedArray(arrayLength);

            // Act
            var result = this.heapSortService.Sort(sortedData);

            // Assert
            result
                .Should()
                .Match(x => x.As<Result>().ErrorMessage != null)
                .And
                .Match(x => x.As<Result>().ErrorMessage == NotificationMessages.SortingAlgorithms.DataAlreadySortedErrorMessage);
        }

        [Fact]
        public void Sort_With_NoElements_Should_Return_EmptyArrayErrorMessage()
        {
            // Act
            var result = this.heapSortService.Sort(new int[0]);

            // Assert
            result
                .Should()
                .Match(x => x.As<Result>().ErrorMessage != null)
                .And
                .Match(x => x.As<Result>().ErrorMessage == NotificationMessages.SortingAlgorithms.EmptyArrayErrorMessage);
        }

        [Fact]
        public void Sort_With_ValidInput_Should_Not_Return_ErrorMessage()
        {
            // Arrange
            const int arrayLength = 50;
            var data = this.GenerateRandomArray(arrayLength);

            // Act
            var result = this.heapSortService.Sort(data);

            // Assert
            result
                .Should()
                .Match(x => x.As<Result>().ErrorMessage == null);
        }

        [Fact]
        public void Sort_With_ValidInput_Should_Return_Correct_SwapIndexes()
        {
            // Arrange
            const int arrayLength = 4;
            var data = this.GenerateRandomArray(arrayLength);
            var untouchedData = new List<int>(data);

            // Act
            var result = this.heapSortService.Sort(data);

            // Sort the array with the given indexes
            this.SortArrayWithGivenIndexes(result.SwapIndexes, untouchedData);

            // Assert
            untouchedData
                .Should()
                .BeInAscendingOrder();
        }

        [Fact]
        public void Sort_With_ValidInput_Should_Return_Correct_TotalSwaps()
        {
            // Arrange
            const int expectedTotalSwaps = 10;

            // We should swap
            // 1. Indexes 1 and 4
            // 2. Indexes 0 and 1
            // 3. Indexes 0 and 4
            // 4. Indexes 0 and 1
            // 6. Indexes 1 and 3
            // 7. Indexes 0 and 3
            // 8. Indexes 0 and 1
            // 9. Indexes 0 and 2
            // 10. Indexes 0 and 1
            // 11. Indexes 0 and 0
            var data = new[] { 50, 10, 30, 40, 90 }; 

            // Act
            var result = this.heapSortService.Sort(data);

            // Assert
            result
                .TotalSwaps
                .Should()
                .Be(expectedTotalSwaps);
        }

        [Fact]
        public void Sort_With_ValidInput_Should_Return_SortedData()
        {
            // Arrange
            const int arrayLength = 40;
            var data = this.GenerateRandomArray(arrayLength);

            // Act
            this.heapSortService.Sort(data);

            // Assert
            data
                .Should()
                .BeInAscendingOrder();
        }

        private void SortArrayWithGivenIndexes(IEnumerable<int[]> swapIndexes, IList<int> untouchedData)
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
