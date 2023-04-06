<template>
    <div id="add-new-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
        <div class="relative w-full h-full max-w-lg lg:h-auto">

            <div class="relative rounded-lg shadow bg-gray-700">

                <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white" data-modal-hide="add-new-modal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>

                <div class="px-6 py-6 lg:px-8">

                    <div v-if="error" class="flex p-4 mb-4 mt-6 rounded-lg bg-gray-800 text-red-400" role="alert">
                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <div class="ml-3 text-sm font-medium">{{ error }}</div>
                    </div>

                    <h3 class="mb-4 text-xl font-medium text-white">Add new entry</h3>

                    <ul class="grid w-full gap-6 md:grid-cols-2">
                        <li>
                            <input type="radio" id="feed" name="type" v-model="type" value="FEED" class="hidden peer" required>
                            <label for="feed" class="inline-flex items-center justify-between w-full p-5 border rounded-lg cursor-pointer border-gray-700 peer-checked:border-blue-600 text-white bg-gray-600 peer-checked:bg-gray-800">                           
                                <div class="block">
                                    <div class="w-full text-lg font-semibold">Add new feed</div>
                                    <div class="w-full">Add the source website from which you want to see news.</div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="folder" name="type" v-model="type" value="FOLDER" class="hidden peer">
                            <label for="folder" class="inline-flex items-center justify-between w-full p-5 border rounded-lg cursor-pointer border-gray-700 peer-checked:border-blue-600 text-white bg-gray-600 peer-checked:bg-gray-800">
                                <div class="block">
                                    <div class="w-full text-lg font-semibold">Create new folder</div>
                                    <div class="w-full">Organize your feeds in folders so as not to get lost.</div>
                                </div>
                            </label>
                        </li>
                    </ul>

                    <form @submit.prevent="addNewEntry" v-if="type == 'FEED'" class="space-y-6 mt-5">

                        <div>
                            <label for="url" class="block mb-2 text-sm font-medium text-white">URL</label>
                            <input v-model="form.feed.url" type="text" name="url" class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="https://example.com/feed" required>
                            <small class="text-gray-400">Many websites provide RSS channel on <strong class="font-semibold text-blue-200">/feed</strong>, <strong class="font-semibold text-blue-200">/rss</strong> or <strong class="font-semibold text-blue-200">/rss.xml</strong>. Links to RSS channels are usually marked with <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" class="inline w-3 h-3"><path fill-rule="evenodd" d="M3.75 4.5a.75.75 0 01.75-.75h.75c8.284 0 15 6.716 15 15v.75a.75.75 0 01-.75.75h-.75a.75.75 0 01-.75-.75v-.75C18 11.708 12.292 6 5.25 6H4.5a.75.75 0 01-.75-.75V4.5zm0 6.75a.75.75 0 01.75-.75h.75a8.25 8.25 0 018.25 8.25v.75a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-.75a6 6 0 00-6-6H4.5a.75.75 0 01-.75-.75v-.75zm0 7.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clip-rule="evenodd" /></svg> icon.</small>
                        </div>

                        <div>
                            <label for="folder" class="block mb-2 text-sm font-medium text-white">Folder</label>
                            <select v-model="form.feed.folder" id="folder" class="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
                                <option selected>Unassigned</option>
                                <option v-for="(folder, i) in folders" :key="i" :value="folder.id">{{ folder.name }}</option>
                            </select>
                        </div>

                        <button v-if="loading" class="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500 hover:bg-blue-500 focus:ring-blue-800" disabled>
                            <svg aria-hidden="true" role="status" class="inline w-5 h-5 animate-spin text-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                            </svg>
                        </button>
                        <button v-else type="submit" class="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Add new feed</button>
                    
                    </form>

                    <form @submit.prevent="addNewEntry" v-else-if="type == 'FOLDER'" class="space-y-6 mt-5">

                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-white">Name</label>
                            <input v-model="form.folder.name" type="text" name="name" class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="Technology">
                        </div>

                        <button v-if="loading" class="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500 hover:bg-blue-500 focus:ring-blue-800" disabled>
                            <svg aria-hidden="true" role="status" class="inline w-5 h-5 animate-spin text-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                            </svg>
                        </button>
                        <button v-else type="submit" class="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Create new folder</button>                    
                    
                    </form>

                </div>

            </div>

        </div>
    </div>
</template>

<script>
import { local } from "chrome-storage-promises";

export default {
    
    data() {
        return {
            type: 0,
            form: {
                feed: {
                    url: "",
                    folder: 0
                },
                folder: {
                    name: ""
                }
            },
            options: {},
            folders: [],
            loading: false,
            error: ""
        }
    },

    async created() {
        const fromLocal = (await local.get("options")).options;
        if(fromLocal) this.options = fromLocal;

        try {
            this.folders = (await (await fetch(`${this.options.auth.url}/index.php/apps/news/api/v1-2/folders`, {
                headers: {
                    "Authorization": `Basic ${this.options.auth.key}`
                }
            })).json()).folders;
        
        } catch(err) {
            console.error(err);
            this.auth_error = err.message;
        }

    },

    methods: {

        async addNewEntry() {

            this.loading = true;
            this.error = "";

            try {
                let body;

                if(this.type == "FEED") body = await (await fetch(`${this.options.auth.url}/index.php/apps/news/api/v1-2/feeds?url=${encodeURIComponent(this.form.feed.url)}&folderId=${this.form.feed.folder}`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Basic ${this.options.auth.key}`
                    }
                })).json();

                else if(this.type == "FOLDER") body = await (await fetch(`${this.options.auth.url}/index.php/apps/news/api/v1-2/folders?name=${this.form.folder.name}`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Basic ${this.options.auth.key}`
                    }
                })).json();

                if(body.message) throw new Error(body.message);

                window.location.reload();

            } catch(err) {
                console.error(err);
                this.error = err.message;
            }

            this.loading = false;

        }

    }

}
</script>
