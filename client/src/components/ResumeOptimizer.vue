<template>
  <!-- Modern Header -->
  <ModernHeader />

  <!-- Main Content -->
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Optimize Your Resume with AI</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Upload your resume, paste a job description, and get an AI-optimized resume tailored to
          land your dream job.
        </p>
      </div>

      <!-- Step Indicator -->
      <StepIndicator :current-step="currentStep" />

      <!-- Error Message -->
      <ErrorMessage
        v-if="error"
        :message="error"
        :can-retry="true"
        @retry="handleRetry"
        class="mb-8"
      />

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Step 1: Resume Input -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="p-6 border-b border-gray-100">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span class="text-blue-600 font-semibold text-sm">1</span>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Your Resume</h3>
            </div>
            <p class="text-sm text-gray-500 mt-2">Upload a file or paste your resume text</p>
          </div>

          <div class="p-6">
            <FileUpload
              @file-processed="handleFileProcessed"
              @error="handleFileError"
              class="mb-4"
            />

            <!-- Collapsible Resume Text Area -->
            <div v-if="resumeText && !showResumeEditor" class="mb-4">
              <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="text-sm font-medium text-green-800"
                      >Resume loaded successfully</span
                    >
                    <span class="text-xs text-green-600">({{ resumeText.length }} characters)</span>
                  </div>
                  <button
                    @click="showResumeEditor = true"
                    class="text-xs text-green-700 hover:text-green-900 font-medium underline"
                  >
                    Edit resume text
                  </button>
                </div>
              </div>
            </div>

            <div v-if="!resumeText || showResumeEditor" class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ resumeText ? 'Edit your resume text' : 'Or paste your resume text' }}
              </label>
              <textarea
                v-model="resumeText"
                placeholder="Paste your resume content here..."
                rows="12"
                class="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                :class="{ 'border-green-300 bg-green-50': resumeText.length > 100 }"
              ></textarea>
              <div class="absolute bottom-3 right-3 text-xs text-gray-400">
                {{ resumeText.length }} characters
              </div>

              <!-- Hide Editor Button -->
              <div v-if="showResumeEditor && resumeText.length > 100" class="mt-2 text-right">
                <button
                  @click="showResumeEditor = false"
                  class="text-xs text-gray-600 hover:text-gray-800 font-medium"
                >
                  ✓ Done editing
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Job Description -->
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="p-6 border-b border-gray-100">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span class="text-blue-600 font-semibold text-sm">2</span>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Target Job</h3>
            </div>
            <p class="text-sm text-gray-500 mt-2">Paste the job description you're applying for</p>
          </div>

          <div class="p-6">
            <div class="relative">
              <textarea
                v-model="jobDescription"
                placeholder="Paste the job description here..."
                rows="16"
                class="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                :class="{ 'border-green-300 bg-green-50': jobDescription.length > 100 }"
              ></textarea>
              <div class="absolute bottom-3 right-3 text-xs text-gray-400">
                {{ jobDescription.length }} characters
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Optimize Button -->
      <div class="text-center mb-8">
        <button
          @click="optimizeResume"
          :disabled="!canOptimize || isLoading"
          class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md text-lg"
        >
          {{ isLoading ? 'Optimizing...' : 'Optimize My Resume' }}
        </button>
        <p class="text-sm text-gray-500 mt-2">This usually takes 10-30 seconds</p>
      </div>

      <!-- Loading Progress -->
      <LoadingProgress
        v-if="isLoading"
        :current-step="loadingStep"
        :time-elapsed="timeElapsed"
        class="mb-8"
      />

      <!-- Results Section -->
      <div
        v-if="optimizedResume"
        ref="resultsSection"
        class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
      >
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900">Optimized Resume</h3>
            </div>

            <!-- Quick Stats -->
            <div class="hidden sm:flex items-center space-x-6 text-sm text-gray-500">
              <div class="text-center">
                <div class="font-semibold text-gray-900">
                  {{ Math.round((optimizedResume.length / resumeText.length - 1) * 100) }}%
                </div>
                <div>Improvement</div>
              </div>
              <div class="text-center">
                <div class="font-semibold text-gray-900">
                  {{ optimizedResume.split('\n').length }}
                </div>
                <div>Lines</div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          <!-- Optimized Resume Text -->
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-3">
              Your optimized resume
            </label>
            <div class="relative">
              <textarea
                :value="optimizedResume"
                readonly
                rows="20"
                class="w-full px-3 py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:outline-none resize-none"
              ></textarea>
              <button
                @click="copyToClipboard"
                class="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Copy to clipboard"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Download Options -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">
              Download your resume
            </label>
            <CompactDownloadOptions
              :optimized-resume="optimizedResume"
              :original-filename="originalFilename"
              @error="handleDownloadError"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { resumeService } from '../services/resumeService'
import FileUpload from './FileUpload.vue'
import LoadingProgress from './LoadingProgress.vue'
import ErrorMessage from './ErrorMessage.vue'
import CompactDownloadOptions from './CompactDownloadOptions.vue'
import ModernHeader from './ModernHeader.vue'
import StepIndicator from './StepIndicator.vue'

const resumeText = ref('')
const jobDescription = ref('')
const optimizedResume = ref('')
const originalFilename = ref('')
const isLoading = ref(false)
const error = ref('')
const loadingStep = ref(0)
const timeElapsed = ref(0)
const retryCount = ref(0)

let loadingInterval: number | null = null
let timeInterval: number | null = null

const currentStep = computed(() => {
  if (optimizedResume.value) return 3
  if (jobDescription.value.length > 50) return 2
  if (resumeText.value.length > 50) return 1
  return 0
})

const canOptimize = computed(() => {
  return (
    resumeText.value.trim().length > 50 &&
    jobDescription.value.trim().length > 50 &&
    !isLoading.value
  )
})

const showResumeEditor = ref(false)
const resultsSection = ref<HTMLElement>()

const handleFileProcessed = (data: { text: string; filename: string }) => {
  resumeText.value = data.text
  originalFilename.value = data.filename
  showResumeEditor.value = false // Auto-hide editor when file is processed
  error.value = ''
}

const handleFileError = (errorMessage: string) => {
  error.value = errorMessage
}

const handleDownloadError = (errorMessage: string) => {
  error.value = errorMessage
}

const optimizeResume = async () => {
  if (!canOptimize.value) return

  isLoading.value = true
  error.value = ''
  loadingStep.value = 0
  timeElapsed.value = 0
  retryCount.value = 0

  // Start progress simulation
  loadingInterval = setInterval(() => {
    if (loadingStep.value < 3) {
      loadingStep.value++
    }
  }, 3000) as unknown as number

  // Start time tracking
  timeInterval = setInterval(() => {
    timeElapsed.value++
  }, 1000) as unknown as number

  try {
    // Generate optimized PDF directly
    const pdfBlob = await resumeService.generateOptimizedPdf(
      {
        resume: resumeText.value,
        jobDescription: jobDescription.value,
      },
      'modern',
      'blue',
    ) // Default to modern template with blue color

    loadingStep.value = 4

    // Download the PDF
    const filename = originalFilename.value
      ? `optimized-${originalFilename.value.replace(/\.[^/.]+$/, '')}.pdf`
      : 'optimized-resume.pdf'

    resumeService.downloadPdf(pdfBlob, filename)

    // Set a success message instead of showing text
    optimizedResume.value =
      '✅ Your optimized resume has been downloaded successfully! The PDF has been tailored to match the job description with enhanced keywords and professional formatting.'

    // Auto-scroll to results after a brief delay
    setTimeout(() => {
      if (resultsSection.value) {
        resultsSection.value.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }, 500)
  } catch (err: any) {
    console.error('Optimization failed:', err)
    error.value = getErrorMessage(err)
  } finally {
    isLoading.value = false
    if (loadingInterval) clearInterval(loadingInterval)
    if (timeInterval) clearInterval(timeInterval)
  }
}

const handleRetry = () => {
  retryCount.value++
  optimizeResume()
}

const getErrorMessage = (err: any): string => {
  if (err.name === 'TimeoutError' || err.message?.includes('timeout')) {
    return 'The request took too long. Please try again with a shorter resume or job description.'
  }

  if (err.message?.includes('fetch')) {
    return 'Network connection error. Please check your internet connection and try again.'
  }

  if (err.message?.includes('500')) {
    return 'Server error. Our AI service might be temporarily unavailable. Please try again in a few minutes.'
  }

  return err.message || 'Something went wrong while optimizing your resume. Please try again.'
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(optimizedResume.value)
    //Could add a toast notification here
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
  }
}

onUnmounted(() => {
  if (loadingInterval) clearInterval(loadingInterval)
  if (timeInterval) clearInterval(timeInterval)
})
</script>
