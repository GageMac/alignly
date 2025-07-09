export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  github?: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string; // "Present" for current jobs
  location: string;
  responsibilities: string[];
  achievements?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
  relevantCourses?: string[];
}

export interface Skill {
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  category?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate: string;
  url?: string;
  github?: string;
  highlights: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
}

export interface StructuredResume {
  contact: ContactInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects?: Project[];
  certifications?: Certification[];
  languages?: string[];
  awards?: string[];
  publications?: string[];
  volunteerWork?: WorkExperience[];
}

export interface RenderRequest {
  resume: StructuredResume;
  template: string;
  options?: {
    fontSize?: number;
    margin?: number;
    colorScheme?: "blue" | "green" | "purple" | "black";
  };
}

export interface RenderResponse {
  success: boolean;
  message?: string;
  downloadUrl?: string;
}
