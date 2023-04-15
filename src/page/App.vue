<template>
    <div id="app" class="min-h-screen bg-gray-900">

        <Auth v-if="!options.auth.url || !options.auth.key" />

        <Dash v-else />

        <AddNew />
        <RemoveFeed />
        <RenameFeed />
        <ChangeFolder />
        <RenameFolder />
        <RemoveFolder />
        <Settings />

    </div>
</template>

<script>
import { local } from "chrome-storage-promises";

import Auth from "./components/Auth.vue";
import Dash from "./components/Dash.vue";

import AddNew from "./components/modals/AddNew.vue";
import RemoveFeed from "./components/modals/RemoveFeed.vue";
import RenameFeed from "./components/modals/RenameFeed.vue";
import ChangeFolder from "./components/modals/ChangeFolder.vue";
import RenameFolder from "./components/modals/RenameFolder.vue";
import RemoveFolder from "./components/modals/RemoveFolder.vue";
import Settings from "./components/modals/Settings.vue";

export default {

    components: {
        Auth, 
        Dash,
        AddNew,
        RemoveFeed,
        RenameFeed,
        ChangeFolder,
        RenameFolder,
        RemoveFolder,
        Settings
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
    }
    
}
</script>
