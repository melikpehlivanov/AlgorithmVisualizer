namespace AlgoVisualizer.Common.DataStructures
{
    using System;
    using System.Collections.Generic;

    public class MinHeap<T>
    {
        private readonly IComparer<T> comparer;
        private readonly List<T> list = new List<T> { default };

        public MinHeap() 
            : this(default(IComparer<T>))
        {
        }

        public MinHeap(IComparer<T> comparer)
        {
            this.comparer = comparer ?? Comparer<T>.Default;
        }

        public MinHeap(Comparison<T> comparison) 
            : this(Comparer<T>.Create(comparison))
        {
        }

        public int Count 
            => this.list.Count - 1;

        public void Add(T element)
        {
            this.list.Add(element);
            this.ShiftUp(this.list.Count - 1);
        }

        public T Pop()
        {
            T result = this.list[1];
            this.list[1] = this.list[^1];
            this.list.RemoveAt(this.list.Count - 1);
            this.ShiftDown(1);
            return result;
        }

        private static int Parent(int i) => i / 2;
        private static int Left(int i) => i * 2;
        private static int Right(int i) => i * 2 + 1;

        private void ShiftUp(int i)
        {
            while (i > 1)
            {
                int parent = Parent(i);
                if (this.comparer.Compare(this.list[i], this.list[parent]) > 0)
                {
                    return;
                }

                (this.list[parent], this.list[i]) = (this.list[i], this.list[parent]);
                i = parent;
            }
        }

        private void ShiftDown(int i)
        {
            for (int left = Left(i); left < this.list.Count; left = Left(i))
            {
                int smallest = this.comparer.Compare(this.list[left], this.list[i]) <= 0 ? left : i;
                int right = Right(i);
                if (right < this.list.Count && this.comparer.Compare(this.list[right], this.list[smallest]) <= 0)
                {
                    smallest = right;
                }

                if (smallest == i)
                {
                    return;
                }

                (this.list[i], this.list[smallest]) = (this.list[smallest], this.list[i]);
                i = smallest;
            }
        }
    }
}