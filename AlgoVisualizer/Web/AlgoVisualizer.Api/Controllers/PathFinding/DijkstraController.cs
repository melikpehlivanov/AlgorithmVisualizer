namespace AlgoVisualizer.Api.Controllers.PathFinding
{
    using AlgoVisualizer.Models.PathFinding.Dijkstra;
    using AutoMapper;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.PathFindingAlgorithms.Interfaces;

    public class DijkstraController : BasePathFindingController
    {
        private readonly IMapper mapper;
        private readonly IDijkstraService dijkstraService;

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
                return this.BadRequest(new ErrorModel(WebConstants.PathNotFound));
            }

            return this.Ok(result);
        }
    }
}
