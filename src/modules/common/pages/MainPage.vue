<template>
    <v-app>
        <TheNavbar />
        <v-content class="ma-4">
            <router-view></router-view>
            <Notifications v-model="showSuccessMessage" color="success" :text="successMessage" @close="setSuccessMessage(null)" />
            <Notifications v-model="showErrorMessage" color="error" :text="errorMessage" @close="setErrorMessage(null)" />
        </v-content>
    </v-app>
</template>

<script>
    import TheNavbar from "../components/TheNavbar";
    import {mapState, mapActions} from 'vuex'
    import Notifications from "../components/Notifications";
    export default {
        name: "MainPage",
        components: {Notifications, TheNavbar},
        data(){
            return {
                snackbar: true
            }
        },
        computed: {
            ...mapState(['successMessage', 'showSuccessMessage', 'showErrorMessage', 'errorMessage'])
        },
        methods: {
            ...mapActions(['setSuccessMessage', 'setErrorMessage']),
            closeSuccessSnackbar(){
                this.setSuccessMessage(null)
            },
            closeErrorSnackbar(){
                this.setErrorMessage(null)
            }
        }
    }
</script>

<style scoped>

</style>