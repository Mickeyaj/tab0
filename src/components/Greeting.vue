<template>
    <div class="text-container">
        <h1 class="text-4xl font-light text-white mb-2">
            {{  greeting }}, {{ displayName }}
        </h1>
        <p class="text-6xl font-light text-white">
            {{  currentTime }}
        </p>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted } from 'vue'
    import { useUserStore } from '@/stores/user'

    const userStore = useUserStore()

    const now = ref(new Date())
    let timer: number

    onMounted(() => {
        timer = window.setInterval(() => {
            now.value = new Date()
        }, 1000)
    })

    onUnmounted(() => {
        clearInterval(timer)
    })

    const displayName = computed(() => {
        const fullName = userStore.user?.displayName || 'User'
        return fullName.split(' ')[0]
    })

    const currentTime = computed(() => {
        return now.value.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        })
    })

    const greeting = computed(() => {
        const hour = now.value.getHours()
        if (hour < 12) return 'Good morning'
        if (hour > 18) return 'Good afternoon'
        return 'Good evening'
    })
</script>