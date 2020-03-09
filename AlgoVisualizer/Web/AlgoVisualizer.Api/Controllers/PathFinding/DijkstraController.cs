namespace AlgoVisualizer.Api.Controllers.PathFinding
{
    using AlgoVisualizer.Models.PathFinding.Dijkstra;
    using AutoMapper;
    using Common;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.PathFindingAlgorithms.Interfaces;

    public class DijkstraController : BasePathFindingController
    {
        private readonly IDijkstraService dijkstraService;
        private readonly IMapper mapper;

        public DijkstraController(IMapper mapper, IDijkstraService dijkstraService)
        {
            this.mapper = mapper;
            this.dijkstraService = dijkstraService;
        }

        [HttpPost]
        public IActionResult Post(PathFindingAlgorithmsRequestModel data)
        {
            var serviceModel = this.mapper.Map<DijkstraServiceModel>(data);
            var result = this.dijkstraService.FindPath(serviceModel);
            if (result?.AllNodesInShortestPathOrder == null)
            {
                return this.BadRequest(new ErrorModel(NotificationMessages.PathFindingAlgorithms.PathNotFound));
            }

            return this.Ok(result);
        }
    }
}