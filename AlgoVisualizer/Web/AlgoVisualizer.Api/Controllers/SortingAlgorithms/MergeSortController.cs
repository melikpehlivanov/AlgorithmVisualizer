namespace AlgoVisualizer.Api.Controllers.SortingAlgorithms
{
    using AutoMapper;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.SortingAlgorithms.Interfaces;

    public class MergeSortController : BaseSortingAlgorithmsController
    {
        private readonly IMapper mapper;
        private readonly IMergeSortService mergeSortService;

        public MergeSortController(IMapper mapper, IMergeSortService mergeSortService)
        {
            this.mapper = mapper;
            this.mergeSortService = mergeSortService;
        }

        [HttpPost]
        public IActionResult Post([FromBody] SortingAlgorithmsRequestModel data)
        {
            var serviceModel = this.mergeSortService.Sort(data.Array);
            if (serviceModel.ErrorMessage != null)
            {
                return this.BadRequest(new ErrorModel(serviceModel.ErrorMessage));
            }

            var result = this.mapper.Map<SortingAlgorithmsResponseModel>(serviceModel);

            return this.Ok(result);
        }
    }
}