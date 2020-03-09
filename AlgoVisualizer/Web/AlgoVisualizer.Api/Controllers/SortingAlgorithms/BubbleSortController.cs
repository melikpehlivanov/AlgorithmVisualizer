namespace AlgoVisualizer.Api.Controllers.SortingAlgorithms
{
    using AutoMapper;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.SortingAlgorithms.Interfaces;

    public class BubbleSortController : BaseSortingAlgorithmsController
    {
        private readonly IBubbleSortService bubbleSortService;
        private readonly IMapper mapper;

        public BubbleSortController(IMapper mapper, IBubbleSortService bubbleSortService)
        {
            this.mapper = mapper;
            this.bubbleSortService = bubbleSortService;
        }

        [HttpPost]
        public IActionResult Post([FromBody] SortingAlgorithmsRequestModel data)
        {
            var serviceModel = this.bubbleSortService.Sort(data.Array);

            if (serviceModel.ErrorMessage != null)
            {
                return this.BadRequest(new ErrorModel(serviceModel.ErrorMessage));
            }

            var result = this.mapper.Map<SortingAlgorithmsResponseModel>(serviceModel);

            return this.Ok(result);
        }
    }
}