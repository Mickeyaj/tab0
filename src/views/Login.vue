<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-900">
        <div class="bg-gray-800 p-8 rounded-lg shadow-md text-center">
            <h1 class="text-3xl font-bold text-white mb-6">Tab0</h1>
            <button @click="loginWithGoogle" class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                Sign in with Google
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useUserStore } from '@/stores/user'
    import { watch } from 'vue'
    import { useRouter } from 'vue-router'

    const router = useRouter()
    const userStore = useUserStore()
    const { loginWithGoogle } = useUserStore()
    watch(() => userStore.user, (newUser) => {
        if (newUser) {
            router.push('/')
        }
    }, { immediate: true })
</script>