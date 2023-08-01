import { computed, ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'

export const useMessagesStore = defineStore('messages', () => {
  const roomMessages = ref([])
  const currentUser = ref(null)
  const isFound = ref(false)
  const roomUsers = computed(() => {
    return new Set(roomMessages.value.map((message) => message.username).concat(currentUser.value))
  })
  // watchEffect(() => {
  //   roomUsers.value = new Set(roomMessages.value.map((message) => message.username))
  // })
  return { roomMessages, currentUser, roomUsers }
})
