namespace AlgoVisualizer.Api.Models
{
    using System.Collections.Generic;

    public class ErrorModel
    {
        public bool IsSuccess => false;

        public List<string> Messages { get; }

        public ErrorModel(List<string> messages)
        {
            this.Messages = messages ?? new List<string>();
        }

        public ErrorModel(string message)
        {
            this.Messages = new List<string>();

            if (!string.IsNullOrWhiteSpace(message))
            {
                this.Messages.Add(message);
            }
        }
    }
}
