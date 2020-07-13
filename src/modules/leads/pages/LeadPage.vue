<template>
    <div>
        <PageHeader title="Sales Lead"  class="mb-1" />
        <v-row class="mt-6" justify="center">
            <v-col cols="12" sm="12" md="12" v-show="!isDetailShown">
                <LeadsTable ref="leadTable" @showLead="handleShowLead" />
            </v-col>
        </v-row>
        <div v-if="isDetailShown">
            <LeadDetails :lead="lead" @goBack="handleDetailsBack" />
        </div>
    </div>
</template>

<script>
    import PageHeader from "../../common/components/PageHeader";
    import LeadsTable from "../components/LeadsTable";
    import LeadDetails from "../components/LeadDetails";
    export default {
        name: "LeadPage",
        components: {LeadDetails, LeadsTable, PageHeader},
        data(){
            return {
                isDetailShown: false,
                isFormShown: false,
                lead: null
            }
        },
        methods: {
            handleShowLead(lead){
                console.log('showLead Emitted', lead)
                if(lead){
                    console.log('With Lead')
                    this.lead = Object.assign({}, lead)
                    this.isDetailShown = true;
                }
            },
            handleDetailsBack(){
                this.isDetailShown = false;
                this.lead = null;
            }
        }
    }
</script>

<style scoped>

</style>