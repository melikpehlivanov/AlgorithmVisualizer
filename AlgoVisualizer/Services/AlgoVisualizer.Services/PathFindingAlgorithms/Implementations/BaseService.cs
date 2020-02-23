namespace AlgoVisualizer.Services.PathFindingAlgorithms.Implementations
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using Models;
    using Models.PathFinding;

    public abstract class BaseService
    {
        protected bool IsEntityStateValid(object model)
        {
            var validationContext = new ValidationContext(model);
            var validationResults = new List<ValidationResult>();

            return Validator.TryValidateObject(model, validationContext, validationResults,
                true);
        }

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
