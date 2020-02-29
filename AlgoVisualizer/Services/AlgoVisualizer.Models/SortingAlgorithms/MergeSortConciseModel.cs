namespace AlgoVisualizer.Models.SortingAlgorithms
{
    public class MergeSortConciseModel
    {
        public MergeSortConciseModel(int value, int currentIndex)
        {
            this.Value = value;
            this.CurrentIndex = currentIndex;
        }

        public int Value { get; set; }

        public int CurrentIndex { get; set; }
    }
}
