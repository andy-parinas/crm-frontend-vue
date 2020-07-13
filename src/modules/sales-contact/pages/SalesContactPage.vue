<template>
    <div>
        <PageHeader title="Sales Contact" class="mb-1" />
        <v-row class="mt-6 mb-6" justify="center">
            <v-col cols="12" sm="12" md="10">
                <SalesContactsTable />
            </v-col>
        </v-row>
        <v-dialog v-model="showCreateDialog"  persistent width="850px">
            <SalesContactCreateDialog
                    @close="showCreateDialog = false"/>
        </v-dialog>
        <v-btn bottom color="pink" dark fab fixed right @click="showCreateDialog = true" >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
</template>

<script>
    import PageHeader from "../../common/components/PageHeader";
    import SalesContactsTable from "../components/SalesContactsTable";
    import SalesContactCreateDialog from "../components/dialogs/SalesContactCreateDialog";
    export default {
        name: "SalesContactPage",
        components: {SalesContactCreateDialog, SalesContactsTable, PageHeader},
        data(){
            return {
                showCreateDialog: false,
                error: false,
                message: ''
            }
        },
    }
</script>

<style scoped>

</style>