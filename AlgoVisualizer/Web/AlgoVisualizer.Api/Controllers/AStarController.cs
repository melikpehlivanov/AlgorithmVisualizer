namespace AlgoVisualizer.Api.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Models;

    public class AStarController : BaseController
    {
        [HttpPost]
        public IActionResult Post([FromBody] AStarRequestModel data)
        {
            return this.Ok("passed!");
        }
    }
}