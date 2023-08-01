<template>
  <div
    id="messages"
    class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch max-h-[400px]"
  >
    <TextChat
      v-for="({ message, username }, index) in store.roomMessages"
      :key="index"
      :isCurrentUser="store.currentUser == username"
      :message="message"
      :username="username"
    />
  </div>
</template>

<script setup>
import { useMessagesStore } from '../../stores/messages'

const store = useMessagesStore()
</script>

<style>
</style>