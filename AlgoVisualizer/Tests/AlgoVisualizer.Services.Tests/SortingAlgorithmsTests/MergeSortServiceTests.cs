namespace AlgoVisualizer.Services.Tests.SortingAlgorithmsTests
{
    using System.Collections.Generic;
    using Common;
    using FluentAssertions;
    using Models.SortingAlgorithms;
    using SortingAlgorithms.Implementations;
    using SortingAlgorithms.Interfaces;
    using Xunit;

    public class MergeSortServiceTests : BaseTest
    {
        private readonly IMergeSortService mergeSortService;

        public MergeSortServiceTests()
        {
            this.mergeSortService = new MergeSortService();
        }

        [Fact]
        public void Sort_With_AlreadySortedData_Should_Return_DataAlreadySortedErrorMessage()
        {
            // Arrange
            const int arrayLength = 49;
            var sortedData = this.GenerateSortedArray(arrayLength);

            // Act
            var result = this.mergeSortService.Sort(sortedData);

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
            var result = this.mergeSortService.Sort(new int[0]);

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
            var result = this.mergeSortService.Sort(data);

            // Assert
            result
                .Should()
                .Match(x => x.As<Result>().ErrorMessage == null);
        }

        [Fact]
        public void Sort_With_ValidInput_Should_Return_Correct_SwapIndexes()
        {
            // Arrange
            const int arrayLength = 10;
            var data = this.GenerateRandomArray(arrayLength);
            var untouchedData = new List<int>(data);

            // Act
            var result = this.mergeSortService.Sort(data);

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
            const int expectedTotalSwaps = 6;

            // We should swap
            // 1. Indexes 3 and 4
            // 2. Indexes 4 and 5
            // 3. Indexes 0 and 3
            // 4. Indexes 1 and 4
            // 5. Indexes 2 and 3
            // 6. Indexes 3 and 5
            var data = new[] { 20, 80, 100, 30, 9, 10 };

            // Act
            var result = this.mergeSortService.Sort(data)?.TotalSwaps;

            // Assert
            result
                .Should()
                .Be(expectedTotalSwaps);
        }

        [Fact]
        public void Sort_With_ValidInput_Should_Return_SortedData()
        {
            // Arrange
            const int arrayLength = 30;
            var data = this.GenerateRandomArray(arrayLength);

            // Act
            this.mergeSortService.Sort(data);

            // Assert
            data
                .Should()
                .BeInAscendingOrder();
        }
    }
}
