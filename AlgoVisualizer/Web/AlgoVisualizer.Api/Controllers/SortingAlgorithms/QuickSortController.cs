namespace AlgoVisualizer.Api.Controllers.SortingAlgorithms
{
    using AutoMapper;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.SortingAlgorithms.Interfaces;

    public class QuickSortController : BaseSortingAlgorithmsController
    {
        private readonly IMapper mapper;
        private readonly IQuickSortService quickSortService;

        public QuickSortController(IMapper mapper, IQuickSortService quickSortService)
        {
            this.mapper = mapper;
            this.quickSortService = quickSortService;
        }

        [HttpPost]
        public IActionResult Post([FromBody] SortingAlgorithmsRequestModel data)
        {
            var serviceModel = this.quickSortService.Sort(data.Array);
            if (serviceModel.ErrorMessage != null)
            {
                return this.BadRequest(new ErrorModel(serviceModel.ErrorMessage));
            }

            var result = this.mapper.Map<SortingAlgorithmsResponseModel>(serviceModel);

            return this.Ok(result);
        }
    }
}
