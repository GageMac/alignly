using Alignly.Api.DTOs;

namespace Alignly.Api.Services
{
    public interface IResumeService
    {
        Task<StructuredResumeResponse> GenerateStructuredResumeAsync(GenerateResumeRequest request);
    }
} 