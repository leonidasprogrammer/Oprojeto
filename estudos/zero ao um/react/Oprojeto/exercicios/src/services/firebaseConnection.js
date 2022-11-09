import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCTFGdmUY9QCd6cd58IufG8jKR1zZJnJhQ',
  authDomain: 'teste-sistemas-8497e.firebaseapp.com',
  projectId: 'teste-sistemas-8497e',
  storageBucket: 'teste-sistemas-8497e.appspot.com',
  messagingSenderId: '1033149488641',
  appId: '1:1033149488641:web:a388e6941d275bdbcb2a00',
  measurementId: 'G-B0ZWQ7N39S'
}

// Initialize Firebase

const fireConnection = initializeApp.length && initializeApp(firebaseConfig)
const db = getFirestore()
const auth = getAuth()

export { fireConnection, db, auth }
