using System;
using Microsoft.AspNetCore.Mvc;
using Moobaloo.Model;

namespace Moobaloo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SurveyController : ControllerBase
    {
        [HttpPost("[action]")]
        public IActionResult Submit(Survey survey)
        {
            if(ModelState.IsValid)
            {
                Console.WriteLine(survey);

                return new JsonResult(new {
                    message = "Thank you for your feedback."
                });
            }
            
            return BadRequest(ModelState);
        }
    }
}
