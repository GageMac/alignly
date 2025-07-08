export interface GenerateResumeRequest {
  resume: string
  jobDescription: string
}

export interface GenerateResumeResponse {
  rewrittenResume: string
  sections: string[]
  suggestions: string
}

export interface ApiError {
  message: string
  status: number
}
