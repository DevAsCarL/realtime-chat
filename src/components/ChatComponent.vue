<template>
  <main class="flex flex-col w-[50%] mx-auto my-5 border-gray-300 rounded-lg border-2">
    <HeaderChat :identifier="props.identifier" class="border border-gray-300" />
    <span class="flex">
      <section class="flex justify-end flex-col h-100 grow">
        <WindowChat class="border border-gray-300 grow" />
        <InputChat @sendMessage="sendMessage" class="border border-gray-300" />
      </section>
      <aside class="flex flex-col">
        <span class="flex flex-row h-80">
          <ParticipantsChat class="border border-gray-300" />
        </span>
        <span class="h-20 flex justify-center items-center">
          <button
            @click="$emit('roomExit')"
            class="flex gap-1 justify-center items-center font-semibold rounded-lg bg-red-600 text-white w-20 h-8 hover:bg-red-400"
          >
            <XMarkIcon class="h-4 w-4" />Salir
          </button>
        </span>
      </aside>
    </span>
  </main>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid'
import { onMounted, ref, watch, watchEffect } from 'vue'
import { watchChanges } from '../firebase'
const props = defineProps({
  identifier: String
})

const emit = defineEmits(['sendMessage','roomExit'])
function sendMessage(message) {
  emit('sendMessage', message)
}

onMounted(() => {
  watchChanges(props.identifier)
})
</script>

<style>
</style>