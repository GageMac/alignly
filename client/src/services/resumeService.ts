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

  async generateOptimizedPdf(
    request: GenerateResumeRequest,
    template: string = 'modern',
    colorScheme: string = 'blue',
  ): Promise<Blob> {
    try {
      const response = await fetch(
        `${this.baseUrl}/generate-pdf?template=${template}&colorScheme=${colorScheme}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        },
      )

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      // Return the PDF as a blob
      return await response.blob()
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('An unexpected error occurred')
    }
  }

  // Helper method to download the PDF
  downloadPdf(pdfBlob: Blob, filename: string = 'optimized-resume.pdf') {
    const url = window.URL.createObjectURL(pdfBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
}

export const resumeService = new ResumeService()
