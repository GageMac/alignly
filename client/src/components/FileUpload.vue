<template>
  <div class="space-y-4">
    <!-- File Upload Area -->
    <div
      @drop="handleDrop"
      @dragover.prevent
      @dragenter.prevent
      @dragleave="handleDragLeave"
      :class="[
        'relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200',
        isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50',
        'hover:border-blue-400 hover:bg-blue-25',
      ]"
    >
      <input
        ref="fileInput"
        type="file"
        accept=".pdf,.docx,.txt"
        @change="handleFileSelect"
        class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />

      <div class="flex flex-col items-center space-y-4">
        <div class="p-4 bg-white rounded-full shadow-sm">
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>

        <div>
          <p class="text-lg font-semibold text-gray-900 mb-1">
            Drop your resume here, or <span class="text-blue-600">browse</span>
          </p>
          <p class="text-sm text-gray-600">Supports PDF, DOCX, and TXT files (max 10MB)</p>
        </div>
      </div>
    </div>

    <!-- File Processing Status -->
    <div v-if="isProcessing" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div class="flex items-center space-x-3">
        <svg
          class="animate-spin h-5 w-5 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span class="text-blue-800 font-medium"
          >Extracting text from {{ processingFileName }}...</span
        >
      </div>
    </div>

    <!-- Upload Success -->
    <div
      v-if="uploadedFile && !isProcessing"
      class="bg-green-50 border border-green-200 rounded-lg p-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="p-2 bg-green-100 rounded-full">
            <svg
              class="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p class="text-green-800 font-medium">{{ uploadedFile.filename }}</p>
            <p class="text-green-600 text-sm">
              {{ uploadedFile.text.length }} characters extracted
            </p>
          </div>
        </div>
        <button
          @click="clearFile"
          class="text-green-600 hover:text-green-800 p-2 hover:bg-green-100 rounded-lg transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Upload Error -->
    <div v-if="uploadError" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <div class="flex items-start space-x-3">
        <svg
          class="w-5 h-5 text-red-500 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <p class="text-red-800 font-medium">Upload failed</p>
          <p class="text-red-700 text-sm">{{ uploadError }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fileProcessingService, type FileProcessingResult } from '@/services/fileProcessingService'

// Emits
const emit = defineEmits<{
  fileProcessed: [result: FileProcessingResult]
  error: [message: string]
}>()

// Reactive state
const isDragOver = ref(false)
const isProcessing = ref(false)
const processingFileName = ref('')
const uploadedFile = ref<FileProcessingResult | null>(null)
const uploadError = ref<string | null>(null)
const fileInput = ref<HTMLInputElement>()

// Drag and drop handlers
const handleDrop = async (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false

  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    await processFile(files[0])
  }
}

const handleDragLeave = (event: DragEvent) => {
  // Only set to false if we're actually leaving the drop zone
  const target = event.currentTarget as Element
  const relatedTarget = event.relatedTarget as Node
  if (!target?.contains(relatedTarget)) {
    isDragOver.value = false
  }
}

// File input handler
const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (files && files.length > 0) {
    await processFile(files[0])
  }
}

// File processing
const processFile = async (file: File) => {
  clearPreviousState()

  // Validate file size
  if (!fileProcessingService.validateFileSize(file)) {
    const maxSizeMB = fileProcessingService.getMaxFileSize() / (1024 * 1024)
    const error = `File is too large. Maximum size is ${maxSizeMB}MB.`
    uploadError.value = error
    emit('error', error)
    return
  }

  try {
    isProcessing.value = true
    processingFileName.value = file.name

    const result = await fileProcessingService.processFile(file)

    uploadedFile.value = result
    emit('fileProcessed', result)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    uploadError.value = errorMessage
    emit('error', errorMessage)
  } finally {
    isProcessing.value = false
    processingFileName.value = ''
  }
}

// Clear file and reset state
const clearFile = () => {
  clearPreviousState()
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const clearPreviousState = () => {
  uploadedFile.value = null
  uploadError.value = null
  isDragOver.value = false
}

// Expose clear method for parent component
defineExpose({
  clearFile,
})
</script>
