namespace AlgoVisualizer.Services.SortingAlgorithms.Interfaces
{
    using System;
    using Models.SortingAlgorithms;

    public interface IQuickSortService
    {
        Result Sort<T>(T[] data)
            where T : struct,
            IComparable,
            IComparable<T>,
            IConvertible,
            IEquatable<T>,
            IFormattable;
    }
}