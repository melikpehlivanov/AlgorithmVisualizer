namespace AlgoVisualizer.Api.Controllers
{
    using AlgoVisualizer.Models.Dfs;
    using AutoMapper;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.Interfaces;

    public class DfsController : BaseController
    {
        private readonly IMapper mapper;
        private readonly IDfsService dfsService;

        public DfsController(IMapper mapper, IDfsService dfsService)
        {
            this.mapper = mapper;
            this.dfsService = dfsService;
        }

        [HttpPost]
        public IActionResult Post(PathFindingAlgorithmsRequestModel data)
        {
            var serviceModel = this.mapper.Map<DfsServiceModel>(data);
            var result = this.dfsService.FindPath(serviceModel);
            if (result?.AllNodesInShortestPathOrder == null)
            {
                return this.BadRequest(new ErrorModel(WebConstants.PathNotFound));
            }

            return this.Ok(result);
        }
    }
}
