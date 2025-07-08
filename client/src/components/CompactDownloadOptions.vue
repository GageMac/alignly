<template>
  <div class="space-y-4">
    <!-- Format Selection -->
    <div>
      <label class="text-sm font-medium text-gray-900 mb-3 block">Download Format</label>
      <div class="flex space-x-4">
        <label class="flex items-center cursor-pointer">
          <input type="radio" v-model="selectedFormat" value="pdf" class="sr-only" />
          <div
            class="flex items-center space-x-3 px-4 py-3 rounded-lg border-2 transition-all duration-200"
            :class="
              selectedFormat === 'pdf'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            "
          >
            <div
              class="w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center"
              :class="selectedFormat === 'pdf' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'"
            >
              <div v-if="selectedFormat === 'pdf'" class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-sm font-medium text-gray-900">PDF</span>
              </div>
              <p class="text-xs text-gray-500 mt-1">Professional formatting, widely accepted</p>
            </div>
          </div>
        </label>

        <label class="flex items-center cursor-pointer">
          <input type="radio" v-model="selectedFormat" value="docx" class="sr-only" />
          <div
            class="flex items-center space-x-3 px-4 py-3 rounded-lg border-2 transition-all duration-200"
            :class="
              selectedFormat === 'docx'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            "
          >
            <div
              class="w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center"
              :class="selectedFormat === 'docx' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'"
            >
              <div v-if="selectedFormat === 'docx'" class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div>
              <div class="flex items-center space-x-2">
                <svg class="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="text-sm font-medium text-gray-900">DOCX</span>
              </div>
              <p class="text-xs text-gray-500 mt-1">Editable, ATS-friendly format</p>
            </div>
          </div>
        </label>
      </div>
    </div>

    <!-- Filename Input -->
    <div>
      <label class="text-sm font-medium text-gray-900 mb-2 block">Filename</label>
      <input
        v-model="filename"
        type="text"
        placeholder="Enter filename (without extension)"
        class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <!-- Download Button -->
    <button
      @click="handleDownload"
      :disabled="isDownloading || !filename.trim()"
      class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
    >
      <svg
        v-if="isDownloading"
        class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
      <span>{{
        isDownloading ? 'Generating...' : `Download ${selectedFormat.toUpperCase()}`
      }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { resumeDownloadService } from '../services/resumeDownloadService'

interface Props {
  optimizedResume: string
  originalFilename?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  error: [error: string]
}>()

const selectedFormat = ref<'pdf' | 'docx'>('pdf')
const filename = ref('')
const isDownloading = ref(false)

// Auto-generate filename from original or use default
watch(
  () => props.originalFilename,
  (newFilename) => {
    if (newFilename) {
      //Remove extension and use base name
      const baseName = newFilename.replace(/\.[^/.]+$/, '')
      filename.value = `${baseName}_optimized`
    } else {
      filename.value = 'optimized_resume'
    }
  },
  { immediate: true },
)

const handleDownload = async () => {
  if (!filename.value.trim()) return

  isDownloading.value = true

  try {
    if (selectedFormat.value === 'pdf') {
      await resumeDownloadService.generatePDF(props.optimizedResume, filename.value)
    } else {
      await resumeDownloadService.generateDOCX(props.optimizedResume, filename.value)
    }
  } catch (error) {
    console.error('Download failed:', error)
    emit('error', `Failed to download ${selectedFormat.value.toUpperCase()}. Please try again.`)
  } finally {
    isDownloading.value = false
  }
}
</script>
