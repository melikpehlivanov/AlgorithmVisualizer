namespace AlgoVisualizer.Models.SortingAlgorithms
{
    using System.Collections.Generic;

    public class Result
    {
        public Result(List<int[]> usedSwapsToSortArray)
        {
            this.SwapIndexes = usedSwapsToSortArray;
        }

        public Result(string errorMessage)
        {
            this.ErrorMessage = errorMessage;
        }

        public Result(List<int[]> usedSwapsToSortArray, string errorMessage = null)
        {
            this.ErrorMessage = errorMessage;
            this.SwapIndexes = usedSwapsToSortArray;
        }

        public string ErrorMessage { get; set; }

        public List<int[]> SwapIndexes { get; set; }

        public int TotalSwaps => this.SwapIndexes.Count;
    }
}
