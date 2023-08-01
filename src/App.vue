<template>
  <section>
    <div v-if="(state.id === '' || state.id === null) && !isLogging">
      <LoginUsername @login="Login" />
    </div>
    <div v-if="!isJoinRoom && !isCreateRoom && isLogging">
      <OptionsRoom
        @isCreateRoom=";(isCreateRoom = true), (isJoinRoom = false)"
        @isJoinRoom=";(isCreateRoom = false), (isJoinRoom = true)"
        @return="makeReturn"
      />
    </div>
    <div v-if="!store.isFound">
      <div v-if="isCreateRoom">
        <CreateRoom @createRoom="createRoom" @return="makeReturn" />
      </div>
      <div v-if="isJoinRoom">
        <JoinRoom @searchRoom="searchRoom" @return="makeReturn" />
      </div>
    </div>

    <div class="bg-white-100" v-if="store.isFound">
      <ChatComponent
        class="bg-white-100"
        @sendMessage="sendMessage"
        @roomExit="roomExit"
        :identifier="state.id.toString()"
      />
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { onValue } from 'firebase/database'
import { saveMessage, saveRoom, showRoom, db, watchChanges } from './firebase'
import { useMessagesStore } from './stores/messages'

const store = useMessagesStore()
const isLogging = ref(false)
const isCreateRoom = ref(false)
const isJoinRoom = ref(false)
const state = reactive({
  id: '',
  username: null,
  messages: []
})
function Login(username) {
  isLogging.value = true
  state.username = username
}

function roomExit() {
  isLogging.value = true
  isCreateRoom.value = false
  isJoinRoom.value = false
  store.isFound = false
  state.id = ''
  state.username = null
  state.messages = []
}

async function createRoom({ id, context }) {
  if (id.length <= 4) {
    context.isInvalid = true
    context.errorMessage = 'El id de sala debe tener al menos 4 dígitos'
    return 
  }
  const room = {
    id: (state.id = id),
    username: state.username,
    message: 'Sala creada!'
  }
  const isSaved = await saveRoom(room, context)
  if (isSaved) {
    isCreateRoom.value = true
  }
}

function sendMessage(message) {
  const newMessage = {
    id: state.id,
    username: state.username,
    message: message
  }
  saveMessage(newMessage)
}

function searchRoom({ search: id, context: { setupState } }) {
  state.id = id
  watchChanges(id, setupState)
}
function makeReturn(action) {
  isLogging.value = false
  isCreateRoom.value = false
  isJoinRoom.value = false
  store.isFound = false
  switch (action) {
    case 'toInputName':
      isLogging.value = false
      break
    case 'toOptionsRoom':
      isLogging.value = true
      break
    default:
      break
  }
}
</script>
<style scoped>
</style>
