namespace AlgoVisualizer.Api.Models
{
    using System.Collections.Generic;
    using AlgoVisualizer.Models.SortingAlgorithms;
    using Common.AutoMapping.Interfaces;

    public class SortingAlgorithmsResponseModel : IMapWith<Result>
    {
        public List<int[]> SwapIndexes { get; set; }

        public int TotalSwaps => this.SwapIndexes.Count;
    }
}