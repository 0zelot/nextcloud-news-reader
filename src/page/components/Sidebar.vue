<template>
    <nav>

        <button data-drawer-target="cta-button-sidebar" data-drawer-toggle="cta-button-sidebar" aria-controls="cta-button-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600">
            <span class="sr-only">Open sidebar</span>
            <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
        </button>

        <aside id="cta-button-sidebar" class="fixed top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            
            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-800">
                
                <ul class="space-y-2 text-sm font-medium ml-1">

                    <li>
                        <a href="#" class="flex items-center p-1 rounded-lg text-white hover:bg-gray-700 pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                                <path fill-rule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.75a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5H6zm-.75 3.75a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5H6a.75.75 0 01-.75-.75zM6 6.75a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-3A.75.75 0 009 6.75H6z" clip-rule="evenodd" />
                                <path d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 01-3 0V6.75z" />
                            </svg>
                            <span class="ml-1">All feeds</span>
                        </a>
                    </li>

                    <li>
                        <a href="#" data-modal-target="add-new-modal" data-modal-toggle="add-new-modal" class="flex items-center p-1 rounded-lg text-white hover:bg-gray-700 pl-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                                <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                            </svg>
                            <span class="ml-1">Add new</span>
                        </a>
                    </li>

                    <div v-if="loading" class="text-center">
                        <svg aria-hidden="true" role="status" class="inline w-8 h-8 animate-spin text-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                        </svg>
                    </div>

                    <div class="reset-margin-top">

                        <li v-for="(feed, i) in feeds" :key="i">
                            <a v-if="!feed.folderId" :href="`#FEED-${feed.id}`" class="flex items-center w-full p-1 transition duration-75 rounded-lg group text-gray-100 hover:bg-gray-700 text-xs font-normal pl-3">
                                <img :src="feed.faviconLink" class="rounded-full w-4 h-4 m-1" alt="Favicon">{{ feed.title }}
                            </a>
                        </li>

                        <li v-for="(folder, i) in folders" :key="i">
                            <div class="flex items-center p-1 transition duration-75 rounded-lg group text-white hover:bg-gray-700 pl-3">
                                <a :href="`#FOLDER-${folder.id}`" class="w-full">
                                    <span class="flex-1 text-left whitespace-nowrap">{{ folder.name }}</span>
                                </a>
                                <button type="button" :aria-controls="`dropdown-${folder.id}`" :data-collapse-toggle="`dropdown-${folder.id}`">
                                    <svg v-if="folder.name" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                            </div>
                            <ul :id="`dropdown-${folder.id}`">
                                <li v-for="(feed, j) in feeds" :key="j">
                                    <a v-if="feed.folderId == folder.id" :href="`#FEED-${feed.id}`" class="flex items-center w-full p-1 transition duration-75 rounded-lg pl-5 group text-gray-100 hover:bg-gray-700 text-xs font-normal">
                                        <img :src="feed.faviconLink" class="rounded-full w-4 h-4 m-1" alt="Favicon">{{ feed.title }}
                                    </a>
                                </li>
                            </ul>
                        </li>

                    </div>

                </ul>

            </div>

        </aside>

    </nav>
</template>

<script>
import { local } from "chrome-storage-promises";
import { initFlowbite } from "flowbite";

export default {
    
    data() {
        return {
            options: {},
            auth_error: "",
            loading: false,
            folders: [],
            feeds: []
        }
    },

    mounted() {
        initFlowbite();
    },

    async created() {
        
        for(let id = 0; id < 99; id++) this.folders.push({id});

        this.loading = true;
        const fromLocal = (await local.get("options")).options;
        if(fromLocal) this.options = fromLocal;

        try {

            this.folders = (await (await fetch(`${this.options.auth.url}/index.php/apps/news/api/v1-2/folders`, {
                headers: {
                    "Authorization": `Basic ${this.options.auth.key}`
                }
            })).json()).folders;

            this.feeds = (await (await fetch(`${this.options.auth.url}/index.php/apps/news/api/v1-2/feeds`, {
                headers: {
                    "Authorization": `Basic ${this.options.auth.key}`
                }
            })).json()).feeds;

        } catch(err) {
            console.error(err);
            this.auth_error = err.message;
        }

        this.loading = false;

    },

    methods: {

        openContextMenu(id) {
            console.log(id);
        }

    }

}
</script>
