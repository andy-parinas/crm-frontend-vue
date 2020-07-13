<template>
    <div class="mb-12">
        <v-card>
            <v-card-title id="table-header" >
                <SearchBySelectionForm :selections="selections"
                                       @search="handleSalesContactSearch"
                                       @reset="handleSearchReset"/>
            </v-card-title>
            <v-data-table
                    :items="leads"
                    :options.sync="pageOptions"
                    :headers="headers"
                    :server-items-length="meta.total"
                    :single-expand="true"
                    :loading="loading"
                    :footer-props="footerProps"
                    @update:page="handlePageOptionsChange"
                    @update:sort-by="handlePageOptionsChange"
                    @update:sort-desc="handlePageOptionsChange"
                    @update:items-per-page="handlePageOptionsChange"
                    item-key="id"
                    class="elevation-0">

                <template v-slot:item.leadDate="{item}">
                    <span>{{item.leadDate | formatDate }}</span>
                </template>

                <template v-slot:item.outcome="{item}">
                    <LeadOutcomeChip :outcome="item.outcome" :small="true" />
                </template>

                <template v-slot:item.actions="{item}">
                    <v-container>
                        <v-row class="justify-sm-start">
                            <v-btn v-if="isHeadOffice"
                                   x-small fab text dark color="error" class="mr-3" @click="handleDelete(item)">
                                <v-icon small > mdi-trash-can-outline </v-icon>
                            </v-btn>
                            <v-btn x-small fab text dark color="accent" @click="handleShow(item)" :loading="item.leadId === selectedId" >
                                <v-icon small > mdi-forward </v-icon>
                            </v-btn>
                        </v-row>
                    </v-container>

                </template>

            </v-data-table>
        </v-card>
    </div>
</template>

<script>
    import SearchBySelectionForm from "../../common/components/SearchBySelectionForm";
    import {mapState, mapActions} from 'vuex';
    import ErrorHandlerMixins from "../../common/mixins/error-handler-mixins";
    import LeadOutcomeChip from "./LeadOutcomeChip";

    export default {
        name: "LeadsTable",
        components: {LeadOutcomeChip, SearchBySelectionForm},
        data(){
            return {
                loading: false,
                selectedId: '',
                selections: [
                    {text: 'Lead Number', value: 'lead_number'},
                    {text: 'First Name', value: 'first_name'},
                    {text: 'Last Name', value: 'last_name'},
                    {text: 'Suburb', value: 'suburb'},
                    {text: 'State', value: 'state'},
                    {text: 'Postcode', value: 'postcode'},
                    {text: 'Outcome', value: 'outcome'},
                    {text: 'Franchise', value: 'franchise_number'}
                ],
                headers: [
                    { text: 'Lead Number',value: 'leadNumber'},
                    { text: 'Lead Date',value: 'leadDate'},
                    { text: 'First Name',value: 'firstName'},
                    { text: 'Last Name', value: 'lastName' },
                    { text: 'Suburb', value: 'suburb' },
                    { text: 'State', value: 'state' },
                    { text: 'Postcode', value: 'postcode' },
                    { text: 'Outcome', value: 'outcome' },
                    { text: 'Franchise', value: 'franchiseNumber' },
                    { text: 'Actions', value: 'actions', sortable: false }
                ],
                footerProps: {
                    "items-per-page-options": [5,10,15,20],
                    disablePagination: false,
                    disableItemsPerPage : false
                },
                pageOptions: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['leadDate'],
                    sortDesc: [true],
                    groupBy: [],
                    groupDesc: [],
                    mustSort: false,
                    multiSort: false
                },
                defaultOptions: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['leadDate'],
                    sortDesc: [true],
                    groupBy: [],
                    groupDesc: [],
                    mustSort: false,
                    multiSort: false
                },
                searchIn: '',
                searchFor: '',
            }
        },
        mixins: [ErrorHandlerMixins],
        computed: {
            ...mapState('leads', ['leads', 'meta']),
            ...mapState('auth', ['currentUser']),
            isHeadOffice(){
                const userType = this.currentUser.userType;
                return  userType === 'head_office';
            },
        },
        methods: {
            ...mapActions('leads', ['fetchLeads', 'deleteLead']),
            ...mapActions(['setSuccessMessage']),
            async handleGetLeads(pageOptions, searchOptions){
                try {
                    this.loading = true
                    await this.fetchLeads({pageOptions, searchOptions})
                }catch (e) {
                    //this.handleError(e)
                    console.log('Error', e.response)
                }finally {
                    this.loading = false
                }
            },
            handlePageOptionsChange(){

            },
            handleSalesContactSearch(){

            },
            handleSearchReset(){

            },
            handleDelete(){

            },

            handleShow(){

            }

        },
        async mounted() {
            await this.handleGetLeads(this.pageOptions);

        }
    }
</script>

<style scoped>

</style>