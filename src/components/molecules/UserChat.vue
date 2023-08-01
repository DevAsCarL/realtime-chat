<template>
  <div class="flex items-center gap-2 mx-5 my-4">
    <span class="rounded-full outline outline-5 outline-green-500 w-auto">
      <UserCircleIcon class="w-10 h-10" />
    </span>
    <div class="flex flex-col">
      <div class="text-sm mt-1 flex items-center">
        <span class="text-gray-700">{{props.username}}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { UserCircleIcon } from '@heroicons/vue/24/solid'
const props = defineProps({
  username: String
})
</script>

<style>
</style>