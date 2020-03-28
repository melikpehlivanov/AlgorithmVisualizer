namespace AlgoVisualizer.Services.Tests.SortingAlgorithmsTests
{
    using System.Collections.Generic;
    using System.Linq;
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
            const int arrayLength = 50;
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
