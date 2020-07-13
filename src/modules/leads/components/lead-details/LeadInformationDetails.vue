<template>
    <div>
        <v-card flat class="mx-10">
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-numeric-0-box-multiple-outline</v-icon>
                        <span class="ml-2 caption font-weight-bold">Lead Number:</span> <span class="ml-1"> {{lead.leadNumber}} </span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-store</v-icon>
                        <span class="ml-2 caption font-weight-bold">Franchise Number: </span> <span class="ml-1"> {{lead.franchiseNumber }} </span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-calendar</v-icon>
                        <span class="ml-2 caption font-weight-bold">Lead Date: </span> <span class="ml-1"> {{ lead.leadDate | formatDate }} </span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-briefcase</v-icon>
                        <span class="ml-2 caption font-weight-bold">Lead Type: </span> <span class="ml-1"> {{ lead.customerType | capitalize }} </span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-web</v-icon>
                        <span class="ml-2 caption font-weight-bold">Lead Source: </span> <span class="ml-1"> {{ lead.leadSource | capitalize }} </span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-map-marker</v-icon>
                        <span class="ml-2 caption font-weight-bold">Status: </span>
                        <v-chip small label :color="isInsideFranchise" text-color="white">
                            {{ status }}
                        </v-chip>
                    </v-col>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-btn text small fab @click="editDialog = true"><v-icon>mdi-pencil</v-icon></v-btn>
                </v-row>
                <v-divider class="my-5"></v-divider>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-account</v-icon>
                        <span class="ml-2"> {{ lead.firstName}} {{ lead.lastName }} </span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-phone</v-icon>
                        <span class="ml-2">{{ lead.contactNumber }}</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-email</v-icon>
                        <span class="ml-2"> {{ lead.email }}</span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-email</v-icon>
                        <span class="ml-2">{{ lead.email2 }}</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-home</v-icon>
                        <span class="ml-2">{{ lead.street1 }}</span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-sign-direction</v-icon>
                        <span class="ml-2"> {{ lead.street2 }}</span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-icon small>mdi-map</v-icon>
                        <span class="ml-2">{{lead.suburb}}, {{lead.state}}, {{lead.postcode}}</span>
                    </v-col>
                </v-row>

            </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "LeadInformationDetails",
        props: {
            lead: {required: true}
        },
        computed: {
            status(){
                if(this.lead && this.lead.postcodeStatus === 'outside_of_franchise'){
                    return 'Outside Of Franchise'
                }

                return 'Within Franchise'
            },
            isInsideFranchise(){

                if(this.lead && this.lead.postcodeStatus === 'inside_of_franchise'){
                    return 'green'
                }

                return 'orange darken-3'
            }
        }
    }
</script>

<style scoped>

</style>