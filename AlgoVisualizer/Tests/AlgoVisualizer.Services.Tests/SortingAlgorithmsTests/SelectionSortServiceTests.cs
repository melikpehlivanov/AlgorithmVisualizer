namespace AlgoVisualizer.Services.Tests.SortingAlgorithmsTests
{
    using System;
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
    }
}
