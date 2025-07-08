using Alignly.Api.DTOs;

namespace Alignly.Api.Services
{
    public interface IResumeService
    {
        Task<GenerateResumeResponse> GenerateOptimizedResumeAsync(GenerateResumeRequest request);
    }
} 