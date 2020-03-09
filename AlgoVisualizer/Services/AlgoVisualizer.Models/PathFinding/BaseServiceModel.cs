namespace AlgoVisualizer.Models.PathFinding
{
    using System.ComponentModel.DataAnnotations;

    public class BaseServiceModel<T>
    {
        [Required]
        public T StartNode { get; set; }

        [Required]
        public T EndNode { get; set; }

        [Required]
        public T[,] Grid { get; set; }
    }
}