namespace AlgoVisualizer.Api.Controllers
{
    using AlgoVisualizer.Models.AStar;
    using AutoMapper;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services.Interfaces;

    public class AStarController : BaseController
    {
        private const string PathNotFound = "There is no possible path!";

        private readonly IMapper mapper;
        private readonly IAStarService aStarService;

        public AStarController(IMapper mapper, IAStarService aStarService)
        {
            this.mapper = mapper;
            this.aStarService = aStarService;
        }

        [HttpPost]
        public IActionResult Post([FromBody] AStarRequestModel data)
        {
            var serviceModel = this.mapper.Map<AStarServiceModel>(data);
            var result = this.aStarService.FindPath(serviceModel);
            if (result?.AllNodesInShortestPathOrder == null)
            {
                return this.BadRequest(PathNotFound);
            }

            return this.Ok(result);
        }
    }
}