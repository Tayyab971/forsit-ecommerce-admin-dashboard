// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { defineNuxtPlugin } from '#app'

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'



const firebaseConfig = {
    apiKey: "AIzaSyAAY3HypIosKNQuLe1SU90WsJuLCYsqiWQ",
    authDomain: "frosit-dashboard.firebaseapp.com",
    projectId: "frosit-dashboard",
    storageBucket: "frosit-dashboard.firebasestorage.app",
    messagingSenderId: "1032927292951",
    appId: "1:1032927292951:web:36fe55d58f8ed2339bb652",
    measurementId: "G-VKHDS2KJFZ"
};

const app = initializeApp(firebaseConfig);



export default defineNuxtPlugin((nuxtApp) => {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const firestore = getFirestore(app)
    const storage = getStorage(app)

})

export const firestore = getFirestore(app);
