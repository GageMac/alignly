using Alignly.Api.DTOs;
using OpenAI.Chat;

namespace Alignly.Api.Services
{
    public class ResumeService : IResumeService
    {
        private readonly ChatClient _chatClient;
        private readonly ILogger<ResumeService> _logger;

        public ResumeService(ChatClient chatClient, ILogger<ResumeService> logger)
        {
            _chatClient = chatClient;
            _logger = logger;
        }

        public async Task<GenerateResumeResponse> GenerateOptimizedResumeAsync(GenerateResumeRequest request)
        {
            try
            {
                var prompt = BuildPrompt(request.Resume, request.JobDescription);
                
                var completion = await _chatClient.CompleteChatAsync(
                    new UserChatMessage(prompt)
                );

                var rewrittenContent = completion.Value.Content[0].Text;
                
                return new GenerateResumeResponse
                {
                    RewrittenResume = rewrittenContent,
                    Sections = ExtractSections(rewrittenContent),
                    Suggestions = "Resume optimized for the provided job description with enhanced keywords and formatting."
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating optimized resume. Exception type: {ExceptionType}, Message: {Message}", 
                    ex.GetType().Name, ex.Message);
                
                // More specific error messages
                if (ex.Message.Contains("401") || ex.Message.Contains("Unauthorized"))
                {
                    throw new ApplicationException("Invalid OpenAI API key. Please check your configuration.", ex);
                }
                else if (ex.Message.Contains("429") || ex.Message.Contains("quota"))
                {
                    throw new ApplicationException("OpenAI API quota exceeded. Please check your usage limits.", ex);
                }
                else if (ex.Message.Contains("network") || ex.Message.Contains("timeout"))
                {
                    throw new ApplicationException("Network error connecting to OpenAI API. Please try again.", ex);
                }
                
                throw new ApplicationException($"Failed to generate optimized resume: {ex.Message}", ex);
            }
        }

        private static string BuildPrompt(string resume, string jobDescription)
        {
            return $@"
You are an expert resume writer and career coach. Please rewrite the following resume to better align with the job description provided. 

Job Description:
{jobDescription}

Current Resume:
{resume}

Instructions:
1. Rewrite the resume content to better match the job requirements
2. Include relevant keywords from the job description
3. Enhance the professional summary and experience descriptions
4. Maintain the original structure but improve the content
5. Focus on quantifiable achievements where possible
6. Ensure the tone is professional and ATS-friendly

Please provide only the rewritten resume content without any additional commentary.";
        }

        private static List<string> ExtractSections(string rewrittenResume)
        {
            var sections = new List<string>();
            var lines = rewrittenResume.Split('\n', StringSplitOptions.RemoveEmptyEntries);
            
            foreach (var line in lines)
            {
                var trimmedLine = line.Trim();
                if (trimmedLine.EndsWith(':') && trimmedLine.Length > 3 && !trimmedLine.Contains(' '))
                {
                    sections.Add(trimmedLine.TrimEnd(':'));
                }
            }
            
            return sections.Count > 0 ? sections : new List<string> { "Professional Summary", "Experience", "Skills", "Education" };
        }
    }
} 