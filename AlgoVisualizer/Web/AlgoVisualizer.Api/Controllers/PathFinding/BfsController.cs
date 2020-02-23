namespace AlgoVisualizer.Api.Controllers.PathFinding
{
    using AlgoVisualizer.Models.Bfs;
    using AutoMapper;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.PathFindingAlgorithms.Interfaces;

    public class BfsController : BasePathFindingController
    {
        private readonly IMapper mapper;
        private readonly IBfsService bfsService;

        public BfsController(IMapper mapper, IBfsService bfsService)
        {
            this.mapper = mapper;
            this.bfsService = bfsService;
        }

        [HttpPost]
        public IActionResult Post(PathFindingAlgorithmsRequestModel data)
        {
            var serviceModel = this.mapper.Map<BfsServiceModel>(data);
            var result = this.bfsService.FindPath(serviceModel);
            if (result?.AllNodesInShortestPathOrder == null)
            {
                return this.BadRequest(new ErrorModel(WebConstants.PathNotFound));
            }

            return this.Ok(result);
        }
    }
}
