<template>
  <div class="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
    <div class="flex flex-col items-center space-y-6">
      <!-- Main Loading Icon -->
      <div class="relative">
        <div
          class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg"
        >
          <svg
            class="w-10 h-10 text-white"
            :class="{ 'animate-pulse': currentStep >= 0 }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>

        <!-- Animated Ring -->
        <div class="absolute inset-0">
          <svg class="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="currentColor"
              stroke-width="4"
              fill="none"
              class="text-gray-200"
            />
            <circle
              cx="40"
              cy="40"
              r="36"
              stroke="currentColor"
              stroke-width="4"
              fill="none"
              stroke-linecap="round"
              class="text-blue-500 transition-all duration-1000 ease-out"
              :stroke-dasharray="`${progressPercentage * 2.26} 226`"
              :stroke-dashoffset="0"
            />
          </svg>
        </div>
      </div>

      <!-- Progress Steps -->
      <div class="text-center space-y-4 w-full max-w-md">
        <h3 class="text-2xl font-bold text-gray-900">{{ currentStepData.title }}</h3>
        <p class="text-gray-600 text-lg">{{ currentStepData.description }}</p>

        <!-- Time Indicator -->
        <div class="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ timeElapsed }}s elapsed</span>
        </div>

        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            class="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>

        <!-- Step Indicators -->
        <div class="flex justify-center space-x-4 mt-6">
          <div v-for="(step, index) in steps" :key="index" class="flex items-center space-x-2">
            <div
              :class="[
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300',
                index < currentStep
                  ? 'bg-green-500 text-white'
                  : index === currentStep
                    ? 'bg-blue-500 text-white animate-pulse'
                    : 'bg-gray-200 text-gray-500',
              ]"
            >
              <svg
                v-if="index < currentStep"
                class="w-4 h-4"
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
              <span v-else>{{ index + 1 }}</span>
            </div>
            <span
              v-if="index < steps.length - 1"
              :class="[
                'w-8 h-0.5 transition-colors duration-300',
                index < currentStep ? 'bg-green-500' : 'bg-gray-200',
              ]"
            ></span>
          </div>
        </div>
      </div>

      <!-- Fun Loading Messages -->
      <div class="text-center">
        <p class="text-sm text-blue-600 font-medium animate-pulse">
          {{ randomTip }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps<{
  currentStep: number
}>()

// Loading steps configuration
const steps = [
  {
    title: 'Analyzing Resume',
    description: 'Understanding your background and experience...',
  },
  {
    title: 'Processing Job Description',
    description: 'Identifying key requirements and keywords...',
  },
  {
    title: 'AI Optimization',
    description: 'Tailoring your resume with intelligent matching...',
  },
  {
    title: 'Finalizing Results',
    description: 'Generating your optimized resume and insights...',
  },
]

// Timer and progress
const startTime = ref(Date.now())
const timeElapsed = ref(0)
const timer = ref<number>()

// Fun loading tips
const loadingTips = [
  '💡 Pro tip: Use action verbs to make your resume more impactful!',
  '🎯 Tailoring your resume increases interview chances by 40%',
  '⚡ Our AI analyzes 50+ optimization factors in seconds',
  '📈 Quantified achievements get 3x more attention from recruiters',
  "🔍 Keywords are crucial - we're making sure you have the right ones!",
  '✨ Your optimized resume will stand out from the crowd',
  '🚀 Great things take time - this optimization is worth it!',
]

const randomTip = ref(loadingTips[Math.floor(Math.random() * loadingTips.length)])

// Computed properties
const currentStepData = computed(() => {
  const stepIndex = Math.max(0, Math.min(props.currentStep, steps.length - 1))
  return steps[stepIndex]
})

const progressPercentage = computed(() => {
  const progress = ((props.currentStep + 1) / steps.length) * 100
  return Math.min(progress, 100)
})

// Timer logic
onMounted(() => {
  timer.value = setInterval(() => {
    timeElapsed.value = Math.floor((Date.now() - startTime.value) / 1000)

    // Change tip every 8 seconds
    if (timeElapsed.value % 8 === 0) {
      randomTip.value = loadingTips[Math.floor(Math.random() * loadingTips.length)]
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
})
</script>
