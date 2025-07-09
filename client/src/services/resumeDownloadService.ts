import jsPDF from 'jspdf'
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
} from 'docx'
import { saveAs } from 'file-saver'

export interface ResumeSection {
  title: string
  content: string[]
  type: 'header' | 'section' | 'list' | 'text'
}

export interface ParsedResume {
  name: string
  contact: string[]
  sections: ResumeSection[]
}

export interface ResumeTemplate {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
  }
  fonts: {
    heading: string
    body: string
  }
  spacing: {
    section: number
    line: number
  }
  style: 'modern' | 'corporate' | 'creative'
}

export class ResumeDownloadService {
  private templates: Record<string, ResumeTemplate> = {
    modern: {
      name: 'Modern',
      colors: {
        primary: '#2563eb', // Blue-600
        secondary: '#64748b', // Slate-500
        accent: '#06b6d4', // Cyan-500
        text: '#1e293b', // Slate-800
      },
      fonts: {
        heading: 'helvetica',
        body: 'helvetica',
      },
      spacing: {
        section: 18,
        line: 6,
      },
      style: 'modern',
    },
    corporate: {
      name: 'Corporate',
      colors: {
        primary: '#374151', // Gray-700
        secondary: '#6b7280', // Gray-500
        accent: '#374151', // Gray-700
        text: '#111827', // Gray-900
      },
      fonts: {
        heading: 'times',
        body: 'times',
      },
      spacing: {
        section: 16,
        line: 5,
      },
      style: 'corporate',
    },
    creative: {
      name: 'Creative',
      colors: {
        primary: '#7c3aed', // Purple-600
        secondary: '#64748b', // Slate-500
        accent: '#06b6d4', // Cyan-500
        text: '#0f172a', // Slate-900
      },
      fonts: {
        heading: 'helvetica',
        body: 'helvetica',
      },
      spacing: {
        section: 20,
        line: 6,
      },
      style: 'creative',
    },
  }

  /**
   * Parse optimized resume text into structured sections
   */
  parseResumeText(resumeText: string): ParsedResume {
    const lines = resumeText.split('\n').filter((line) => line.trim())
    const sections: ResumeSection[] = []

    let currentSection: ResumeSection | null = null
    let name = 'Resume'
    let contact: string[] = []

    // Extract name (usually first line)
    if (lines.length > 0) {
      const firstLine = lines[0].trim()
      if (!firstLine.includes('@') && !firstLine.includes('Phone') && firstLine.length < 50) {
        name = firstLine
        lines.shift()
      }
    }

    // Extract contact info (email, phone, etc.)
    for (let i = 0; i < Math.min(5, lines.length); i++) {
      const line = lines[i].trim()
      if (this.isContactInfo(line)) {
        contact.push(line)
      } else if (contact.length > 0) {
        break
      }
    }

    // Remove contact lines from main processing
    lines.splice(0, contact.length)

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      if (this.isSectionHeader(line)) {
        // Save previous section
        if (currentSection) {
          sections.push(currentSection)
        }

        // Start new section
        currentSection = {
          title: this.cleanSectionTitle(line),
          content: [],
          type: 'section',
        }
      } else if (line && currentSection) {
        currentSection.content.push(line)
      } else if (line && !currentSection) {
        // Create a general section for content before first header
        currentSection = {
          title: 'Summary',
          content: [line],
          type: 'section',
        }
      }
    }

    // Add final section
    if (currentSection) {
      sections.push(currentSection)
    }

    return { name, contact, sections }
  }

  /**
   * Generate PDF resume with template styling
   */
  async generatePDF(
    resumeText: string,
    filename?: string,
    templateId: string = 'modern',
  ): Promise<void> {
    const template = this.templates[templateId] || this.templates.modern
    const parsed = this.parseResumeText(resumeText)
    const doc = new jsPDF()

    let yPosition = 20
    const pageWidth = doc.internal.pageSize.width
    const margin = 20
    const contentWidth = pageWidth - margin * 2

    // Apply template styling
    this.applyPDFTemplateStyle(doc, template, parsed, {
      yPosition,
      pageWidth,
      margin,
      contentWidth,
    })

    // Save the PDF
    const pdfFilename = filename
      ? `${filename}.pdf`
      : `${parsed.name.replace(/\s+/g, '_')}_Resume.pdf`
    doc.save(pdfFilename)
  }

  /**
   * Generate DOCX resume with template styling
   */
  async generateDOCX(
    resumeText: string,
    filename?: string,
    templateId: string = 'modern',
  ): Promise<void> {
    const template = this.templates[templateId] || this.templates.modern
    const parsed = this.parseResumeText(resumeText)

    const document = new Document({
      sections: [
        {
          properties: {},
          children: this.createDOCXContent(parsed, template),
        },
      ],
    })

    // Generate and save DOCX
    const buffer = await Packer.toBuffer(document)
    const docxFilename = filename
      ? `${filename}.docx`
      : `${parsed.name.replace(/\s+/g, '_')}_Resume.docx`

    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    })
    saveAs(blob, docxFilename)
  }

  private applyPDFTemplateStyle(
    doc: jsPDF,
    template: ResumeTemplate,
    parsed: ParsedResume,
    layout: { yPosition: number; pageWidth: number; margin: number; contentWidth: number },
  ): void {
    let { yPosition } = layout
    const { pageWidth, margin, contentWidth } = layout

    // Header - Name with template styling
    doc.setFontSize(template.style === 'corporate' ? 22 : 24)
    doc.setFont(template.fonts.heading, 'bold')

    if (template.style === 'modern') {
      // Modern: Add subtle background rectangle
      doc.setFillColor(240, 248, 255) // Very light blue
      doc.rect(margin, yPosition - 8, contentWidth, 25, 'F')
    }

    const [primaryR, primaryG, primaryB] = this.hexToRgb(template.colors.primary)
    doc.setTextColor(primaryR, primaryG, primaryB)
    doc.text(parsed.name, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += template.spacing.section

    // Contact Information
    doc.setFontSize(10)
    doc.setFont(template.fonts.body, 'normal')
    const [secondaryR, secondaryG, secondaryB] = this.hexToRgb(template.colors.secondary)
    doc.setTextColor(secondaryR, secondaryG, secondaryB)
    const contactText = parsed.contact.join(' | ')
    doc.text(contactText, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += template.spacing.section

    // Decorative line based on template
    doc.setLineWidth(template.style === 'creative' ? 1 : 0.5)
    const [accentR, accentG, accentB] = this.hexToRgb(template.colors.accent)
    doc.setDrawColor(accentR, accentG, accentB)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += template.spacing.section

    // Sections
    for (const section of parsed.sections) {
      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      // Section title with template styling
      doc.setFontSize(template.style === 'corporate' ? 12 : 14)
      doc.setFont(template.fonts.heading, 'bold')
      const [sectionPrimaryR, sectionPrimaryG, sectionPrimaryB] = this.hexToRgb(
        template.colors.primary,
      )
      doc.setTextColor(sectionPrimaryR, sectionPrimaryG, sectionPrimaryB)

      if (template.style === 'creative') {
        // Tech: Add background rectangle for section headers
        doc.setFillColor(249, 250, 251) // Very light gray
        doc.rect(margin, yPosition - 4, contentWidth, 12, 'F')
      }

      doc.text(section.title.toUpperCase(), margin, yPosition)
      yPosition += 12

      // Section content
      doc.setFontSize(10)
      doc.setFont(template.fonts.body, 'normal')
      const [textR, textG, textB] = this.hexToRgb(template.colors.text)
      doc.setTextColor(textR, textG, textB)

      for (const content of section.content) {
        const lines = doc.splitTextToSize(content, contentWidth)

        for (const line of lines) {
          if (yPosition > 280) {
            doc.addPage()
            yPosition = 20
          }
          doc.text(line, margin, yPosition)
          yPosition += template.spacing.line
        }
        yPosition += 3
      }
      yPosition += template.spacing.section
    }
  }

  private createDOCXContent(parsed: ParsedResume, template: ResumeTemplate): Paragraph[] {
    const children: Paragraph[] = []

    // Header - Name with template styling
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: parsed.name,
            bold: true,
            size: template.style === 'corporate' ? 28 : 32,
            color: template.colors.primary.replace('#', ''),
            font: template.fonts.heading,
          }),
        ],
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
      }),
    )

    // Contact Information
    if (parsed.contact.length > 0) {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: parsed.contact.join(' | '),
              size: 20,
              color: template.colors.secondary.replace('#', ''),
              font: template.fonts.body,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),
      )
    }

    // Sections with template styling
    for (const section of parsed.sections) {
      // Section header
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: section.title.toUpperCase(),
              bold: true,
              size: template.style === 'corporate' ? 24 : 28,
              color: template.colors.primary.replace('#', ''),
              font: template.fonts.heading,
            }),
          ],
          spacing: { before: 400, after: 200 },
          border:
            template.style === 'modern'
              ? {
                  bottom: {
                    color: template.colors.accent.replace('#', ''),
                    size: 6,
                    style: BorderStyle.SINGLE,
                  },
                }
              : undefined,
        }),
      )

      // Section content
      for (const content of section.content) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: content,
                size: 22,
                color: template.colors.text.replace('#', ''),
                font: template.fonts.body,
              }),
            ],
            spacing: { after: 150 },
          }),
        )
      }
    }

    return children
  }

  private hexToRgb(hex: string): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
      : [0, 0, 0]
  }

  /**
   * Helper methods
   */
  private isSectionHeader(line: string): boolean {
    const cleanLine = line.trim().toLowerCase()
    const commonHeaders = [
      'experience',
      'education',
      'skills',
      'summary',
      'objective',
      'certifications',
      'projects',
      'achievements',
      'awards',
      'professional experience',
      'work experience',
      'employment',
      'qualifications',
      'technical skills',
      'core competencies',
    ]

    // Check if line is all caps or ends with colon
    if (line === line.toUpperCase() && line.length < 30) return true
    if (line.endsWith(':')) return true

    // Check against common headers
    return commonHeaders.some((header) => cleanLine.includes(header) && cleanLine.length < 50)
  }

  private cleanSectionTitle(title: string): string {
    return title.replace(/[:\-_]/g, '').trim()
  }

  private isContactInfo(line: string): boolean {
    const emailRegex = /\S+@\S+\.\S+/
    const phoneRegex = /[\+]?[1-9]?[\d\s\-\(\)]{7,15}/
    const linkedinRegex = /linkedin\.com/i
    const githubRegex = /github\.com/i

    return (
      emailRegex.test(line) ||
      phoneRegex.test(line) ||
      linkedinRegex.test(line) ||
      githubRegex.test(line) ||
      line.toLowerCase().includes('phone') ||
      line.toLowerCase().includes('email')
    )
  }
}

export const resumeDownloadService = new ResumeDownloadService()
