<template>
  <BackButton @click="emit('return', 'toOptionsRoom')"></BackButton>
  <div class="mx-auto w-screen h-screen flex flex-col justify-center items-center">
    <div class="flex items-center max-w-md mx-auto bg-white rounded-lg border-2">
      <div class="w-full">
        <input
          type="text"
          class="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
          :class="isInvalid ? 'text-red-800' : 'text-gray-800'"
          placeholder="ingrese un id de sala"
          v-model="idSala"
        />
      </div>

      <div>
        <button
          v-if="!isClicked"
          type="button"
          class="flex items-center bg-blue-500 justify-center w-12 h-12 rounded-r-lg text-white"
          @click="
            emit('createRoom', { id: idSala, context: context.setupState }), (isClicked = true)
          "
        >
          Crear
        </button>
        <button
          v-else
          type="button"
          class="flex items-center bg-blue-500 justify-center w-12 h-12 rounded-r-lg text-white"
          disabled
        >
          <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
            <!-- ... -->
          </svg>
          Processing...
        </button>
      </div>
    </div>
    <small class="text-red-600 mx-auto" v-if="isInvalid">{{ errorMessage }}</small>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue'
const idSala = ref('')
const isClicked = ref(false)
const isInvalid = ref(false)
const errorMessage = ref('')
const context = getCurrentInstance()
const emit = defineEmits(['createRoom', 'return'])
</script>

<style>
</style>