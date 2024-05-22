import { defineStore } from "pinia"
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {

    const auth = useFirebaseAuth()


    const login = () => {

    }

    return {
        login,

    }
})