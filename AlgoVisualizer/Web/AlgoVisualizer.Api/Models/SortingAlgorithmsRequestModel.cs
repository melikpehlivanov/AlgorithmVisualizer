namespace AlgoVisualizer.Api.Models
{
    using System.ComponentModel.DataAnnotations;

    public class SortingAlgorithmsRequestModel
    {
        [Required]
        public int[] Array { get; set; }
    }
}