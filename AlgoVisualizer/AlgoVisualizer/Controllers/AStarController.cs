namespace AlgoVisualizer.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using ViewModels;

    public class AStarController : BaseController
    {
        [HttpGet]
        public IActionResult Get()
        {
            return this.Ok();
        }

        [HttpPost]
        public IActionResult Post(AStarRequestModel data)
        {
            return this.Ok();
        }
    }
}
