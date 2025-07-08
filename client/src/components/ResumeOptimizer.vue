<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Alignly</h1>
      <p class="text-gray-600">AI-powered resume optimization for job applications</p>
    </div>

    <!-- Input Form -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="resume" class="block text-sm font-medium text-gray-700 mb-2">
            Your Resume
          </label>
          <textarea
            id="resume"
            v-model="formData.resume"
            rows="12"
            placeholder="Paste your resume content here..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label for="jobDescription" class="block text-sm font-medium text-gray-700 mb-2">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            v-model="formData.jobDescription"
            rows="8"
            placeholder="Paste the job description here..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="loading || !formData.resume.trim() || !formData.jobDescription.trim()"
          class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {{ loading ? 'Optimizing Resume...' : 'Generate Optimized Resume' }}
        </button>
      </form>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      <p class="mt-2 text-gray-600">Analyzing your resume and job description...</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="bg-red-50 border border-red-200 rounded-md p-4 mb-8">
      <div class="flex">
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error</h3>
          <div class="mt-2 text-sm text-red-700">
            {{ error }}
          </div>
        </div>
      </div>
    </div>

    <!-- Results -->
    <div v-if="results && !loading" class="space-y-8">
      <!-- Optimized Resume -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Optimized Resume</h2>
        <div class="bg-gray-50 rounded-md p-4">
          <pre class="whitespace-pre-wrap text-sm text-gray-700 font-mono">{{
            results.rewrittenResume
          }}</pre>
        </div>
      </div>

      <!-- Extracted Sections -->
      <div v-if="results.sections.length > 0" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Extracted Resume Sections</h2>
        <div class="space-y-3">
          <div
            v-for="(section, index) in results.sections"
            :key="index"
            class="bg-blue-50 rounded-md p-3"
          >
            <p class="text-sm text-gray-700">{{ section }}</p>
          </div>
        </div>
      </div>

      <!-- Suggestions -->
      <div v-if="results.suggestions" class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Improvement Suggestions</h2>
        <div class="bg-yellow-50 rounded-md p-4">
          <pre class="whitespace-pre-wrap text-sm text-gray-700">{{ results.suggestions }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { resumeService } from '@/services/resumeService'
import type { GenerateResumeResponse } from '@/types/api'

const loading = ref(false)
const error = ref<string | null>(null)
const results = ref<GenerateResumeResponse | null>(null)

const formData = reactive({
  resume: '',
  jobDescription: '',
})

const handleSubmit = async () => {
  loading.value = true
  error.value = null
  results.value = null

  try {
    const response = await resumeService.generateOptimizedResume({
      resume: formData.resume,
      jobDescription: formData.jobDescription,
    })

    results.value = response
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An unexpected error occurred'
  } finally {
    loading.value = false
  }
}
</script>
