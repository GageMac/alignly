using Alignly.Api.DTOs;
using Alignly.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;

namespace Alignly.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResumeController : ControllerBase
    {
        private readonly IResumeService _resumeService;
        private readonly ILogger<ResumeController> _logger;
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public ResumeController(IResumeService resumeService, ILogger<ResumeController> logger, IConfiguration configuration, HttpClient httpClient)
        {
            _resumeService = resumeService;
            _logger = logger;
            _configuration = configuration;
            _httpClient = httpClient;
        }

        [HttpPost("generate-pdf")]
        public async Task<IActionResult> GeneratePdf([FromBody] GenerateResumeRequest request, [FromQuery] string template = "modern", [FromQuery] string colorScheme = "blue")
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
                _logger.LogInformation("Starting PDF generation for resume optimization");

                // Step 1: Generate structured resume via OpenAI optimization
                var structuredResponse = await _resumeService.GenerateStructuredResumeAsync(request);
                
                _logger.LogInformation("Structured resume generated successfully, calling PDF service");

                // Step 2: Call PDF service with optimized structured data
                var pdfServiceUrl = _configuration["PdfService:BaseUrl"] ?? "http://localhost:3001";
                var pdfRequest = new
                {
                    resume = structuredResponse.Resume,
                    template = template,
                    options = new
                    {
                        colorScheme = colorScheme
                    }
                };

                var jsonOptions = new JsonSerializerOptions
                {
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                    WriteIndented = true
                };

                var jsonContent = new StringContent(
                    System.Text.Json.JsonSerializer.Serialize(pdfRequest, jsonOptions),
                    Encoding.UTF8,
                    "application/json"
                );

                var pdfResponse = await _httpClient.PostAsync($"{pdfServiceUrl}/render", jsonContent);
                
                if (pdfResponse.IsSuccessStatusCode)
                {
                    var pdfBytes = await pdfResponse.Content.ReadAsByteArrayAsync();
                    var fileName = $"resume-{structuredResponse.Resume.Contact.Name.Replace(" ", "-").ToLower()}.pdf";
                    
                    _logger.LogInformation("PDF generated successfully: {FileName}, Size: {Size} bytes", fileName, pdfBytes.Length);
                    
                    return File(pdfBytes, "application/pdf", fileName);
                }
                else
                {
                    var errorContent = await pdfResponse.Content.ReadAsStringAsync();
                    _logger.LogError("PDF generation failed: {StatusCode} - {Error}", pdfResponse.StatusCode, errorContent);
                    return StatusCode(500, $"PDF generation failed: {pdfResponse.StatusCode}. Error: {errorContent}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error processing PDF generation request");
                return StatusCode(500, "An error occurred while processing your request: " + ex.Message);
            }
        }
    }
} 