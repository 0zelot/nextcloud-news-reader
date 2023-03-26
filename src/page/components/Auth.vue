<template>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">

        <h1 class="text-4xl text-gray-100 font-bold text-center m-3">Log in</h1>

        <div v-if="auth_error" class="flex p-4 mb-4 rounded-lg bg-gray-800 text-red-400" role="alert">
            <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
            <div class="ml-3 text-sm font-medium">
                Authorization failed: {{auth_error}}<br />
                See Developer Console for more info.
            </div>
        </div>

        <form @submit.prevent="authorizate()">

            <div class="mb-6">
                <label for="url" class="block mb-2 text-sm font-medium text-white">Instance URL</label>
                <input v-model="url" type="text" name="url" class="bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm rounded-lg w-full p-2.5 text-white focus:ring-blue-500 focus:border-blue-500" pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)" placeholder="https://nextcloud.example.com" required>
            </div>

            <div class="mb-6">
                <label for="username" class="block mb-2 text-sm font-medium text-white">Username</label>
                <input v-model="username" type="username" name="username" class="bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm rounded-lg w-full p-2.5 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="John" required>
            </div>

            <div class="mb-6">
                <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
                <input v-model="password" type="password" name="password" class="bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm rounded-lg w-full p-2.5 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="************" required>
                <small class="text-gray-400">Instead of using your account password, create a new app password without filesystem access. This is generally safer, and mandatory when using MFA.</small>
            </div>

            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
        
        </form>

    </div>
</template>

<script>
import { local } from "chrome-storage-promises";

export default {

    data() {
        return {
            url: "",
            username: "",
            password: "",
            auth_error: ""
        }
    },

    async created() {
        const fromLocal = (await local.get("options")).options;
        if(fromLocal) this.options = fromLocal;
    },

    methods: {

        async authorizate() {

            this.auth_error = "";

            try {
                const body = await (await fetch(`${this.url}/index.php/apps/news/api/v1-2/version`, {
                    headers: {
                        "Authorization": `Basic ${btoa(`${this.username}:${this.password}`)}`
                    }
                })).json();
                if(body.message) throw new Error(body.message);
                if(!body.version) throw new Error("Unknown error");

                const options = (await local.get("options")).options;
                options["auth"] = {};
                options.auth.url = this.url;
                options.auth.key = btoa(`${this.username}:${this.password}`);
                local.set({options});
                window.location.reload();

            } catch(err) {
                console.error(err);
                this.auth_error = err.message;
            }

        }

    }

}
</script>
