<template>
  <header class="bg-white border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-6">
        <!-- Logo and Brand -->
        <div class="flex items-center space-x-3">
          <div
            class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
          >
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Alignly</h1>
            <p class="text-sm text-gray-500 -mt-1">AI Resume Optimizer</p>
          </div>
        </div>

        <!-- Navigation Links (Future) -->
        <nav class="hidden md:flex items-center space-x-8">
          <a
            href="#"
            class="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
          >
            How it works
          </a>
          <a
            href="#"
            class="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
          >
            Examples
          </a>
          <a
            href="#"
            class="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
          >
            Pricing
          </a>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// Modern header component - no complex logic needed for now
</script>
