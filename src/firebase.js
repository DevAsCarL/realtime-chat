import { initializeApp } from 'firebase/app'
import { child, get, getDatabase, onValue, push, ref, set, update } from 'firebase/database'
import { useMessagesStore } from './stores/messages'

const firebaseConfig = {
  type: 'service_account',
  project_id: 'vuejs-chat-9fa60',
  private_key_id: 'ef5b57bef2d8bc044c0e0c1ebffa02b2f29b714e',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDNf+8lG32TV5Xr\nc7pjTe7M/zG3PMix4LNY48Gv8C+Tw54bJLNJcRKAA8Fb3upC7MjjGvJwIrA2vx1X\nOd36x91edG9cSbSyp2oSm0gbZenktKbmX6YNXxTBgGhQr92dJG4sYSDOcKgbOPe+\nep6G6w9h4YBP0r1SKKbkx7ypg5HwqHl7h+it3TOH6bGV+LXSDYGapQyTKnzXhgL3\n62KrRA4nQ1evr0S4X9MbbM6jRnWYVAP2S/G6ujfBWjaRQLJmSUI05EgVif1NeXIs\nrAiLDfvKnzYSdV6HhOyw4BQDsdYWBoczfAJ6C46qaORMaZVAahLPz2PBknkAjhwj\nEKqwav0nAgMBAAECggEAJNC/qjkzlRsC28y+3p2Oo6EwafB00BE+cDVVdMyl6WYJ\nRDmd+RFNzCtgD7Ju65B6KN2iA17jjNtOSVsvnocB7LMVZEY8HimKAk1ZbLckYPnQ\nUMNf/1NCZ6w2hAYNwOJO7pp0AygBpebd030qO2ePOOzqTOKnUjnANIpoDUJp+eAS\nkE77Bn47LPtcJOcLXw+41iSTqrhMrRei8J/7+pRnuBMcjZILz1/1aqxs7RYGO1Lr\nf/iozoQCc38HwO4NO5eOZ9T/SGKZfLR4g3xkMofBBBZ4Qxs6t2O/mLZvAosgbQbD\nmR8NQm3zBFy4ZtRoksYIpq412oPDp+mUoYBReMKlgQKBgQD0wrAjhGjqrBLoJUd+\nvbYIoZoTf8pxlxrZizisDPa4uOZlHZavqCSyJboTyLMwm4incQcVKKyxbegDe1NK\nYZWWDZSPKmgZpN+VZRvvtuBdmgE9oJ+1IUFLJjmlOCUgGRQqGyxeXPquxBvbXMUe\n8Jz1Xh08Ovuz3ZgcTfXC8YdnQQKBgQDW77YkJr61anf7CdbHAULevBeDrUSgtYVN\n1NtuEHsdjxgvoO5y4zBn38nk98WWBm2sel0RnZzoeetm9UTyERzl+Bjcc1gYvpok\nH3p5cZqJ2ayX4mA1MVuScXdG5PhV9dANbQbqqRuoZtzWRgikd3idkf2VmRZGl/So\nT0YOSxXyZwKBgQCUdiLw6DfbYFR3i2U6c0gfJCaY/UKGc+lNWy0c7yAYG89kNfZY\nxdy8UjX0GiDWswDIz75ED0/wr4Gz2vJCg76ALeyWilpqc59KtvGjDYI6RFfMUcmN\nzIYWVzFQDiY2uf+JKsJW2n8T0tAy1qqagcgy7Ms+5WgXSaoiQQd5H5fKAQKBgQCU\nb3/Of6N9DkZF7ImTbd+Mi0GCAos+oZ2qHrJb1K3xv/zoB7AlT5kCY56+rg6aiV38\nm5TisYLHWkukEwbGVeMrPqeMt2vDyv4QrFycukQLp3R2gDQJCElBXXMOVtraIqTI\nYN9B9//N0Rv6LuuRCaEW0NfcFJk5r3+bLQQootpJSQKBgG3j6eUnO+/QGdSx3TsD\nxapzLK4Kh7h3sLjcnRBVX8D8vgoCuTQNtgT8dsd7QWIOjZ55FMo/51BJZyIeYFbn\nbvIy/T5T3yR1uZxLMS5uZ/4PVtD8B5bJ56OEJ45aHiMzZJrbsjRkW6+teeRRgylb\nBTWQyrW+Ux5WKYLlBY3F1/rT\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-vrdkd@vuejs-chat-9fa60.iam.gserviceaccount.com',
  client_id: '116721970977093378833',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vrdkd%40vuejs-chat-9fa60.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
  databaseURL: 'https://vuejs-chat-9fa60-default-rtdb.firebaseio.com/'
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)

export async function saveMessage(room) {
  const oldMessages = await showRoom(room.id)
  update(ref(db, 'room/' + room.id), {
    messages: [
      ...oldMessages,
      {
        username: room.username,
        message: room.message
      }
    ]
  })
}

export async function saveRoom(room, context) {
  const store = useMessagesStore()
  const roomExist = await showRoom(room.id)
  if (roomExist) {
    context.errorMessage = 'La sala ya existe'
    context.isInvalid = true
    return false
  }
  set(ref(db, 'room/' + room.id), {
    messages: [
      {
        username: room.username,
        message: room.message
      }
    ]
  })
  store.isFound = true
  return true
}
export function showRoom(id) {
  return get(ref(db, `room/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val().messages
      }
    })
    .catch((error) => {
      return false
    })
}

export function watchChanges(id, context) {
  const store = useMessagesStore()
  onValue(ref(db, `room/${id}`), (snapshot) => {
    store.roomMessages = snapshot.val()?.messages
    if (store.roomMessages == null) {
      store.isFound = false
      context.isInvalid = true
      context.errorMessage = 'No se encontro la sala'
      return true
    }
    store.isFound = true
  })
}
// export function getMessage(message) {
//   const messagesRef = ref(db, 'posts/' + postId + '/starCount')
//   onValue(messagesRef, (snapshot) => {
//     const data = snapshot.val()
//     let messages = []

//     Object.keys(data).forEach((key) => {
//       messages.push({
//         id: key,
//         username: data[key].username,
//         content: data[key].content
//       })
//     })

//     state.messages = messages
//   })
// }
