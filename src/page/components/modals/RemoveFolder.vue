<template>
    <div id="remove-folder-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full">
        <div class="relative w-full h-full max-w-lg lg:h-auto">

            <div class="relative rounded-lg shadow bg-gray-700">

                <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white" data-modal-hide="remove-folder-modal">
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

                    <div class="p-6 text-center">

                        <svg aria-hidden="true" class="mx-auto mb-4 w-14 h-14 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>

                        <h3 class="mb-5 text-lg font-normal text-gray-400">Are you sure you want to delete this folder with all its content?</h3>

                        <button @click="confirmFolderRemoval($route)" data-modal-hide="remove-folder-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">Yes, I'm sure</button>
                        <button data-modal-hide="remove-folder-modal" type="button" class="hover:bg-gray-100 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600">No, cancel</button>
                    
                    </div>

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
            error: ""
        }
    },

    methods: {

        async confirmFolderRemoval(route) {

            this.error = "";

            const options = (await local.get("options")).options;
            const folderId = route.path.split("-")[1];

            try {
                const body = await (await fetch(`${options.auth.url}/index.php/apps/news/api/v1-2/folders/${folderId}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Basic ${options.auth.key}`
                    }
                })).json();

                if(body.message) throw new Error(body.message);

                window.location = "#";
                window.location.reload();

            } catch(err) {
                console.error(err);
                this.error = err.message;
            }

        }

    }

}
</script>
