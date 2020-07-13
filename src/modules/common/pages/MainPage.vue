<template>
    <v-app>
        <TheNavbar />
        <v-content class="ma-4">
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
    import TheNavbar from "../components/TheNavbar";
    export default {
        name: "MainPage",
        components: {TheNavbar}
    }
</script>

<style scoped>

</style>