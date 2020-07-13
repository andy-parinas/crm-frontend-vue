<template>
    <div>
        <PageHeader title="Sales Lead"  class="mb-1" />
        <v-row class="mt-6" justify="center">
            <v-col cols="12" sm="12" md="12">
                <LeadsTable ref="leadTable" />
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import PageHeader from "../../common/components/PageHeader";
    import LeadsTable from "../components/LeadsTable";
    export default {
        name: "LeadPage",
        components: {LeadsTable, PageHeader}
    }
</script>

<style scoped>

</style>