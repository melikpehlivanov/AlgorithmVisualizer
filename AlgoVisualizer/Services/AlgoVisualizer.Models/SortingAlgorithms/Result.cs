namespace AlgoVisualizer.Models.SortingAlgorithms
{
    using System.Collections.Generic;

    public class Result<T>
    {
        public Result(List<T[]> usedSwapsToSortArray)
        {
            this.SwapIndexes = usedSwapsToSortArray;
        }

        public Result(string errorMessage)
        {
            this.ErrorMessage = errorMessage;
        }

        public Result(List<T[]> usedSwapsToSortArray, string errorMessage = null)
        {
            this.ErrorMessage = errorMessage;
            this.SwapIndexes = usedSwapsToSortArray;
        }

        public string ErrorMessage { get; set; }

        public List<T[]> SwapIndexes { get; set; } 
    }
}
