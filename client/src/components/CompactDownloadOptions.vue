<template>
  <div class="space-y-6">
    <!-- Template Selection -->
    <div>
      <label class="text-sm font-medium text-gray-900 mb-3 block">Choose Template Style</label>
      <div class="grid grid-cols-1 gap-3">
        <label
          v-for="template in templates"
          :key="template.id"
          class="flex items-center cursor-pointer"
        >
          <input type="radio" v-model="selectedTemplate" :value="template.id" class="sr-only" />
          <div
            class="flex items-center w-full px-4 py-3 rounded-lg border-2 transition-all duration-200"
            :class="
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            "
          >
            <div
              class="w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center mr-3"
              :class="
                selectedTemplate === template.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
              "
            >
              <div
                v-if="selectedTemplate === template.id"
                class="w-2 h-2 bg-white rounded-full"
              ></div>
            </div>
            <div class="flex-1">
              <div class="flex items-center space-x-2">
                <component :is="template.icon" class="w-5 h-5" :class="template.iconColor" />
                <span class="text-sm font-medium text-gray-900">{{ template.name }}</span>
              </div>
              <p class="text-xs text-gray-500 mt-1">{{ template.description }}</p>
            </div>
          </div>
        </label>
      </div>
    </div>

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

// Template Icons (using simple SVG components)
const ModernIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
    </svg>
  `,
}

const TraditionalIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clip-rule="evenodd" />
    </svg>
  `,
}

const TechIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 20 20">
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
    </svg>
  `,
}

interface Props {
  optimizedResume: string
  originalFilename?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  error: [error: string]
}>()

const selectedFormat = ref<'pdf' | 'docx'>('pdf')
const selectedTemplate = ref('modern')
const filename = ref('')
const isDownloading = ref(false)

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean design with subtle colors and modern typography',
    icon: ModernIcon,
    iconColor: 'text-blue-600',
  },
  {
    id: 'traditional',
    name: 'Traditional',
    description: 'Classic format preferred by conservative industries',
    icon: TraditionalIcon,
    iconColor: 'text-gray-600',
  },
  {
    id: 'techy',
    name: 'Tech-Focused',
    description: 'Contemporary style optimized for tech companies',
    icon: TechIcon,
    iconColor: 'text-purple-600',
  },
]

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
      await resumeDownloadService.generatePDF(
        props.optimizedResume,
        filename.value,
        selectedTemplate.value,
      )
    } else {
      await resumeDownloadService.generateDOCX(
        props.optimizedResume,
        filename.value,
        selectedTemplate.value,
      )
    }
  } catch (error) {
    console.error('Download failed:', error)
    emit('error', `Failed to download ${selectedFormat.value.toUpperCase()}. Please try again.`)
  } finally {
    isDownloading.value = false
  }
}
</script>
