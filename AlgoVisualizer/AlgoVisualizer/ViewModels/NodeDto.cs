namespace AlgoVisualizer.ViewModels
{
    namespace AlgoVisualizer.Services.Models
    {
        public class NodeDto
        {
            public int Row { get; set; }

            public int Col { get; set; }

            public bool IsStart { get; set; }

            public bool IsEnd { get; set; }

            public bool IsWeight { get; set; }
        }
    }
}