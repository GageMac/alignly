namespace Alignly.Api.DTOs
{
    public class ContactInfo
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string? LinkedIn { get; set; }
        public string? Website { get; set; }
        public string? GitHub { get; set; }
    }

    public class WorkExperience
    {
        public string Company { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;
        public string StartDate { get; set; } = string.Empty;
        public string EndDate { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public List<string> Responsibilities { get; set; } = new();
        public List<string>? Achievements { get; set; }
    }

    public class Education
    {
        public string Institution { get; set; } = string.Empty;
        public string Degree { get; set; } = string.Empty;
        public string Field { get; set; } = string.Empty;
        public string StartDate { get; set; } = string.Empty;
        public string EndDate { get; set; } = string.Empty;
        public string? Gpa { get; set; }
        public List<string>? Honors { get; set; }
        public List<string>? RelevantCourses { get; set; }
    }

    public class Skill
    {
        public string Name { get; set; } = string.Empty;
        public string? Level { get; set; }
        public string? Category { get; set; }
    }

    public class Project
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<string> Technologies { get; set; } = new();
        public string StartDate { get; set; } = string.Empty;
        public string EndDate { get; set; } = string.Empty;
        public string? Url { get; set; }
        public string? GitHub { get; set; }
        public List<string> Highlights { get; set; } = new();
    }

    public class Certification
    {
        public string Name { get; set; } = string.Empty;
        public string Issuer { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public string? ExpiryDate { get; set; }
        public string? CredentialId { get; set; }
    }

    public class StructuredResume
    {
        public ContactInfo Contact { get; set; } = new();
        public string Summary { get; set; } = string.Empty;
        public List<WorkExperience> Experience { get; set; } = new();
        public List<Education> Education { get; set; } = new();
        public List<Skill> Skills { get; set; } = new();
        public List<Project>? Projects { get; set; }
        public List<Certification>? Certifications { get; set; }
        public List<string>? Languages { get; set; }
        public List<string>? Awards { get; set; }
        public List<string>? Publications { get; set; }
        public List<WorkExperience>? VolunteerWork { get; set; }
    }

    public class StructuredResumeResponse
    {
        public StructuredResume Resume { get; set; } = new();
        public string Suggestions { get; set; } = string.Empty;
    }
} 