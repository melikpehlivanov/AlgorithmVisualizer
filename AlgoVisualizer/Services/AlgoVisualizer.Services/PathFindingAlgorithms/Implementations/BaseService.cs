namespace AlgoVisualizer.Services.PathFindingAlgorithms.Implementations
{
    using System.Collections.Generic;
    using Models.PathFinding;

    public abstract class BaseService
    {
        private protected IEnumerable<INode> GetAllNodesInShortestPathOrder(INode node)
        {
            var result = new Stack<INode>();

            do
            {
                result.Push(node.PreviousNode);
                node = node.PreviousNode;
            } while (node.PreviousNode.PreviousNode != null);

            return result;
        }
    }
}