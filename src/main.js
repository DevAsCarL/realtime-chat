import './assets/main.css'

import { createApp, defineComponent, h, ref } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
/*COMPONENTS*/
import ParticipantsChat from '@/components/molecules/ParticipantsChat.vue'
import BackButton from '@/components/molecules/BackButton.vue'
import TextChat from '@/components/molecules/TextChat.vue'
import WindowChat from '@/components/molecules/WindowChat.vue'
import InputChat from '@/components/molecules/InputChat.vue'
import HeaderChat from '@/components/molecules/HeaderChat.vue'
import UserChat from '@/components/molecules/UserChat.vue'
import LoginUsername from '@/components/molecules/LoginUsername.vue'
import OptionsRoom from '@/components/molecules/OptionsRoom.vue'
import CreateRoom from '@/components/molecules/CreateRoom.vue'
import JoinRoom from '@/components/molecules/JoinRoom.vue'
import ChatComponent from '@/components/ChatComponent.vue'

/*VALIDATOR*/
const ValidatorComponent = defineComponent(
  (props) => {
    const errorMessage = ref('')

    function validate() {
      if (props.validateField.length < 1 || props.validateField.value === null) {
        errorMessage.value = 'Rellene el campo necesario'
        return false
      }
      return true
    }

    return () => {
      return h(
        'p',
        {
          class: 'mt-3 text-xs text-red-400',
          'v-if': validate()
        },
        errorMessage.value
      )
    }
  },
  {
    props: {
      validateField: String || Number
    }
  }
)

/*VALIDATOR*/
app.component('ValidatorComponent', ValidatorComponent)
app.component('ParticipantsChat', ParticipantsChat)
app.component('TextChat', TextChat)
app.component('WindowChat', WindowChat)
app.component('InputChat', InputChat)
app.component('HeaderChat', HeaderChat)
app.component('UserChat', UserChat)
app.component('LoginUsername', LoginUsername)
app.component('OptionsRoom', OptionsRoom)
app.component('CreateRoom', CreateRoom)
app.component('JoinRoom', JoinRoom)
app.component('ChatComponent', ChatComponent)
app.component('BackButton', BackButton)

/*END COMPONENTS*/

app.mount('#app')
