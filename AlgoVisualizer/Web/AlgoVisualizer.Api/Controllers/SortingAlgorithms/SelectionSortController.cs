namespace AlgoVisualizer.Api.Controllers.SortingAlgorithms
{
    using AutoMapper;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.SortingAlgorithms.Interfaces;

    public class SelectionSortController : BaseSortingAlgorithmsController
    {
        private readonly IMapper mapper;
        private readonly ISelectionSortService selectionSortService;

        public SelectionSortController(IMapper mapper, ISelectionSortService selectionSortService)
        {
            this.mapper = mapper;
            this.selectionSortService = selectionSortService;
        }

        [HttpPost]
        public IActionResult Post([FromBody] SortingAlgorithmsRequestModel data)
        {
            var serviceModel = this.selectionSortService.Sort(data.Array);
            if (serviceModel.ErrorMessage != null)
            {
                return this.BadRequest(new ErrorModel(serviceModel.ErrorMessage));
            }

            var result = this.mapper.Map<SortingAlgorithmsResponseModel>(serviceModel);

            return this.Ok(result);
        }
    }
}
