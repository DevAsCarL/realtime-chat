<template>
  <div class="flex justify-center items-center py-3 border-b-2 border-gray-200">
        GRUPO N°{{props.identifier}}
  </div>
</template>

<script setup>
const props = defineProps({
  identifier: String
})
</script>

<style scoped>
</style>