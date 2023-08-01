<template>
  <section >
    <UserChat v-for="(user, index) in store.roomUsers" :key="index" :username="user" />
  </section>
</template>

<script setup>
import { useMessagesStore } from '../../stores/messages'

const store = useMessagesStore()
</script>

<style>
</style>