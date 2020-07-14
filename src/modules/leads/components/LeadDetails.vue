<template>
    <div>
        <v-row justify="center">
            <v-col cols="12" sm="10">
                <v-card>
                    <v-toolbar flat color="blue-grey" dark>
                        <v-toolbar-title>Lead Details</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn text @click="$emit('goBack')">
                            <v-icon>mdi-arrow-left-bold</v-icon> <span> Go Back </span>
                        </v-btn>
                    </v-toolbar>
                    <v-tabs show-arrows class="my-5">

                        <v-tab> Lead Details </v-tab>
                        <v-tab> Job Type </v-tab>
                        <v-tab> Appointment </v-tab>
                        <v-tab> Documents </v-tab>
                        <v-tab> Contract </v-tab>
                        <v-tab> Finance </v-tab>

                        <v-tab-item>
                            <LeadInformationDetails :lead="lead.details" />
                        </v-tab-item>
                        <v-tab-item>
                            <LeadJobTypeDetails :job-type="lead.jobType" />
                        </v-tab-item>
                        <v-tab-item>
                            <LeadAppointmentDetails :appointment="lead.appointment" />
                        </v-tab-item>
                        <v-tab-item>
                            <LeadDocumentDetails :lead-id="lead.details.id" />
                        </v-tab-item>
                        <v-tab-item>
                            Contract
                        </v-tab-item>
                        <v-tab-item>
                            Finance
                        </v-tab-item>
                    </v-tabs>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import LeadInformationDetails from "./lead-details/LeadInformationDetails";
    import LeadJobTypeDetails from "./lead-details/LeadJobTypeDetails";
    import LeadAppointmentDetails from "./lead-details/LeadAppointmentDetails";
    import LeadDocumentDetails from "./lead-details/LeadDocumentDetails";
    export default {
        name: "LeadDetails",
        components: {LeadDocumentDetails, LeadAppointmentDetails, LeadJobTypeDetails, LeadInformationDetails},
        props: ['lead']
    }
</script>

<style scoped>

</style>