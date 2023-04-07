<template>
    <div>

        <div class="flow-root">  

            <a class="float-left">

                <svg v-if="updating" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-white animate-spin cursor-progress">
                    <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
                </svg>

                <svg v-else @click="refresh($route)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-white hover:text-blue-500 cursor-pointer">
                    <path fill-rule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clip-rule="evenodd" />
                </svg>

                <small v-if="ms && items?.updated" class="text-gray-300">
                    Updated <span class="text-white">{{ ms(Date.now() - items.updated, {long: true}) }}</span> ago
                </small>
            
            </a>

            <a class="float-right">

                <svg data-modal-target="settings-modal" data-modal-toggle="settings-modal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-white hover:text-blue-500 cursor-pointer">
                    <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clip-rule="evenodd" />
                </svg>

            </a>
                    
        </div>

        <header class="my-4">

            <div v-if="$route.path.startsWith('/FEED-')">
                <button data-modal-target="rename-feed-modal" data-modal-toggle="rename-feed-modal" class="text-white focus:ring-4 focus:outline-none font-small rounded-lg text-sm px-2.5 py-1.5 mx-0.5 text-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-800">Rename feed</button>
                <button data-modal-target="change-folder-modal" data-modal-toggle="change-folder-modal" class="text-white focus:ring-4 focus:outline-none font-small rounded-lg text-sm px-2.5 py-1.5 mx-0.5 text-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-800">Change folder</button>
                <button data-modal-target="remove-feed-modal" data-modal-toggle="remove-feed-modal" class="text-white focus:ring-4 focus:outline-none font-small rounded-lg text-sm px-2.5 py-1.5 mx-0.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800">Remove feed</button>
            </div>

            <div v-else-if="$route.path.startsWith('/FOLDER-')">
                <button data-modal-target="rename-folder-modal" data-modal-toggle="rename-folder-modal" class="text-white focus:ring-4 focus:outline-none font-small rounded-lg text-sm px-2.5 py-1.5 mx-0.5 text-center bg-gray-600 hover:bg-gray-700 focus:ring-gray-800">Rename folder</button>
                <button data-modal-target="remove-folder-modal" data-modal-toggle="remove-folder-modal" class="text-white focus:ring-4 focus:outline-none font-small rounded-lg text-sm px-2.5 py-1.5 mx-0.5 text-center bg-red-600 hover:bg-red-700 focus:ring-red-800">Remove folder</button>
            </div>

        </header>

        <div v-if="loading" class="text-white h-screen flex justify-center items-center">
            <svg aria-hidden="true" role="status" class="inline w-24 h-24 animate-spin text-gray-300" style="margin-top:-300px" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
            </svg>
        </div>

        <div v-else-if="items.data && items.data.length > 0" class="overflow-x-hidden">

            <section v-for="(item, i) in items.data" :key="i" class="text-white">

                <a v-if="!options.settings || options.settings.itemView == 'list'" :href="item.url" target="_blank" class="flex flex-col md:h-auto border rounded-lg shadow md:flex-row border-gray-700 bg-gray-800 hover:bg-gray-700 my-2 mx-auto w-full lg:w-3/4">
                    <v-lazy-image v-if="item.image" class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" :src="item.image" alt="" />
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">{{ item.title }}</h5>
                        <p class="mb-3 font-normal text-gray-400 align-top">{{ item.body.replaceAll(/<[^>]*>/gm, "").slice(0, 1000) }}</p>
                        <p class="text-xs text-neutral-300">
                            <span v-if="item.author">{{ item.author }} | </span>
                            <span v-if="item.pubDate">{{ ms(Date.now() - item.pubDate*1000, {long: true}) }} ago</span>
                        </p>
                    </div>
                </a>

                <a v-else-if="options.settings.itemView == 'card'" :href="item.url" target="_blank" class="flex flex-col h-auto border rounded-lg shadow flex-row border-gray-700 bg-gray-800 hover:bg-gray-700 my-2 mx-auto w-full lg:w-[45rem]">
                    <v-lazy-image v-if="item.image" class="object-cover w-full rounded-t-lg h-auto rounded-none rounded-l-lg" :src="item.image" alt="" />
                    <div class="flex flex-col justify-between p-4 leading-normal">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-white">{{ item.title }}</h5>
                        <p class="text-xs text-neutral-300">
                            <span v-if="item.author">{{ item.author }} | </span>
                            <span v-if="item.pubDate">{{ ms(Date.now() - item.pubDate*1000, {long: true}) }} ago</span>
                        </p>
                    </div>
                </a>

            </section>

        </div>

        <p v-else class="text-white text-center text-lg mt-10">There is nothing here. Try to refresh data or wait for new articles.</p>
        
    </div>
</template>

<script>
import { local } from "chrome-storage-promises";
import { initFlowbite } from "flowbite";
import VLazyImage from "v-lazy-image";
import ms from "ms";

import refreshItemData from "../../utils/refreshItemData.js";

export default {

    components: {
        VLazyImage
    },
    
    data() {
        return {
            ms,
            options: {},
            error: "",
            updating: false,
            loading: true,
            items: {
                updated: 0,
                data: []
            },
            mappings: {
                image: {
                    "amp;": ""
                }
            }
        }
    },

    watch: {

        async $route(to, from) {
            this.load(to);
            window.scrollTo(0, 0);
            initFlowbite();
        }

    },

    mounted() {
        initFlowbite();
    },

    async created() {
        this.load(this.$route);
    },

    methods: {

        async load(route) {

            this.loading = true;
            this.items.data = [];

            const options = (await local.get("options")).options;
            if(options) this.options = options;

            const items = (await local.get("items")).items;

            this.items = {
                updated: items.updated,
                data: items.data[route.path]?.sort((a, b) => b.pubDate - a.pubDate)
            }

            for(const item in this.items.data) {

                const matches = this.items.data[item].body.matchAll(/<img [^>]*src="([^"]*)"[^>]*>/gm);
                let imageUrl = "";

                for(const match of matches) {
                    imageUrl = match[1];
                }

                if(imageUrl.startsWith("//")) imageUrl = imageUrl.replace("//", "https://");
                
                for(const toReplace in this.mappings.image) imageUrl = imageUrl.replaceAll(toReplace, this.mappings.image[toReplace]);

                this.items.data[item].image = imageUrl;

            }

            this.loading = false;

        },

        async refresh(route) {

            this.updating = true;

            const status = await refreshItemData();
            
            if(!status) return console.error(status);

            const items = (await local.get("items")).items;

            this.items = {
                updated: items.updated,
                data: items.data[route.path]
            }

            this.updating = false;

            this.load(route);

        }

    }

}
</script>
