<template>
    <div class="w-full max-w-xl">
        <input
        v-model="searchQuery"
        @keydown.enter="search"
        type="text"
        placeholder="Search Google..."
        class="w-full px-6 py-3 bg-gray-800 text-white rounded-full border border-gray-700 focus:outline-none focus:border-blue-500 text-lg"
        >
        </input>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    const searchQuery = ref('')

    function search() {
        if (searchQuery.value.trim()) {
            const query = encodeURIComponent(searchQuery.value.trim())
            window.location.href = `https://www.google.com/search?q=${query}`
        }
    }
</script>