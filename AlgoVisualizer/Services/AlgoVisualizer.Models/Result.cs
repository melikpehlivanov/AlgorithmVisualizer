namespace AlgoVisualizer.Services.Models
{
    using System.Collections.Generic;

    public class Result
    {
        public Result(IEnumerable<INode> allVisitedNodesInOrder, IEnumerable<INode> allNodesInShortestPathOrder = null)
        {
            this.AllVisitedNodesInOrder = allVisitedNodesInOrder;
            this.AllNodesInShortestPathOrder = allNodesInShortestPathOrder;
        }

        public IEnumerable<INode> AllVisitedNodesInOrder { get; }

        public IEnumerable<INode> AllNodesInShortestPathOrder { get; }
    }
}
