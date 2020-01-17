namespace AlgoVisualizer.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    [Microsoft.AspNetCore.Components.Route("[controller]")]
    public class AStarController : BaseController
    {
        [HttpPost]
        public IActionResult Get()
        {
            return this.Ok("test value");
        }
    }
}
