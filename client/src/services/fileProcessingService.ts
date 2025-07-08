import * as pdfjs from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs?url'
import mammoth from 'mammoth'

// Configure PDF.js worker for Vite
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker

export interface FileProcessingResult {
  text: string
  filename: string
  fileType: 'pdf' | 'docx' | 'txt'
}

export class FileProcessingService {
  async processFile(file: File): Promise<FileProcessingResult> {
    const filename = file.name
    const fileType = this.getFileType(file)

    if (!this.isValidFileType(fileType)) {
      throw new Error('Unsupported file type. Please upload PDF, DOCX, or TXT files.')
    }

    let text: string

    try {
      switch (fileType) {
        case 'pdf':
          text = await this.extractPdfText(file)
          break
        case 'docx':
          text = await this.extractDocxText(file)
          break
        case 'txt':
          text = await this.extractTxtText(file)
          break
        default:
          throw new Error('Unsupported file type')
      }

      if (!text.trim()) {
        throw new Error(
          'No text found in the file. Please check if the file contains readable content.',
        )
      }

      return {
        text: text.trim(),
        filename,
        fileType,
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to process ${filename}: ${error.message}`)
      }
      throw new Error(`Failed to process ${filename}: Unknown error`)
    }
  }

  private getFileType(file: File): 'pdf' | 'docx' | 'txt' | 'unknown' {
    const extension = file.name.toLowerCase().split('.').pop()
    const mimeType = file.type.toLowerCase()

    if (extension === 'pdf' || mimeType === 'application/pdf') {
      return 'pdf'
    }
    if (
      extension === 'docx' ||
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      return 'docx'
    }
    if (extension === 'txt' || mimeType === 'text/plain') {
      return 'txt'
    }
    return 'unknown'
  }

  private isValidFileType(fileType: string): fileType is 'pdf' | 'docx' | 'txt' {
    return ['pdf', 'docx', 'txt'].includes(fileType)
  }

  private async extractPdfText(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer()
    const loadingTask = pdfjs.getDocument(arrayBuffer)
    const pdf = await loadingTask.promise

    let fullText = ''

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items.map((item: any) => item.str).join(' ')
      fullText += pageText + '\n'
    }

    return fullText
  }

  private async extractDocxText(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer()
    const result = await mammoth.extractRawText({ arrayBuffer })
    return result.value
  }

  private async extractTxtText(file: File): Promise<string> {
    return await file.text()
  }

  getMaxFileSize(): number {
    return 10 * 1024 * 1024 // 10MB
  }

  validateFileSize(file: File): boolean {
    return file.size <= this.getMaxFileSize()
  }
}

export const fileProcessingService = new FileProcessingService()
