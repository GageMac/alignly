using Alignly.Api.DTOs;

namespace Alignly.Api.Services
{
    public class MockResumeService : IResumeService
    {
        private readonly ILogger<MockResumeService> _logger;

        public MockResumeService(ILogger<MockResumeService> logger)
        {
            _logger = logger;
        }

        public async Task<GenerateResumeResponse> GenerateOptimizedResumeAsync(GenerateResumeRequest request)
        {
            _logger.LogInformation("Using mock resume service - no OpenAI API key configured");
            
            // Simulate some processing time
            await Task.Delay(1000);

            var mockOptimizedResume = GenerateMockOptimizedResume(request.Resume, request.JobDescription);

            return new GenerateResumeResponse
            {
                RewrittenResume = mockOptimizedResume,
                Sections = new List<string> { "Professional Summary", "Experience", "Skills", "Education", "Certifications" },
                Suggestions = "MOCK RESPONSE: This is a sample optimized resume. To get real AI-powered optimization, please configure your OpenAI API key in appsettings.json or environment variables."
            };
        }

        private static string GenerateMockOptimizedResume(string originalResume, string jobDescription)
        {
            return $@"
[MOCK OPTIMIZED RESUME - OpenAI API Key Not Configured]

Professional Summary:
Experienced professional with skills aligned to the target role. This section has been optimized based on the job requirements.

Experience:
• Enhanced previous role descriptions with relevant keywords from job posting
• Quantified achievements with specific metrics and results
• Highlighted transferable skills and accomplishments
• Aligned experience with job requirements

Skills:
• Technical skills matching job requirements
• Soft skills relevant to the position
• Industry-specific competencies
• Leadership and collaboration abilities

Education:
• Relevant educational background
• Certifications and training
• Professional development activities

[Original Resume Length: {originalResume.Length} characters]
[Job Description Keywords: {ExtractKeywords(jobDescription)}]

Note: This is a mock response. Configure your OpenAI API key to get real AI-powered resume optimization.
";
        }

        private static string ExtractKeywords(string jobDescription)
        {
            if (string.IsNullOrWhiteSpace(jobDescription))
                return "No job description provided";

            var words = jobDescription.Split(' ', StringSplitOptions.RemoveEmptyEntries)
                .Where(w => w.Length > 4)
                .Take(5)
                .ToArray();

            return string.Join(", ", words);
        }
    }
} 