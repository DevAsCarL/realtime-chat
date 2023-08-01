<template>
  <div class="flex justify-center items-center mx-auto w-screen h-screen">
    <form class="login-form w-[25%]" @submit.prevent="Login"  >
      <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        <div class="px-5 py-7">
          <label for="username" class="font-semibold text-sm text-gray-600 pb-1 block"
            >Username</label
          >
          <input
            type="text"
            class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
            v-model="username"
          />
          <input
            type="submit"
            value="Ingresar"
            class="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMessagesStore } from '../../stores/messages'

const store = useMessagesStore()
const username = ref()

const emit = defineEmits(['login'])

function Login() {
  if (username.value.length > 0 && username.value !== null) {
    store.currentUser = username.value
    emit('login', username.value)
    username.value = ''
  }
}
</script>

<style scoped>
</style>