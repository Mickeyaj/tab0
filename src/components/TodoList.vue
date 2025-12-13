<template>
    <div class="bg-gray-800 rounded-lg p-4 w-72 max-h-80 overflow-y-auto">
        <h2 class="text-white font-semibold mb-3">Tasks</h2>

        <div class="flex gap-2 mb-3">
            <input
                v-model="newTask"
                @keydown.enter="addTask"
                type="text"
                placeholder="Add a task"
                class="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500 text-sm"
            >
            </input>
            <button
                @click="addTask"
                class="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
            >
            Add
            </button>
        </div>

        <ul class="space-y-2">
            <li
                v-for="task in tasks"
                :key="task.id"
                class="flex items-center gap-2 text-white"
            >
                <input
                    type="checkbox"
                    :checked="task.completed"
                    @change="toggleTask(task.id)"
                    class="w-4 h-4"
                >
                </input>
                <span :class="{ 'line-through text-gray-500': task.completed }">
                        {{ task.text }}
                </span>
                <button
                    @click="deleteTask(task.id)"
                    class="ml-auto text-gray-500 hover:text-red-500 transition"
                > x
                </button>
            </li>
        </ul>
        <p v-if="tasks.length === 0" class="text-gray-500 text-sm">
            No tasks yet
        </p>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'

    interface Task {
        id: string
        text: string
        completed: boolean
    }

    const newTask = ref('')
    const tasks = ref<Task[]>([])

    function addTask() {
        if (newTask.value.trim()) {
            tasks.value.push({
                id: Date.now().toString(),
                text: newTask.value.trim(),
                completed: false
            })
            newTask.value= ''
        }
    }

    function toggleTask(id: string) {
        const task = tasks.value.find(t => t.id === id)
        if (task) {
            task.completed = !task.completed
        }
    }

    function deleteTask(id: string) {
        tasks.value = tasks.value.filter(t => t.id !== id)
    }
</script>