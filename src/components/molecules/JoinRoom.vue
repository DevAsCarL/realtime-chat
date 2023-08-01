<template>
  <BackButton @click="emit('return', 'toInputName')"></BackButton>
  <div class="mx-auto w-screen h-screen flex flex-col justify-center items-center">
      <div class="flex items-center max-w-md mx-auto bg-white rounded-lg border-2">
        <div class="w-full">
          <input
            type="Ingrese el id"
            class="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
            :class="isInvalid?'text-red-800':''"
            placeholder="search"
            v-model="search"
          />
        </div>
        <div>
          <button
            class="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg"
            :class="search.length > 0 ? 'bg-purple-500' : 'bg-gray-500 cursor-not-allowed'"
            :disabled="search.length == 0"
            @click="searchRoom"
          >
            <MagnifyingGlassIcon class="w-10 h-10" />
          </button>
        </div>
      </div>
      <small class="text-red-600 mx-auto" v-if="isInvalid">{{ errorMessage }}</small>
  </div>
</template>

<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'
import { getCurrentInstance, ref, useAttrs } from 'vue'
const search = ref('')
const isInvalid = ref(false)
const errorMessage = ref('')
const context = getCurrentInstance()
const emit = defineEmits(['searchRoom', 'return'])

function searchRoom() {
  emit('searchRoom', { search: search.value, context })
}
</script>

<style>
</style>