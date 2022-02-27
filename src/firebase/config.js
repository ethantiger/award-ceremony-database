import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAmvQ30yX9_U5XE4M2eWx0Dbc1K-eEdww0",
    authDomain: "awards-database-51290.firebaseapp.com",
    projectId: "awards-database-51290",
    storageBucket: "awards-database-51290.appspot.com",
    messagingSenderId: "525395492607",
    appId: "1:525395492607:web:85fe7b5ae3f7a113f096ca"
  };

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth()

export { db, auth }