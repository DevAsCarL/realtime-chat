<template>
  <div class="border-t-2 border-gray-200 px-4 py-4 mb-2 sm:mb-0 ">
    <div class="flex">
      <input
        type="text"
        v-model="message"
        placeholder="Escribe aquí.."
        class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2 bg-gray-200 rounded-md py-3"
      />
      <div class="mx-2 items-center sm:flex">
        <button
          @click="sendMessage"
          type="button"
          class="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
        >
          <span class="font-bold">Enviar</span>
          <PaperAirplaneIcon class="h-6 w-6 ml-2" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PaperAirplaneIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'
const message = ref()
const emit = defineEmits(['sendMessage'])
function sendMessage() {
  if (message.value === '' || message.value === null) {
    return
  }
  emit('sendMessage', message.value)
  message.value = ''
}
</script>

<style>
</style>