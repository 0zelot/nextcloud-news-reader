<template>
    <div>

        <Sidebar />

        <main class="px-16 py-8 sm:ml-64">
            <ItemList />
        </main>
        

    </div>
</template>

<script>
import { local } from "chrome-storage-promises";

import Sidebar from "./Sidebar.vue";
import ItemList from "./ItemList.vue";
    
export default {

    components: {
        Sidebar,
        ItemList
    },

    data() {
        return {
            options: {},
            auth_error: "",
            ver: ""
        }
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

    }

}
</script>