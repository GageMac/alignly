export interface ContactInfo {
  name: string;
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  linkedin?: string | null;
  website?: string | null;
  github?: string | null;
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate?: string | null;
  endDate?: string | null; // "Present" for current jobs
  location?: string | null;
  responsibilities: string[];
  achievements?: string[] | null;
}

export interface Education {
  institution: string;
  degree: string;
  field?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  gpa?: string | null;
  honors?: string[] | null;
  relevantCourses?: string[] | null;
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
  url?: string | null;
  github?: string | null;
  highlights?: string[];
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
  summary?: string | null;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects?: Project[] | null;
  certifications?: Certification[] | null;
  languages?: string[] | null;
  awards?: string[] | null;
  publications?: string[] | null;
  volunteerWork?: WorkExperience[] | null;
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

// Centralized template and color scheme configuration
export const TEMPLATES = {
  MODERN: "modern",
  CORPORATE: "corporate",
  CREATIVE: "creative",
  MINIMAL: "minimal",
  DUMMY: "dummy",
} as const;

export const COLOR_SCHEMES = {
  // Modern and Minimal template colors
  BLUE: "blue",
  GREEN: "green",
  PURPLE: "purple",
  BLACK: "black",

  // Corporate template colors
  NAVY: "navy",
  CHARCOAL: "charcoal",
  BURGUNDY: "burgundy",
  FOREST: "forest",

  // Creative template colors
  CORAL: "coral",
  TEAL: "teal",
  VIOLET: "violet",
  ROSE: "rose",
} as const;

export const TEMPLATE_INFO = {
  [TEMPLATES.MODERN]: {
    name: "Modern Professional",
    description:
      "Clean, modern design with two-column layout and professional styling",
    colorSchemes: [
      COLOR_SCHEMES.BLUE,
      COLOR_SCHEMES.GREEN,
      COLOR_SCHEMES.PURPLE,
      COLOR_SCHEMES.BLACK,
    ],
    features: [
      "Two-column layout",
      "Professional styling",
      "ATS-friendly",
      "Color accents",
    ],
  },
  [TEMPLATES.CORPORATE]: {
    name: "Corporate Classic",
    description:
      "Traditional corporate design with serif fonts and formal styling",
    colorSchemes: [
      COLOR_SCHEMES.NAVY,
      COLOR_SCHEMES.CHARCOAL,
      COLOR_SCHEMES.BURGUNDY,
      COLOR_SCHEMES.FOREST,
    ],
    features: [
      "Classic styling",
      "Serif fonts",
      "Formal layout",
      "Conservative design",
    ],
  },
  [TEMPLATES.CREATIVE]: {
    name: "Creative Professional",
    description:
      "Modern creative design with elegant accents and vibrant colors",
    colorSchemes: [
      COLOR_SCHEMES.CORAL,
      COLOR_SCHEMES.TEAL,
      COLOR_SCHEMES.VIOLET,
      COLOR_SCHEMES.ROSE,
    ],
    features: [
      "Creative layout",
      "Elegant accents",
      "Color header",
      "Modern typography",
    ],
  },
  [TEMPLATES.MINIMAL]: {
    name: "Minimal Clean",
    description: "Simple, clean design focusing on content clarity",
    colorSchemes: [
      COLOR_SCHEMES.BLUE,
      COLOR_SCHEMES.GREEN,
      COLOR_SCHEMES.PURPLE,
      COLOR_SCHEMES.BLACK,
    ],
    features: [
      "Minimal design",
      "Clean layout",
      "Focus on content",
      "Simple styling",
    ],
  },
  [TEMPLATES.DUMMY]: {
    name: "Test Template",
    description: "Simple template for testing PDF generation",
    colorSchemes: [COLOR_SCHEMES.BLUE],
    features: ["Testing only"],
  },
} as const;

export type TemplateId = keyof typeof TEMPLATE_INFO;
export type ColorSchemeId = (typeof COLOR_SCHEMES)[keyof typeof COLOR_SCHEMES];
