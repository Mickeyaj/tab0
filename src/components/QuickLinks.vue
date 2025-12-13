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
                <button
                    @click.prevent="deleteLink(link.id)"
                    class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white group relative"
                >
                    x
                </button>
            </a>
            <div v-if="showAddForm" class="flex gap-2 justify-center">
                <input
                    v-model="newLinkName"
                    type="text"
                    placeholder="Name"
                    class="px-3 py-1 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 text-sm w-24"
                ></input>
                <input
                    v-model="newLinkUrl"
                    type="text"
                    placeholder="https://..."
                    class="px-3 py-1 bg-gray-800 text-white rounded border border-gray-700 focus:outline-none focus:border-blue-500 text-sm w-40"
                ></input>
                <button
                    @click="addLink"
                    class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                >
                    Add
                </button>
                <button
                    @click="showAddForm = false"
                    class="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition text-sm"
                >
                    Cancel
                </button>
            </div>
            <button
                v-else
                @click="showAddForm = true"
                class="block mx-auto text-gray-500 hover:text-white transition text-sm"
            >
                + Add Link
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue'
    import { db } from '@/firebase'
    import { useUserStore } from '@/stores/user'
    import {
        collection, addDoc, deleteDoc, doc, query, onSnapshot
    } from 'firebase/firestore'

    interface Link {
        id: string
        name: string
        url: string
    }

    const isOpen = ref(false)
    const userStore = useUserStore()
    const showAddForm = ref(false)
    const newLinkName = ref('')
    const newLinkUrl = ref('')
    const links = ref<Link[]>([])

    watch(
        () => userStore.user,
        (user) => {
            if (!user) return

            const q = query(collection(db, 'users', user.uid, 'links'))

            onSnapshot(q, (snapshot) => {
                links.value = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Link[]
            })
        }, { immediate: true }
    )

    async function addLink() {
        if (!newLinkName.value.trim() || !newLinkUrl.value.trim() ||!userStore.user) return

        let url = newLinkUrl.value.trim()
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url
        }

        await addDoc(collection(db, 'users', userStore.user.uid, 'links'), {
            name: newLinkName.value.trim(),
            url: url
        })

        newLinkName.value = ''
        newLinkUrl.value = ''
        showAddForm.value = false
    }

    async function deleteLink(id: string) {
        if (!userStore.user) return

        await deleteDoc(doc(db, 'users', userStore.user.uid, 'links', id))
    }
</script>