namespace AlgoVisualizer.Models.SortingAlgorithms
{
    public class MergeSortConciseModel<T>
    {
        public MergeSortConciseModel(T value, int currentIndex)
        {
            this.Value = value;
            this.CurrentIndex = currentIndex;
        }

        public T Value { get; set; }

        public int CurrentIndex { get; set; }
    }
}