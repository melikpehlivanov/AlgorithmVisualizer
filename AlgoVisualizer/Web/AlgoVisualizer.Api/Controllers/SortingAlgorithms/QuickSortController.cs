namespace AlgoVisualizer.Api.Controllers.SortingAlgorithms
{
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.SortingAlgorithms.Interfaces;

    public class QuickSortController : BaseSortingAlgorithmsController
    {
        private readonly IQuickSortService quickSortService;

        public QuickSortController(IQuickSortService quickSortService)
        {
            this.quickSortService = quickSortService;
        }

        [HttpPost]
        public IActionResult Post([FromBody] SortingAlgorithmsRequestModel data)
        {
            var result = this.quickSortService.Sort(data.Array);
            if (result.ErrorMessage != null)
            {
                return this.BadRequest(new ErrorModel(result.ErrorMessage));
            }

            return this.Ok(result.SwapIndexes);
        }
    }
}
