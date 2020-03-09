namespace AlgoVisualizer.Api.Controllers
{
    using AlgoVisualizer.Models.Maze;
    using AutoMapper;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;

    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class MazeController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IMazeService mazeService;

        public MazeController(IMazeService mazeService, IMapper mapper)
        {
            this.mazeService = mazeService;
            this.mapper = mapper;
        }

        [HttpPost]
        public IActionResult Wall([FromBody] MazeRequestModel model)
        {
            var serviceModel = this.mapper.Map<MazeServiceModel>(model);
            var result = this.mazeService.GenerateWallMaze(serviceModel);

            if (result == null)
            {
                return this.BadRequest();
            }

            return this.Ok(result);
        }

        [HttpPost]
        public IActionResult Weight([FromBody] MazeRequestModel model)
        {
            var serviceModel = this.mapper.Map<MazeServiceModel>(model);
            var result = this.mazeService.GenerateWeightMaze(serviceModel);

            if (result == null)
            {
                return this.BadRequest();
            }

            return this.Ok(result);
        }
    }
}