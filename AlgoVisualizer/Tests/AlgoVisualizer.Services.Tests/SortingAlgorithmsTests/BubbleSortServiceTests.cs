namespace AlgoVisualizer.Services.Tests.SortingAlgorithmsTests
{
    using System.Collections.Generic;
    using Common;
    using FluentAssertions;
    using Models.SortingAlgorithms;
    using SortingAlgorithms.Implementations;
    using SortingAlgorithms.Interfaces;
    using Xunit;

    public class BubbleSortServiceTests : BaseTest
    {
        private readonly IBubbleSortService bubbleSortService;

        public BubbleSortServiceTests()
        {
            this.bubbleSortService = new BubbleSortService();
        }

        [Fact]
        public void Sort_With_ValidInput_Should_Not_Return_ErrorMessage()
        {
            // Arrange
            const int arrayLength = 50;
            var data = this.GenerateRandomArray(arrayLength);

            // Act
            var result = this.bubbleSortService.Sort(data);

            // Assert
            result
                .Should()
                .Match(x => x.As<Result>().ErrorMessage == null);
        }

        [Fact]
        public void Sort_With_AlreadySortedData_Should_Return_DataAlreadySortedErrorMessage()
        {
            // Arrange
            const int arrayLength = 50;
            var sortedData = this.GenerateSortedArray(arrayLength);

            // Act
            var result = this.bubbleSortService.Sort(sortedData);

            // Assert
            result
                .Should()
                .Match(x => x.As<Result>().ErrorMessage != null)
                .And
                .Match(x => x.As<Result>().ErrorMessage == NotificationMessages.SortingAlgorithms.DataAlreadySortedErrorMessage);
        }

        [Fact]
        public void Sort_With_InvalidInput_Should_Return_EmptyErrorMessage()
        {
            // Act
            var result = this.bubbleSortService.Sort(new int[0]);

            // Assert
            result
                .Should()
                .Match(x => x.As<Result>().ErrorMessage != null)
                .And
                .Match(x => x.As<Result>().ErrorMessage == NotificationMessages.SortingAlgorithms.EmptyArrayErrorMessage);
        }
    }
}
