namespace AlgoVisualizer.Services.SortingAlgorithms.Interfaces
{
    using System;
    using Models.SortingAlgorithms;

    public interface IMergeSortService
    {
        Result Sort<T>(T[] array)
            where T : struct,
            IComparable,
            IComparable<T>,
            IConvertible,
            IEquatable<T>,
            IFormattable;
    }
}
