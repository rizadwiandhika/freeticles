// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// TODO: jangan ignore .env ??
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'mini-project-alterra.firebaseapp.com',
  projectId: 'mini-project-alterra',
  storageBucket: 'mini-project-alterra.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const storage = getStorage(app)
const storageRef = ref(storage)

// TODO: implementasi upload loading status
async function uploadImage(username = 'default', file) {
  try {
    const fileName = Date.now() + file.name
    const filePath = ref(storageRef, `public/images/${username}/${fileName}`)
    const result = await uploadBytes(filePath, file)
    const url = await getDownloadURL(result.ref)
    return [url, null]
  } catch (error) {
    return [null, error.message]
  }
}

export { uploadImage }
