<template>
  <div class="bg-white rounded-2xl shadow-xl border-l-4 border-red-500 p-6 mb-8">
    <div class="flex items-start space-x-4">
      <!-- Error Icon -->
      <div class="flex-shrink-0">
        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="errorType === 'network'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
            <path
              v-else-if="errorType === 'timeout'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              v-else-if="errorType === 'server'"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      <!-- Error Content -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-lg font-semibold text-red-800">{{ errorTitle }}</h3>
          <button
            v-if="canRetry"
            @click="handleRetry"
            :disabled="isRetrying"
            class="text-sm bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <span v-if="isRetrying" class="flex items-center">
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
              Retrying...
            </span>
            <span v-else>Try Again</span>
          </button>
        </div>

        <p class="text-red-700 mb-4">{{ message }}</p>

        <!-- Helpful Suggestions -->
        <div class="bg-red-50 rounded-lg p-4 mb-4">
          <h4 class="text-sm font-medium text-red-800 mb-2">💡 Helpful suggestions:</h4>
          <ul class="text-sm text-red-700 space-y-1">
            <li v-for="suggestion in suggestions" :key="suggestion" class="flex items-start">
              <span class="text-red-500 mr-2">•</span>
              {{ suggestion }}
            </li>
          </ul>
        </div>

        <!-- Technical Details (Collapsible) -->
        <div v-if="showTechnicalDetails">
          <button
            @click="technicalDetailsExpanded = !technicalDetailsExpanded"
            class="flex items-center text-sm text-red-600 hover:text-red-800 transition-colors duration-200"
          >
            <svg
              class="w-4 h-4 mr-1 transition-transform duration-200"
              :class="{ 'transform rotate-90': technicalDetailsExpanded }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
            {{ technicalDetailsExpanded ? 'Hide' : 'Show' }} technical details
          </button>

          <div
            v-if="technicalDetailsExpanded"
            class="mt-2 p-3 bg-gray-100 rounded text-xs text-gray-600 font-mono"
          >
            <div><strong>Error:</strong> {{ originalError }}</div>
            <div v-if="timestamp"><strong>Time:</strong> {{ timestamp }}</div>
            <div v-if="userAgent"><strong>Browser:</strong> {{ userAgent }}</div>
          </div>
        </div>

        <!-- Retry Counter -->
        <div v-if="(retryCount ?? 0) > 0" class="mt-3 text-xs text-gray-500">
          Attempt {{ (retryCount ?? 0) + 1 }} of {{ maxRetries ?? 3 }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Props
const props = defineProps<{
  message: string
  originalError?: string
  canRetry?: boolean
  retryCount?: number
  maxRetries?: number
}>()

// Emits
const emit = defineEmits<{
  retry: []
}>()

// Reactive state
const isRetrying = ref(false)
const technicalDetailsExpanded = ref(false)
const timestamp = ref(new Date().toLocaleString())
const userAgent = ref(navigator.userAgent)

// Computed properties
const errorType = computed(() => {
  const message = props.message.toLowerCase()
  if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
    return 'network'
  }
  if (message.includes('timeout') || message.includes('time out')) {
    return 'timeout'
  }
  if (message.includes('server') || message.includes('500') || message.includes('503')) {
    return 'server'
  }
  return 'general'
})

const errorTitle = computed(() => {
  switch (errorType.value) {
    case 'network':
      return 'Connection Problem'
    case 'timeout':
      return 'Request Timed Out'
    case 'server':
      return 'Server Error'
    default:
      return 'Optimization Failed'
  }
})

const suggestions = computed(() => {
  switch (errorType.value) {
    case 'network':
      return [
        'Check your internet connection',
        'Try refreshing the page',
        'Disable any VPN or proxy temporarily',
        'Contact support if the problem persists',
      ]
    case 'timeout':
      return [
        'Your request is taking longer than expected',
        'Try with a shorter resume or job description',
        'Check your internet connection speed',
        'Wait a moment and try again',
      ]
    case 'server':
      return [
        'Our servers are experiencing high load',
        'Try again in a few minutes',
        'Check our status page for updates',
        'Contact support if this continues',
      ]
    default:
      return [
        'Make sure your resume and job description have content',
        'Try using a different format for your resume',
        'Contact support with the details below',
        'Check that all required fields are filled',
      ]
  }
})

const showTechnicalDetails = computed(() => {
  return props.originalError && props.originalError !== props.message
})

// Methods
const handleRetry = async () => {
  isRetrying.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Small delay for UX
    emit('retry')
  } finally {
    isRetrying.value = false
  }
}
</script>
