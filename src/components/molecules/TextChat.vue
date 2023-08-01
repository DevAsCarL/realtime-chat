<template>
  <div class="flex items-end" :class="props.isCurrentUser ? 'justify-start flex-row-reverse' : ''">
    <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
      <div>
        <p>{{ props.username }}</p>
        <span
          class="px-4 py-2 rounded-lg inline-block text-neutral-50"
          :class="
            props.isCurrentUser ? 'rounded-br-none bg-blue-500' : 'rounded-bl-none bg-gray-500'
          "
          >{{ props.message }}</span
        >
      </div>
    </div>
    <UserCircleIcon class="w-6 h-6" />
  </div>
</template>

<script setup>
import { UserCircleIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  isCurrentUser: Boolean,
  message: String,
  username: String
})
</script>

<style>
</style>