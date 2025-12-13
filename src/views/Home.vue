<template>
    <div class="min-h-screen bg-gray-900 text-white p-4 relative">
        <div class="absolute top-4 left-4">
            <TodoList />
        </div>
        <div class="absolute top-4 right-4">
            <Weather />
        </div>
        <div class="flex flex-col items-center justify-center min-h-screen">
            <Greeting />
            <div class="mt-8">
                <SearchBar />
            </div>
            <div class="mt-4">
                <QuickLinks />
            </div>
        </div>
        <!-- <button @click="logout" class="absolute top-4 right-4 px-4 py-2 bg-red-500 rounded">
            Sign out
        </button> -->
    </div>
</template>

<script setup lang="ts">
    import { watch } from 'vue'
    import { useRouter } from 'vue-router'
    import { useUserStore } from '@/stores/user'
    import Greeting from '@/components/Greeting.vue'
    import SearchBar from '@/components/SearchBar.vue'
    import QuickLinks from '@/components/QuickLinks.vue'
    import TodoList from '@/components/TodoList.vue'
    import Weather from '@/components/Weather.vue'

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