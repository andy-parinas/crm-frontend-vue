<template>
    <v-card>
        <DialogHeader :title="title" @close="$emit('close')"  />
        <v-card-text>
            <div class="mt-3 subtitle-1"> The Delete process is unrecoverable. Are you sure you want to delete?</div>
            <div class="mt-3 subtitle-1 font-weight-bold" > {{ message }} </div>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn small color="red darken-1" class="mr-3 mb-2 white--text"
                   @click="$emit('delete')"
                   :loading="deleting">
                Delete
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import DialogHeader from "./DialogHeader";
    export default {
        name: "DeleteDialog",
        components: {DialogHeader},
        props: ['title', 'message', 'deleting']
    }
</script>

<style scoped>

</style>