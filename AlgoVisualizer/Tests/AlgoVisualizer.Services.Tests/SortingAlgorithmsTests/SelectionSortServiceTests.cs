namespace AlgoVisualizer.Services.Tests.SortingAlgorithmsTests
{
    using System;
    using System.Collections.Generic;
    using Common;
    using FluentAssertions;
    using Models.SortingAlgorithms;
    using SortingAlgorithms.Implementations;
    using SortingAlgorithms.Interfaces;
    using Xunit;

    public class SelectionSortServiceTests : BaseTest
    {
        private readonly ISelectionSortService selectionSortService;

        public SelectionSortServiceTests()
        {
            this.selectionSortService = new SelectionSortService();
        }

        [Fact]
        public void Sort_With_AlreadySortedData_Should_Return_DataAlreadySortedErrorMessage()
        {
            // Arrange
            const int arrayLength = 10000;
            var sortedData = this.GenerateSortedArray(arrayLength);

            // Act
            var result = this.selectionSortService.Sort(sortedData);

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
            var result = this.selectionSortService.Sort(Array.Empty<int>());

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
            const int arrayLength = 1000;
            var data = this.GenerateRandomArray(arrayLength);

            // Act
            var result = this.selectionSortService.Sort(data);

            // Assert
            result
                .Should()
                .Match(x => x.As<Result>().ErrorMessage == null);
        }

        [Fact]
        public void Sort_With_ValidInput_Should_Return_Correct_SwapIndexes()
        {
            // Arrange
            const int arrayLength = 10000;
            var data = this.GenerateRandomArray(arrayLength);
            var unmodifiedData = new List<int>(data);

            // Act
            var result = this.selectionSortService.Sort(data);

            // Sort the array with the given indexes
            this.SortArrayWithGivenIndexes(result.SwapIndexes, unmodifiedData);

            // Assert
            unmodifiedData
                .Should()
                .BeInAscendingOrder();
        }

        [Fact]
        public void Sort_With_ValidInput_Should_Return_Correct_TotalSwaps()
        {
            // Arrange
            const int expectedTotalSwaps = 3;

            // We should swap
            // 1. Indexes 0 and 1
            // 2. Indexes 2 and 5
            // 3. Indexes 4 and 5
            var data = new[] { 40, 10, 800, 400, 900, 100 };

            // Act
            var result = this.selectionSortService.Sort(data)?.TotalSwaps;

            // Assert
            result
                .Should()
                .Be(expectedTotalSwaps);
        }
    }
}
