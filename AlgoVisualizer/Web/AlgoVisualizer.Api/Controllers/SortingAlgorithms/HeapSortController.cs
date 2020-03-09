namespace AlgoVisualizer.Api.Controllers.SortingAlgorithms
{
    using AutoMapper;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.SortingAlgorithms.Interfaces;

    public class HeapSortController : BaseSortingAlgorithmsController
    {
        private readonly IHeapSortService heapSortService;
        private readonly IMapper mapper;

        public HeapSortController(IMapper mapper, IHeapSortService heapSortService)
        {
            this.mapper = mapper;
            this.heapSortService = heapSortService;
        }

        [HttpPost]
        public IActionResult Post([FromBody] SortingAlgorithmsRequestModel data)
        {
            var serviceModel = this.heapSortService.Sort(data.Array);

            if (serviceModel.ErrorMessage != null)
            {
                return this.BadRequest(new ErrorModel(serviceModel.ErrorMessage));
            }

            var result = this.mapper.Map<SortingAlgorithmsResponseModel>(serviceModel);

            return this.Ok(result);
        }
    }
}