<template>
    <div id="app" class="min-h-screen bg-gray-900" :class="options.theme">

        <Auth v-if="!options.auth.url || !options.auth.key" />

        <Dash v-else />

    </div>
</template>

<script>
import { local } from "chrome-storage-promises";

import Auth from "./components/Auth.vue";
import Dash from "./components/Dash.vue";

export default {

    components: {
        Auth, 
        Dash
    },

    data() {
        return {
            options: {
                auth: {
                    url: "",
                    key: "",
                }
            }
        }
    },

    async created() {
        const fromLocal = (await local.get("options")).options;
        if(fromLocal) 
            this.options = fromLocal;
        else
            local.set({options: this.options});
    },

    methods: {

    }
}
</script>
