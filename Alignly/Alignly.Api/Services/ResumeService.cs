using Alignly.Api.DTOs;
using OpenAI.Chat;
using System.Text.Json;

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
You are a professional resume optimization specialist with 15+ years of experience in recruitment and ATS systems. Your task is to enhance a resume for maximum impact while maintaining authenticity.

**JOB DESCRIPTION:**
{jobDescription}

**CURRENT RESUME:**
{resume}

**OPTIMIZATION INSTRUCTIONS:**

**STRUCTURE & FORMATTING:**
- Preserve the original resume's overall structure, sections, and personal tone
- Maintain professional formatting with consistent spacing and alignment
- Keep the same writing style but enhance clarity and impact
- Do not add fictional experience or inflate responsibilities

**KEYWORD OPTIMIZATION:**
- Analyze the job description and naturally incorporate relevant keywords into existing experience
- Match technical skills, tools, and methodologies mentioned in the job posting
- Use exact keyword phrases when they authentically fit the candidate's background
- Replace generic terms with industry-specific language from the job description

**CONTENT ENHANCEMENT:**
- Transform existing bullet points to show stronger alignment with job requirements
- Add quantifiable metrics where the original experience suggests measurable impact
- Use action verbs that match the job description's language style
- Highlight transferable skills that directly address job responsibilities

**ATS OPTIMIZATION:**
- Use standard section headers (Experience, Skills, Education, etc.)
- Avoid overusing buzzwords like 'leveraged', 'spearheaded', 'orchestrated', 'delved', 'realm'
- Write in clear, professional language that sounds human, not AI-generated
- Ensure keyword density feels natural, not forced

**ACHIEVEMENT FOCUS:**
- Enhance existing accomplishments with stronger, more specific language
- Connect past achievements to the target role's requirements
- Show progression and growth in responsibilities
- Emphasize results and impact using metrics when supported by context

**QUALITY STANDARDS:**
- Every statement must be truthful and defensible in an interview
- Maintain consistency in verb tenses and formatting
- Ensure the candidate could confidently discuss every enhanced point
- Keep the authentic voice and personality of the original resume

**OUTPUT FORMAT:**
Provide only the enhanced resume content. No explanatory text, commentary, or suggestions.";
        }

        public async Task<StructuredResumeResponse> GenerateStructuredResumeAsync(GenerateResumeRequest request)
        {
            try
            {
                var prompt = BuildStructuredPrompt(request.Resume, request.JobDescription);
                
                var completion = await _chatClient.CompleteChatAsync(
                    new UserChatMessage(prompt)
                );

                var jsonResponse = completion.Value.Content[0].Text;
                
                // Parse the JSON response
                var structuredResume = JsonSerializer.Deserialize<StructuredResume>(jsonResponse, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return new StructuredResumeResponse
                {
                    Resume = structuredResume ?? new StructuredResume(),
                    Suggestions = "Resume optimized for the provided job description with enhanced keywords and ATS-friendly formatting."
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating structured resume. Exception type: {ExceptionType}, Message: {Message}", 
                    ex.GetType().Name, ex.Message);
                
                // Return error response with empty structured resume
                return new StructuredResumeResponse
                {
                    Resume = new StructuredResume(),
                    Suggestions = $"Error generating resume: {ex.Message}"
                };
            }
        }

        private static string BuildStructuredPrompt(string resume, string jobDescription)
        {
            return $@"
You are a professional resume optimization specialist. Your task is to analyze the provided resume and job description, then return a structured JSON response that optimizes the resume for the specific job.

**JOB DESCRIPTION:**
{jobDescription}

**CURRENT RESUME:**
{resume}

**INSTRUCTIONS:**
1. Parse the resume into structured sections
2. Optimize content to match the job description
3. Incorporate relevant keywords naturally
4. Enhance achievements with metrics where appropriate
5. Ensure ATS-friendly formatting

**IMPORTANT: Return ONLY valid JSON in the exact format below. No additional text, explanations, or markdown formatting.**

{{
  ""contact"": {{
    ""name"": ""Full Name"",
    ""email"": ""email@example.com"",
    ""phone"": ""+1 (555) 123-4567"",
    ""location"": ""City, State"",
    ""linkedin"": ""https://linkedin.com/in/username"",
    ""website"": ""https://portfolio.com"",
    ""github"": null
  }},
  ""summary"": ""2-3 sentence professional summary optimized for the job description"",
  ""experience"": [
    {{
      ""company"": ""Company Name"",
      ""position"": ""Job Title"",
      ""startDate"": ""YYYY-MM"",
      ""endDate"": ""YYYY-MM or Present"",
      ""location"": ""City, State"",
      ""responsibilities"": [
        ""Achievement or responsibility with metrics"",
        ""Another key responsibility""
      ],
      ""achievements"": [
        ""Quantified achievement"",
        ""Impact-focused result""
      ]
    }}
  ],
  ""education"": [
    {{
      ""institution"": ""University Name"",
      ""degree"": ""Degree Type"",
      ""field"": ""Major/Field of Study"",
      ""startDate"": ""YYYY-MM"",
      ""endDate"": ""YYYY-MM"",
      ""gpa"": ""3.8"",
      ""honors"": [""Magna Cum Laude""],
      ""relevantCourses"": [""Course 1"", ""Course 2""]
    }}
  ],
  ""skills"": [
    {{
      ""name"": ""Skill Name"",
      ""level"": ""Expert"",
      ""category"": ""Technical""
    }}
  ],
  ""projects"": [
    {{
      ""name"": ""Project Name"",
      ""description"": ""Brief project description"",
      ""technologies"": [""Tech1"", ""Tech2""],
      ""startDate"": ""YYYY-MM"",
      ""endDate"": ""YYYY-MM"",
      ""url"": ""https://project.com"",
      ""github"": ""https://github.com/user/project"",
      ""highlights"": [
        ""Key achievement"",
        ""Technical accomplishment""
      ]
    }}
  ],
  ""certifications"": null,
  ""languages"": [""English (Native)"", ""Spanish (Conversational)""],
  ""awards"": null
}}

**VALIDATION REQUIREMENTS:**
- All dates must be in YYYY-MM format
- All arrays must contain at least one item where required
- All required fields must be present
- JSON must be valid and parseable
- Include only information that can be verified or reasonably inferred from the original resume
- Use null for missing optional fields (linkedin, github, website, projects, certifications, languages, awards)
- Only include URLs if they can be reasonably inferred from the resume text
- If contact info is missing, use null instead of placeholder text";
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