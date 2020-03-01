namespace AlgoVisualizer.Api.Controllers.SortingAlgorithms
{
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.SortingAlgorithms.Interfaces;

    public class BubbleSortController : BaseSortingAlgorithmsController
    {
        private readonly IBubbleSortService bubbleSortService;

        public BubbleSortController(IBubbleSortService bubbleSortService)
        {
            this.bubbleSortService = bubbleSortService;
        }

        [HttpPost]
        public IActionResult Post([FromBody] SortingAlgorithmsRequestModel data)
        {
            var result = this.bubbleSortService.Sort(data.Array);

            if (result.ErrorMessage != null)
            {
                return this.BadRequest(new ErrorModel(result.ErrorMessage));
            }

            return this.Ok(result.SwapIndexes);
        }
    }
}
