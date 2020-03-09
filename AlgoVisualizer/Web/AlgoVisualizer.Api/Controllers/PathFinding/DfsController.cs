namespace AlgoVisualizer.Api.Controllers.PathFinding
{
    using AlgoVisualizer.Models.PathFinding.Dfs;
    using AutoMapper;
    using Common;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.PathFindingAlgorithms.Interfaces;

    public class DfsController : BasePathFindingController
    {
        private readonly IDfsService dfsService;
        private readonly IMapper mapper;

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
                return this.BadRequest(new ErrorModel(NotificationMessages.PathFindingAlgorithms.PathNotFound));
            }

            return this.Ok(result);
        }
    }
}