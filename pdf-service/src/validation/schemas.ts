import { z } from "zod";

// Updated color scheme validation for each template
const ColorSchemeSchema = z.union([
  // Modern template colors
  z.literal("blue"),
  z.literal("green"),
  z.literal("purple"),
  z.literal("black"),
  // Corporate template colors
  z.literal("navy"),
  z.literal("charcoal"),
  z.literal("burgundy"),
  z.literal("forest"),
  // Creative template colors
  z.literal("coral"),
  z.literal("teal"),
  z.literal("violet"),
  z.literal("rose"),
]);

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  linkedin: z.string().nullable().optional(),
  github: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
});

const ExperienceSchema = z.object({
  position: z.string().min(1, "Position is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().nullable().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  responsibilities: z
    .array(z.string())
    .min(1, "At least one responsibility is required"),
  achievements: z.array(z.string()).nullable().optional(),
});

const EducationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  field: z.string().nullable().optional(),
  institution: z.string().min(1, "Institution is required"),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  gpa: z.string().nullable().optional(),
  honors: z.array(z.string()).nullable().optional(),
  relevantCourses: z.array(z.string()).nullable().optional(),
});

const SkillSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  level: z.string().optional(),
  category: z.string().optional(),
});

const ProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Project description is required"),
  technologies: z
    .array(z.string())
    .min(1, "At least one technology is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  url: z.string().nullable().optional(),
  github: z.string().nullable().optional(),
  highlights: z.array(z.string()).optional(),
});

const CertificationSchema = z.object({
  name: z.string().min(1, "Certification name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  date: z.string().min(1, "Date is required"),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
});

const ResumeSchema = z.object({
  contact: ContactSchema,
  summary: z.string().nullable().optional(),
  experience: z
    .array(ExperienceSchema)
    .min(1, "At least one experience is required"),
  education: z
    .array(EducationSchema)
    .min(1, "At least one education is required"),
  skills: z.array(SkillSchema).min(1, "At least one skill is required"),
  projects: z.array(ProjectSchema).nullable().optional(),
  certifications: z.array(CertificationSchema).nullable().optional(),
  languages: z.array(z.string()).nullable().optional(),
  awards: z.array(z.string()).nullable().optional(),
});

const OptionsSchema = z.object({
  colorScheme: ColorSchemeSchema.optional(),
  fontSize: z.number().optional(),
  pageMargins: z.number().optional(),
});

export const RenderRequestSchema = z.object({
  template: z.enum(["modern", "corporate", "creative", "minimal", "dummy"]),
  resume: ResumeSchema,
  options: OptionsSchema.optional(),
});

export type RenderRequest = z.infer<typeof RenderRequestSchema>;
