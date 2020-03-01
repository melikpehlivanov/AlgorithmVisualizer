namespace AlgoVisualizer.Api.Controllers.SortingAlgorithms
{
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.SortingAlgorithms.Interfaces;

    public class HeapSortController : BaseSortingAlgorithmsController
    {
        private readonly IHeapSortService heapSortService;

        public HeapSortController(IHeapSortService heapSortService)
        {
            this.heapSortService = heapSortService;
        }

        [HttpPost]
        public IActionResult Post([FromBody] SortingAlgorithmsRequestModel data)
        {
            var result = this.heapSortService.Sort(data.Array);

            if (result.ErrorMessage != null)
            {
                return this.BadRequest(new ErrorModel(result.ErrorMessage));
            }

            return this.Ok(result.SwapIndexes);
        }
    }
}
