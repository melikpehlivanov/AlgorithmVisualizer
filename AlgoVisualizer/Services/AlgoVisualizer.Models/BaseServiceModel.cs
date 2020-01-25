namespace AlgoVisualizer.Models
{
    using System.ComponentModel.DataAnnotations;
    using AStar;

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
