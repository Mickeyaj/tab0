<template>
    <div class="min-h-screen bg-gray-900 text-white p-4">
        <h1>Welcome to Tab0</h1>
        <button @click="logout" class="mt-4 px-4 py-2 bg-red-500 rounded">
            Sign out
        </button>
    </div>
</template>

<script setup lang="ts">
    import { watch } from 'vue'
    import { useRouter } from 'vue-router'
    import { useUserStore } from '@/stores/user'

    const router = useRouter()
    const userStore = useUserStore()

    const { logout } = userStore

    watch(
    () => ({ user: userStore.user, isLoading: userStore.isLoading }),
    ({ user, isLoading}) => {
        if (!isLoading && !user) {
            router.push('/login')
        }
    },
    { immediate: true }
    )
</script>