import type { GenerateResumeRequest, GenerateResumeResponse, ApiError } from '@/types/api'

class ResumeService {
  private readonly baseUrl = '/api/resume'

  async generateOptimizedResume(request: GenerateResumeRequest): Promise<GenerateResumeResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('An unexpected error occurred')
    }
  }
}

export const resumeService = new ResumeService()
