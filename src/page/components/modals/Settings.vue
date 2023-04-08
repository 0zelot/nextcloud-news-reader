<template>
    <div id="settings-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
        <div class="relative w-full h-full max-w-lg lg:h-auto">

            <div class="relative rounded-lg shadow bg-gray-700">

                <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white" data-modal-hide="settings-modal">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>

                <div class="px-6 py-6 lg:px-8">

                    <div v-if="form.credentials.error" class="flex p-4 mb-4 mt-6 rounded-lg bg-gray-800 text-red-400" role="alert">
                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <div class="ml-3 text-sm font-medium">
                            Authorization failed: {{form.credentials.error}}<br />
                            See Developer Console for more info.
                        </div>
                    </div>

                    <h3 class="mb-4 text-xl font-medium text-white">Settings</h3>

                    <ul class="grid w-full gap-6 md:grid-cols-3">
                        <li>
                            <input type="radio" id="credentials" name="type" v-model="type" value="CREDENTIALS" class="hidden peer" required>
                            <label for="credentials" class="inline-flex items-center justify-between w-full p-5 border rounded-lg cursor-pointer border-gray-700 peer-checked:border-blue-600 text-white bg-gray-600 peer-checked:bg-gray-800">                           
                                <div class="block">
                                    <div class="w-full text-lg font-semibold">Login credentials</div>
                                    <div class="w-full">Change instance URL, login, password.</div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="appearance" name="type" v-model="type" value="APPEARANCE" class="hidden peer" required>
                            <label for="appearance" class="inline-flex items-center justify-between w-full p-5 border rounded-lg cursor-pointer border-gray-700 peer-checked:border-blue-600 text-white bg-gray-600 peer-checked:bg-gray-800">                           
                                <div class="block">
                                    <div class="w-full text-lg font-semibold">Adjust appearance</div>
                                    <div class="w-full">Change appearance and default behavior.</div>
                                </div>
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="advanced" name="type" v-model="type" value="ADVANCED" class="hidden peer" required>
                            <label for="advanced" class="inline-flex items-center justify-between w-full p-5 border rounded-lg cursor-pointer border-gray-700 peer-checked:border-blue-600 text-white bg-gray-600 peer-checked:bg-gray-800">                           
                                <div class="block">
                                    <div class="w-full text-lg font-semibold">Advanced settings</div>
                                    <div class="w-full">Don't change if everything works fine.</div>
                                </div>
                            </label>
                        </li>
                    </ul>

                    <form @submit.prevent="changeLoginCredentials" v-if="type == 'CREDENTIALS'" class="space-y-6 mt-5">

                        <div>
                            <label for="url" class="block mb-2 text-sm font-medium text-white">Instance URL</label>
                            <input v-model="form.credentials.url" type="text" name="url" class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required>
                        </div>

                        <div>
                            <label for="username" class="block mb-2 text-sm font-medium text-white">Username</label>
                            <input v-model="form.credentials.username" type="text" name="username" class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required>
                        </div>

                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
                            <input v-model="form.credentials.password" type="password" name="password" class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" required>
                        </div>

                        <button v-if="form.credentials.loading" class="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500 hover:bg-blue-500 focus:ring-blue-800" disabled>
                            <svg aria-hidden="true" role="status" class="inline w-5 h-5 animate-spin text-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                            </svg>
                        </button>
                        <button v-else type="submit" class="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Save</button>
                    
                    </form>

                    <form @submit.prevent="adjustAppearance" v-else-if="type == 'APPEARANCE'" class="space-y-6 mt-5">

                        <div>
                            <label for="item-view" class="block mb-2 text-sm font-medium text-white">Default item view</label>
                            <select v-model="form.appearance.itemView" id="item-view" class="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
                                <option value="list">List</option>
                                <option value="card">Card</option>
                            </select>
                        </div>

                        <div class="flex items-center mb-4">
                            <input v-model="form.appearance.collapseFolders" id="collapse-folders" type="checkbox" value="" class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600">
                            <label for="collapse-folders" class="ml-2 text-sm font-medium text-white">Collapse all folders by default</label>
                        </div>

                        <button v-if="form.credentials.loading" class="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500 hover:bg-blue-500 focus:ring-blue-800" disabled>
                            <svg aria-hidden="true" role="status" class="inline w-5 h-5 animate-spin text-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                            </svg>
                        </button>
                        <button v-else type="submit" class="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Save</button>
                    
                    </form>

                    <form @submit.prevent="changeAdvanced" v-if="type == 'ADVANCED'" class="space-y-6 mt-5">

                        <div>
                            <label for="refreshRate" class="block mb-2 text-sm font-medium text-white">Refresh rate (minutes)</label>
                            <input v-model="form.advanced.refreshRate" type="number" name="refreshRate" class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="5" required>
                        </div>

                        <div>
                            <label for="batchSize" class="block mb-2 text-sm font-medium text-white">Batch size</label>
                            <input v-model="form.advanced.batchSize" type="number" name="batchSize" class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="6000" required>
                        </div>

                        <button v-if="form.advanced.loading" class="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-500 hover:bg-blue-500 focus:ring-blue-800" disabled>
                            <svg aria-hidden="true" role="status" class="inline w-5 h-5 animate-spin text-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                            </svg>
                        </button>
                        <button v-else type="submit" class="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Save</button>
                    
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
                credentials: {
                    url: "",
                    username: "",
                    password: "",
                    loading: false,
                    error: ""
                },
                appearance: {
                    collapseFolders: "",
                    itemView: "",
                    loading: false
                },
                advanced: {
                    refreshRate: "",
                    batchSize: "",
                    loading: false
                }
            },
            options: {}
        }
    },

    async created() {

        const fromLocal = (await local.get("options")).options;
        if(fromLocal) this.options = fromLocal;

        this.form.credentials.url = this.options.auth.url;
        this.form.appearance.collapseFolders = this.options?.settings?.collapseFolders;
        this.form.appearance.itemView = this.options?.settings?.itemView;
        this.form.advanced.refreshRate = this.options?.settings?.refreshRate;
        this.form.advanced.batchSize = this.options?.settings?.batchSize;

    },

    methods: {

        async changeLoginCredentials() {

            this.form.credentials.loading = true;
            this.form.credentials.error = "";

            try {
                const body = await (await fetch(`${this.form.credentials.url}/index.php/apps/news/api/v1-2/version`, {
                    headers: {
                        "Authorization": `Basic ${btoa(`${this.form.credentials.username}:${this.form.credentials.password}`)}`
                    }
                })).json();
                
                if(body.message) throw new Error(body.message);
                if(!body.version) throw new Error("Unknown error");

                const options = (await local.get("options")).options;
                options["auth"] = {};
                options.auth.url = this.form.credentials.url;
                options.auth.key = btoa(`${this.form.credentials.username}:${this.form.credentials.password}`);
                local.set({options});
                window.location.reload();

            } catch(err) {
                console.error(err);
                this.form.credentials.error = err.message;
            }

            this.form.credentials.loading = false;

        },

        async adjustAppearance() {

            this.form.appearance.loading = true;

            const options = (await local.get("options")).options;
            if(!options["settings"]) options["settings"] = {};

            options.settings.collapseFolders = this.form.appearance.collapseFolders;
            options.settings.itemView = this.form.appearance.itemView;

            local.set({options});
            window.location.reload();

            this.form.appearance.loading = false;

        },

        async changeAdvanced() {

            this.form.advanced.loading = true;

            const options = (await local.get("options")).options;
            if(!options["settings"]) options["settings"] = {};

            options.settings.refreshRate = this.form.advanced.refreshRate;
            options.settings.batchSize = this.form.advanced.batchSize;

            local.set({options});
            window.location.reload();

            this.form.advanced.loading = false;

            console.log((await local.get("options")).options)

        }

    }

}
</script>
