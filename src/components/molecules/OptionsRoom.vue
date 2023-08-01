<template>
  <BackButton @click="emit('return', 'toInputName')"></BackButton>
  <div class="flex flex-col justify-center items-center mx-auto w-screen h-screen">
    <button
      class="group relative h-12 w-48 overflow-hidden rounded-lg bg-white text-lg shadow"
      @click="emit('isCreateRoom')"
    >
      <div
        class="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"
      ></div>
      <span class="relative text-black group-hover:text-white">Crear Sala</span>
    </button>
    <a
      href="#"
      class="mt-6 text-base leading-none focus:outline-none hover:border-gray-800 focus:border-gray-800 border-b border-transparent text-center text-gray-800"
      @click.prevent="emit('isJoinRoom')"
      >Unirse a una Sala</a
    >
  </div>
</template>

<script setup>
const emit = defineEmits(['isJoinRoom', 'isCreateRoom', 'return'])
</script>

<style>
</style>