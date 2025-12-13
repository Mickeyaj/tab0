<template>
    <div class="w-full max-w-xl">
        <button
        @click="isOpen = !isOpen"
        class="text-gray-400 hover:text-white transition flex items-center gap-2 mx-auto"
        >
            <span>Quick Links</span>
            <span clas="text-sm">{{  isOpen ? '▲' : '▼' }}</span>
        </button>

        <div v-if="isOpen" class="mt-4 flex flex-wrap justify-center gap-3">
            <a
            v-for="link in links"
            :key="link.id"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition text-white"
            >
                {{ link.name }}
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    const isOpen = ref(false)

    const links = ref([
        { id: '1', name: 'Github', url: 'https://github.com' },
        { id: '2', name: 'Youtube', url: 'https://youtube.com' },
        { id: '3', name: 'Gmail', url: 'https://mail.google.com'},
    ])
</script>