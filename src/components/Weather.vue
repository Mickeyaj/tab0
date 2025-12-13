<template>
    <div class="bg-gray-800 rounded-lg p-4 text-white text-right">
        <div v-if="loading" class="text-gray-400">Loading...</div>
        <div v-else-if="error" class="text-gray-400 text-sm">{{ error }}</div>
        <div v-else>
            <div class="text-3xl font-light">{{ Math.round(weather.temp) }}</div>
            <div class="text-gray-400 text-sm">{{ weather.description }}</div>
            <div class="text-gray-400 text-sm">{{ weather.city }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'

    const API_KEY = '563610a5e9257db0493960452363b3a4'

    const loading = ref(true)
    const error = ref('')
    const weather = ref({
        temp: 0,
        description: '',
        city: ''
    })

    onMounted(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeather(position.coords.latitude, position.coords.longitude)
                },
                () => {
                    error.value = 'Location access denied'
                    loading.value = false
                }
            )
        } else {
            error.value = 'Geolocation not supported'
            loading.value = false
        }
    })

    async function fetchWeather(lat: number, lon: number) {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`
            console.log('Fetching', url)
            const response = await fetch(url)
            console.log('Response status:', response)
            const data = await response.json()
            console.log('Data:', data)
            weather.value = {
                temp: data.main.temp,
                description: data.weather[0].main,
                city: data.name
            }
        } catch (e) {
            console.log('Error:', e)
            error.value = 'Failed to load weather'
        } finally {
            loading.value = false
        }
    }
</script>