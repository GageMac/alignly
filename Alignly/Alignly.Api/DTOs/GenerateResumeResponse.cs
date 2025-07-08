namespace Alignly.Api.DTOs
{
    public class GenerateResumeResponse
    {
        public string RewrittenResume { get; set; } = string.Empty;
        public List<string> Sections { get; set; } = new();
        public string Suggestions { get; set; } = string.Empty;
    }
} 