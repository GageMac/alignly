<template>
  <div class="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
    <div class="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
      <h2 class="text-2xl font-bold text-white flex items-center">
        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Download Your Optimized Resume
      </h2>
      <p class="text-emerald-100 mt-1">
        Get your professionally formatted resume ready for applications
      </p>
    </div>

    <div class="p-8">
      <!-- Download Options -->
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <!-- PDF Download -->
        <div class="relative group">
          <div
            :class="[
              'border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg',
              selectedFormat === 'pdf'
                ? 'border-red-500 bg-red-50 shadow-md'
                : 'border-gray-200 hover:border-red-300',
            ]"
            @click="selectedFormat = 'pdf'"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">PDF Format</h3>
                  <p class="text-sm text-gray-600">Professional, ready-to-send</p>
                </div>
              </div>
              <div
                :class="[
                  'w-5 h-5 rounded-full border-2 transition-all duration-200',
                  selectedFormat === 'pdf' ? 'border-red-500 bg-red-500' : 'border-gray-300',
                ]"
              >
                <div
                  v-if="selectedFormat === 'pdf'"
                  class="w-full h-full rounded-full bg-white scale-50"
                ></div>
              </div>
            </div>
            <ul class="text-sm text-gray-600 space-y-1">
              <li class="flex items-center">
                <svg
                  class="w-4 h-4 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Perfect for online applications
              </li>
              <li class="flex items-center">
                <svg
                  class="w-4 h-4 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Professional formatting
              </li>
              <li class="flex items-center">
                <svg
                  class="w-4 h-4 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Works on any device
              </li>
            </ul>
          </div>
        </div>

        <!-- DOCX Download -->
        <div class="relative group">
          <div
            :class="[
              'border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg',
              selectedFormat === 'docx'
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-blue-300',
            ]"
            @click="selectedFormat = 'docx'"
          >
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Word Format</h3>
                  <p class="text-sm text-gray-600">Editable and customizable</p>
                </div>
              </div>
              <div
                :class="[
                  'w-5 h-5 rounded-full border-2 transition-all duration-200',
                  selectedFormat === 'docx' ? 'border-blue-500 bg-blue-500' : 'border-gray-300',
                ]"
              >
                <div
                  v-if="selectedFormat === 'docx'"
                  class="w-full h-full rounded-full bg-white scale-50"
                ></div>
              </div>
            </div>
            <ul class="text-sm text-gray-600 space-y-1">
              <li class="flex items-center">
                <svg
                  class="w-4 h-4 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Easy to edit and customize
              </li>
              <li class="flex items-center">
                <svg
                  class="w-4 h-4 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Compatible with MS Word
              </li>
              <li class="flex items-center">
                <svg
                  class="w-4 h-4 text-green-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Make final adjustments
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- File Name Input -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2"> File Name (optional) </label>
        <div class="relative">
          <input
            v-model="customFilename"
            type="text"
            placeholder="Enter custom filename or leave blank for auto-generated"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <span class="text-sm text-gray-500"> .{{ selectedFormat }} </span>
          </div>
        </div>
      </div>

      <!-- Preview Section -->
      <div class="mb-8 p-4 bg-gray-50 rounded-lg">
        <h4 class="text-sm font-medium text-gray-700 mb-2 flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Preview
        </h4>
        <div class="text-sm text-gray-600 max-h-32 overflow-y-auto bg-white p-3 rounded border">
          <div class="font-semibold mb-1">{{ previewData.name }}</div>
          <div v-if="previewData.contact.length" class="text-xs text-gray-500 mb-2">
            {{ previewData.contact.join(' | ') }}
          </div>
          <div
            v-for="section in previewData.sections.slice(0, 2)"
            :key="section.title"
            class="mb-2"
          >
            <div class="font-medium text-xs uppercase text-gray-700">{{ section.title }}</div>
            <div class="text-xs text-gray-600">{{ section.content.slice(0, 1).join(' ') }}...</div>
          </div>
        </div>
      </div>

      <!-- Download Actions -->
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-600">
          <span class="flex items-center">
            <svg
              class="w-4 h-4 text-green-500 mr-1"
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
            Free download • No watermarks
          </span>
        </div>

        <button
          @click="handleDownload"
          :disabled="isDownloading"
          :class="[
            'px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
            selectedFormat === 'pdf'
              ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 focus:ring-red-500'
              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:ring-blue-500',
          ]"
        >
          <span v-if="isDownloading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
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
            Generating...
          </span>
          <span v-else class="flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download {{ selectedFormat.toUpperCase() }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { resumeDownloadService } from '@/services/resumeDownloadService'

// Props
const props = defineProps<{
  resumeText: string
}>()

// Emits
const emit = defineEmits<{
  downloadStarted: [format: string]
  downloadCompleted: [format: string]
  downloadError: [error: string]
}>()

// Reactive state
const selectedFormat = ref<'pdf' | 'docx'>('pdf')
const customFilename = ref('')
const isDownloading = ref(false)

// Computed properties
const previewData = computed(() => {
  return resumeDownloadService.parseResumeText(props.resumeText)
})

// Methods
const handleDownload = async () => {
  isDownloading.value = true
  emit('downloadStarted', selectedFormat.value)

  try {
    const filename = customFilename.value.trim() || undefined

    if (selectedFormat.value === 'pdf') {
      await resumeDownloadService.generatePDF(props.resumeText, filename)
    } else {
      await resumeDownloadService.generateDOCX(props.resumeText, filename)
    }

    emit('downloadCompleted', selectedFormat.value)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate file'
    emit('downloadError', errorMessage)
  } finally {
    isDownloading.value = false
  }
}
</script>
