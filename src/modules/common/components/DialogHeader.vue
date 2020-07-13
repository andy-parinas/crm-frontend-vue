<template>
    <v-toolbar dense color="blue-grey darken-1" dark flat >
        <v-toolbar-title><span class="subtitle-1">{{ title }}</span> </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn small icon @click="$emit('close')">
            <v-icon small>mdi-close</v-icon>
        </v-btn>
    </v-toolbar>
</template>

<script>
    export default {
        name: "DialogHeader",
        props: ['title']
    }
</script>

<style scoped>

</style>