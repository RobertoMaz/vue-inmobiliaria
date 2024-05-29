import { defineStore } from "pinia"
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"

export const useAuthStore = defineStore('auth', () => {

    const auth = useFirebaseAuth()
    const authUser = ref(null)
    const errorMensaje = ref('')
    const router = useRouter()

    const errorCodes = {
        'auth/invalid-credential': 'Error el usuario o contraseña incorrecto'
    }

    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            authUser.value = user
        })
    })

    function login({email, password}) {
        signInWithEmailAndPassword(auth, email, password)
            .then((credenciales) => {
                console.log(credenciales)
                const user = credenciales.user
                authUser.value = user
                router.push({name: 'admin-propiedades'})
            })
            .catch(error => errorMensaje.value = errorCodes[error.code])
    }

    function logout() {
        signOut(auth)
            .then(() => {
                authUser.value = null
                router.push({name: 'login'})
            })
            .catch(error => console.log(error))
    }

    const hasError = computed(() => {
        return errorMensaje.value
    })

    const isAuth = computed(() => {
        return authUser.value
    })

    return {
        hasError,
        errorMensaje,
        isAuth,
        login,
        logout
    }
})