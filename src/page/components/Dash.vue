<template>
    <div>

        <Sidebar />

        <main class="px-4 md:px-24 py-8 sm:ml-64">
            <ItemList />
        </main>
        

    </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import ItemList from "./ItemList.vue";
    
export default {

    components: {
        Sidebar,
        ItemList
    }

}
</script>