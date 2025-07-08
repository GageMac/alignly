<template>
  <div class="bg-white rounded-xl border border-gray-100 p-6 mb-8">
    <div class="flex items-center justify-between">
      <div v-for="(step, index) in steps" :key="index" class="flex items-center">
        <!-- Step Circle -->
        <div
          class="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
          :class="getStepClasses(index)"
        >
          <svg
            v-if="isCompleted(index)"
            class="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span
            v-else
            class="text-sm font-semibold"
            :class="isActive(index) ? 'text-white' : 'text-gray-400'"
          >
            {{ index + 1 }}
          </span>
        </div>

        <!-- Step Label -->
        <div class="ml-3 hidden sm:block">
          <p
            class="text-sm font-medium transition-colors duration-300"
            :class="isActiveOrCompleted(index) ? 'text-gray-900' : 'text-gray-400'"
          >
            {{ step.title }}
          </p>
          <p class="text-xs text-gray-500">{{ step.description }}</p>
        </div>

        <!-- Connector Line -->
        <div
          v-if="index < steps.length - 1"
          class="hidden sm:flex w-16 h-px mx-6 transition-colors duration-300"
          :class="isCompleted(index) ? 'bg-blue-500' : 'bg-gray-200'"
        ></div>
      </div>
    </div>

    <!-- Mobile Step Labels -->
    <div class="sm:hidden mt-4">
      <p class="text-sm font-medium text-gray-900">{{ steps[currentStep].title }}</p>
      <p class="text-xs text-gray-500">{{ steps[currentStep].description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Using inline SVG instead of Heroicons to avoid extra dependencies

interface Step {
  title: string
  description: string
}

interface Props {
  currentStep: number
}

const props = defineProps<Props>()

const steps: Step[] = [
  { title: 'Upload Resume', description: 'PDF, DOCX, or paste text' },
  { title: 'Job Description', description: 'Paste the target job posting' },
  { title: 'AI Optimization', description: 'Let AI enhance your resume' },
  { title: 'Download', description: 'Get your optimized resume' },
]

const isCompleted = (stepIndex: number): boolean => {
  return stepIndex < props.currentStep
}

const isActive = (stepIndex: number): boolean => {
  return stepIndex === props.currentStep
}

const isActiveOrCompleted = (stepIndex: number): boolean => {
  return stepIndex <= props.currentStep
}

const getStepClasses = (stepIndex: number): string => {
  if (isCompleted(stepIndex)) {
    return 'bg-blue-500 text-white'
  } else if (isActive(stepIndex)) {
    return 'bg-blue-500 text-white'
  } else {
    return 'bg-gray-100 text-gray-400'
  }
}
</script>
