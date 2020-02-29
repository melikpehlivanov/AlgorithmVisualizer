namespace AlgoVisualizer.Api.Controllers.SortingAlgorithms
{
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.SortingAlgorithms.Interfaces;

    public class MergeSortController : BaseSortingAlgorithmsController
    {
        private readonly IMergeSortService mergeSortService;

        public MergeSortController(IMergeSortService mergeSortService)
        {
            this.mergeSortService = mergeSortService;
        }

        [HttpPost]
        public IActionResult Post([FromBody] SortingAlgorithmsRequestModel data)
        {
            var result = this.mergeSortService.Sort(data.Array);
            if (result.ErrorMessage != null)
            {
                return this.BadRequest(new ErrorModel(result.ErrorMessage));
            }

            return this.Ok(result.SwapIndexes);
        }
    }
}
