<template>
    <v-snackbar  v-model="value" :color="color" right top :timeout="0" >
        {{ text }}

        <template v-slot:action="{ attrs }">
            <v-btn dark text v-bind="attrs" @click="$emit('close')" > Close </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
    export default {
        name: "Notifications",
        props: ['value', 'color', 'text']
    }
</script>

<style scoped>

</style>