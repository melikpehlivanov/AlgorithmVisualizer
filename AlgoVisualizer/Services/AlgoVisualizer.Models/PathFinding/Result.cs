namespace AlgoVisualizer.Models.PathFinding
{
    using System.Collections.Generic;
    using System.Linq;

    public class Result
    {
        public Result(IEnumerable<INode> allVisitedNodesInOrder, IEnumerable<INode> allNodesInShortestPathOrder = null)
        {
            this.AllVisitedNodesInOrder = allVisitedNodesInOrder;
            this.AllNodesInShortestPathOrder = allNodesInShortestPathOrder;
        }

        public IEnumerable<INode> AllVisitedNodesInOrder { get; }

        public IEnumerable<INode> AllNodesInShortestPathOrder { get; }

        public int TotalNodesExplored => this.AllVisitedNodesInOrder.Count();
    }
}
