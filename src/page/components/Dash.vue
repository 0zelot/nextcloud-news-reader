<template>
    <div>

        <Sidebar />

        <div class="p-12 sm:ml-64">
            <p class="text-white text-center text-lg">TODO</p>
        </div>
        

    </div>
</template>

<script>
import { local } from "chrome-storage-promises";
import { initFlowbite } from "flowbite";

import Sidebar from "./Sidebar.vue";
    
export default {

    components: {
        Sidebar
    },

    data() {
        return {
            options: {},
            auth_error: "",
            ver: ""
        }
    },

    mounted() {
        initFlowbite();
    },

    async created() {
        const fromLocal = (await local.get("options")).options;
        if(fromLocal) this.options = fromLocal;

        try {
            const body = await (await fetch(`${this.options.auth.url}/index.php/apps/news/api/v1-2/version`, {
                headers: {
                    "Authorization": `Basic ${this.options.auth.key}`
                }
            })).json();
            console.log(body)
            this.ver = body.version;

        } catch(err) {
            console.error(err);
            this.auth_error = err.message;
        }

    },

    methods: {

    }

}
</script>