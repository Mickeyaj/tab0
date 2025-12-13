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
                    @change="toggleTask(task.id, task.completed)"
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
    import { ref, watch } from 'vue'
    import { db } from '@/firebase'
    import { useUserStore } from '@/stores/user'
    import {
        collection, addDoc, deleteDoc, updateDoc,
        doc, query, onSnapshot
    } from 'firebase/firestore'

    interface Task {
        id: string
        text: string
        completed: boolean
    }

    const userStore = useUserStore()
    const newTask = ref('')
    const tasks = ref<Task[]>([])

    watch(
        () => userStore.user,
        (user) => {
            if (!user) return

            const q = query(collection(db, 'users', user.uid, 'tasks'))

            onSnapshot(q, (snapshot) => {
                tasks.value = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Task[]
            })
        },
        { immediate: true }
    )

    async function addTask() {
        if (!newTask.value.trim() || !userStore.user) return

        await addDoc(collection(db, 'users', userStore.user.uid, 'tasks'), {
            text: newTask.value.trim(),
            completed: false
        })
        newTask.value = ''
    }

    async function toggleTask(id: string, currentStatus: boolean) {
        if (!userStore.user) return

        await updateDoc(doc(db, 'users', userStore.user.uid, 'tasks', id), {
            completed: !currentStatus
        })
    }

    async function deleteTask(id: string) {
        if (!userStore.user) return

        await deleteDoc(doc(db, 'users', userStore.user.uid, 'tasks', id))
    }
</script>