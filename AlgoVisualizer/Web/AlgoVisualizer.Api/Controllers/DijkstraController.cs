namespace AlgoVisualizer.Api.Controllers
{
    using AlgoVisualizer.Models.AStar;
    using AlgoVisualizer.Models.Dijkstra;
    using AutoMapper;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.Interfaces;

    public class DijkstraController : BaseController
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
