namespace AlgoVisualizer.Api.Controllers.PathFinding
{
    using AlgoVisualizer.Models.PathFinding.AStar;
    using AutoMapper;
    using Common;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.PathFindingAlgorithms.Interfaces;

    public class AStarController : BasePathFindingController
    {
        private readonly IMapper mapper;
        private readonly IAStarService aStarService;

        public AStarController(IMapper mapper, IAStarService aStarService)
        {
            this.mapper = mapper;
            this.aStarService = aStarService;
        }

        [HttpPost]
        public IActionResult Post([FromBody] PathFindingAlgorithmsRequestModel data)
        {
            var serviceModel = this.mapper.Map<AStarServiceModel>(data);
            var result = this.aStarService.FindPath(serviceModel);
            if (result?.AllNodesInShortestPathOrder == null)
            {
                return this.BadRequest(new ErrorModel(NotificationMessages.PathFindingAlgorithms.PathNotFound));
            }

            return this.Ok(result);
        }
    }
}