<template>
    <div>
        <v-card flat class="mx-10">
            <v-card-text>
                <v-row>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-ticket-account</v-icon>
                        <span class="ml-2 caption font-weight-bold"> Taken By: </span> <span> {{ jobType.takenBy }}</span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-calendar-multiple-check</v-icon>
                        <span class="ml-2 caption font-weight-bold"> Date Allocated: </span> <span> {{ jobType.dateAllocated | formatDate }} </span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-icon small>mdi-cart</v-icon>
                        <span class="ml-2 caption font-weight-bold"> Product: </span> <span> {{ jobType.product | capitalize }} </span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-icon small>mdi-clipboard-text</v-icon>
                        <span class="ml-2 caption font-weight-bold"> Description: </span>
                        <span>
                        {{ jobType.description }}
                    </span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="12">
                        <v-icon small>mdi-pen</v-icon>
                        <span class="ml-2 caption font-weight-bold"> Design Advisor: </span> <span> {{ jobType.designAssessor }} </span>
                    </v-col>
                </v-row>
                <v-row v-if="jobType.designAssessorContactNumber && jobType.designAssessorEmail">
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-phone</v-icon>
                        <span class="ml-2"> {{ jobType.designAssessorContactNumber }} </span>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-icon small>mdi-email</v-icon>
                        <span class="ml-2"> {{ jobType.designAssessorEmail }} </span>
                    </v-col>
                </v-row>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-btn text small fab @click="editDialog = true"><v-icon>mdi-pencil</v-icon></v-btn>
                </v-row>
            </v-card-text>
        </v-card>
        <v-container>
            <v-row justify="center">
                <v-dialog v-model="editDialog" persistent max-width="800px">
                </v-dialog>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "LeadJobTypeDetails",
        props: {
            jobType: {required: true}
        }
    }
</script>

<style scoped>

</style>