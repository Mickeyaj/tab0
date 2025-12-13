<template>
    <div class="relative">
        <button
            @click="isOpen = !isOpen"
            class="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 transition flex items-center justif-center overflow-hidden"
        >
            <img
                v-if="userStore.user?.photoURL"
                :src="userStore.user.photoURL"
                alt="Profile"
                class="w-full h-full object-cover"
            />
            <span v-else class="text-white text-sm">
                {{ userStore.user?.displayName?.charAt(0) || '?' }}
            </span>
        </button>

        <div v-if="isOpen" class="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-50">
            <div class="px-4 py-2 border-b border-gray-700">
                <p class="text-white text-sm font-medium truncate">
                    {{ userStore.user?.displayName }}
                </p>
                <p class="text-gray-400 text-xs truncate">
                    {{ userStore.user?.email }}
                </p>
            </div>
            <button
                @click="handleSignOut"
                class="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 transition text-sm">
                Sign Out
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { useUserStore } from '@/stores/user'

    const userStore = useUserStore()
    const isOpen = ref(false)

    async function handleSignOut() {
        isOpen.value = false
        await userStore.logout()
    }
</script>