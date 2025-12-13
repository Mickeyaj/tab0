import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/firebase'
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    type User
} from 'firebase/auth'

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null)

    const isLoading = ref(true)

    onAuthStateChanged(auth, (newUser) => {
        user.value = newUser
        isLoading.value = false
    })

    async function loginWithGoogle() {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)
    }

    async function logout() {
        await signOut(auth)
    }

    return {
        user, isLoading, loginWithGoogle, logout
    }
})