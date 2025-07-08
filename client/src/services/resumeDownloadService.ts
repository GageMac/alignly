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

export class ResumeDownloadService {
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
   * Generate PDF resume
   */
  async generatePDF(resumeText: string, filename?: string): Promise<void> {
    const parsed = this.parseResumeText(resumeText)
    const doc = new jsPDF()

    let yPosition = 20
    const pageWidth = doc.internal.pageSize.width
    const margin = 20
    const contentWidth = pageWidth - margin * 2

    // Header - Name
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text(parsed.name, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 15

    // Contact Information
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    const contactText = parsed.contact.join(' | ')
    doc.text(contactText, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 20

    // Add line separator
    doc.setLineWidth(0.5)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 15

    // Sections
    for (const section of parsed.sections) {
      // Check if we need a new page
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }

      // Section title
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text(section.title.toUpperCase(), margin, yPosition)
      yPosition += 10

      // Section content
      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')

      for (const content of section.content) {
        const lines = doc.splitTextToSize(content, contentWidth)

        for (const line of lines) {
          if (yPosition > 280) {
            doc.addPage()
            yPosition = 20
          }
          doc.text(line, margin, yPosition)
          yPosition += 5
        }
        yPosition += 3
      }
      yPosition += 10
    }

    // Save the PDF
    const pdfFilename = filename || `${parsed.name.replace(/\s+/g, '_')}_Resume.pdf`
    doc.save(pdfFilename)
  }

  /**
   * Generate DOCX resume
   */
  async generateDOCX(resumeText: string, filename?: string): Promise<void> {
    const parsed = this.parseResumeText(resumeText)
    const children: Paragraph[] = []

    // Header - Name
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: parsed.name,
            bold: true,
            size: 32,
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
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),
      )
    }

    // Sections
    for (const section of parsed.sections) {
      // Section title
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: section.title.toUpperCase(),
              bold: true,
              size: 24,
            }),
          ],
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 300, after: 200 },
          border: {
            bottom: {
              color: '000000',
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
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
              }),
            ],
            spacing: { after: 150 },
          }),
        )
      }
    }

    const doc = new Document({
      sections: [
        {
          properties: {},
          children,
        },
      ],
    })

    // Generate and save the document
    const blob = await Packer.toBlob(doc)
    const docxFilename = filename || `${parsed.name.replace(/\s+/g, '_')}_Resume.docx`
    saveAs(blob, docxFilename)
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
