using Alignly.Api.DTOs;
using Alignly.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Alignly.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResumeController : ControllerBase
    {
        private readonly IResumeService _resumeService;
        private readonly ILogger<ResumeController> _logger;

        public ResumeController(IResumeService resumeService, ILogger<ResumeController> logger)
        {
            _resumeService = resumeService;
            _logger = logger;
        }

        [HttpPost("generate")]
        public async Task<ActionResult<GenerateResumeResponse>> GenerateOptimizedResume([FromBody] GenerateResumeRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Resume))
            {
                return BadRequest("Resume content is required.");
            }

            if (string.IsNullOrWhiteSpace(request.JobDescription))
            {
                return BadRequest("Job description is required.");
            }

            try
            {
                var response = await _resumeService.GenerateOptimizedResumeAsync(request);
                return Ok(response);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing resume generation request");
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
    }
} 