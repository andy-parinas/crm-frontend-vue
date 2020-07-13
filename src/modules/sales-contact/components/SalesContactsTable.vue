<template>
    <div>
        <v-card>
            <v-card-title id="table-header" >
                <SearchBySelectionForm :selections="selections"
                                       @search="handleSalesContactSearch"
                                        @reset="handleSearchReset"/>
            </v-card-title>
            <v-data-table
                    :items="salesContacts"
                    :options.sync="pageOptions"
                    :headers="headers"
                    :server-items-length="pagination.total"
                    :single-expand="true"
                    :loading="loading"
                    :footer-props="footerProps"
                    @update:page="handlePageOptionsChange"
                    @update:sort-by="handlePageOptionsChange"
                    @update:sort-desc="handlePageOptionsChange"
                    @update:items-per-page="handlePageOptionsChange"
                    item-key="id"
                    show-expand
                    class="elevation-0">


                <template v-slot:item.actions="{ item }">
                    <v-container>
                        <v-row class="justify-sm-start">
                            <v-btn x-small fab text dark color="error" class="mr-3"  v-if="isHeadOffice"  @click="handleDelete(item)">
                                <v-icon small >mdi-trash-can-outline </v-icon>
                            </v-btn>
                            <v-btn x-small fab text dark color="accent" @click="handleEdit(item)" >
                                <v-icon small> mdi-pencil</v-icon>
                            </v-btn>
                            <v-btn x-small fab text dark color="success" class="ml-3" @click="handleConvertToLead(item)">
                                <v-icon small>mdi-account-convert</v-icon>
                            </v-btn>
                        </v-row>
                    </v-container>


                </template>
                <template v-slot:expanded-item="{ headers, item }">
                    <SalesContactDetails :length="headers.length" :item="item" />
                </template>

            </v-data-table>
        </v-card>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import SearchBySelectionForm from "../../common/components/SearchBySelectionForm";
    import ErrorHandlerMixins from "../../common/mixins/error-handler-mixins";
    import SalesContactDetails from "./SalesContactDetails";

    export default {
        name: "SalesContactsTable",
        components: {SalesContactDetails, SearchBySelectionForm},
        data(){
            return {
                falseData: [],
                editDialog: false,
                deleteDialog: false,
                deleting: false,
                initialSearch: false,
                loading: false,
                formLoading: false,
                headers: [
                    { text: 'First Name',value: 'firstName'},
                    { text: 'Last Name', value: 'lastName' },
                    { text: 'Suburb', value: 'suburb' },
                    { text: 'State', value: 'state' },
                    { text: 'Postcode', value: 'postcode' },
                    { text: 'Actions', value: 'actions', sortable: false },
                    { text: '', value: 'data-table-expand' },
                ],
                searchFor: '',
                searchIn: '',
                selections: [
                    { text: 'First Name',value: 'first_name'},
                    { text: 'Last Name', value: 'last_name' },
                    { text: 'Suburb', value: 'suburb' },
                    { text: 'State', value: 'state' },
                    { text: 'Postcode', value: 'postcode' },
                ],
                pageOptions: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['firstName'],
                    sortDesc: [false],
                    groupBy: [],
                    groupDesc: [],
                    mustSort: false,
                    multiSort: false
                },
                defaultOptions: {
                    page: 1,
                    itemsPerPage: 10,
                    sortBy: ['firstName'],
                    sortDesc: [false],
                    groupBy: [],
                    groupDesc: [],
                    mustSort: false,
                    multiSort: false
                },
                footerProps: {
                    "items-per-page-options": [5,10,15,20],
                    disablePagination: false,
                    disableItemsPerPage : false
                },
                editedItemIndex: -1,
                selectedItem: null,
            }
        },
        computed: {
            ...mapState('salesContacts', {
                salesContacts: state => state.salesContacts,
                pagination: state => state.pagination
            }),
            ...mapState('auth', ['currentUser']),
            isHeadOffice(){
                return  this.currentUser.userType === 'head_office';
            },
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions('salesContacts',['fetchSalesContacts']),
            async handleGetSalesContacts(pageOptions, searchOptions){
                try {
                    if(this.loading) return;

                    this.loading = true;
                    this.$set(this.footerProps, 'disablePagination', true)
                    this.$set(this.footerProps, 'disableItemsPerPage', true)

                    await this.fetchSalesContacts({pageOptions, searchOptions})

                }catch (e) {
                    this.handleError(e)
                }finally {
                    this.loading = false;
                    this.$set(this.footerProps, 'disablePagination', false)
                    this.$set(this.footerProps, 'disableItemsPerPage', false)
                }
            },
            handlePageOptionsChange(){
                if(this.searchIn.trim() !== '' && this.searchFor.trim() !== '')
                {
                    this.handleGetSalesContacts(this.pageOptions, {
                        searchFor: this.searchFor,
                        searchIn: this.searchIn
                    });
                }else {
                    this.handleGetSalesContacts(this.pageOptions);
                }
            },

            handleDelete(){

            },

            handleEdit(){

            },

            handleConvertToLead(){


            },
            handleSalesContactSearch({searchIn, searchFor}){
                this.searchFor = searchFor;
                this.searchIn = searchIn;

                this.pageOptions = Object.assign({}, this.defaultOptions);

                if(this.searchIn.trim() !== '' && this.searchFor.trim() !== '')
                {
                    this.handleGetSalesContacts(this.pageOptions, {
                        searchFor: this.searchFor,
                        searchIn: this.searchIn
                    });
                }
            },

            handleSearchReset(){
                this.searchFor = '';
                this.searchIn = '';
                this.pageOptions = Object.assign({}, this.defaultOptions);
                this.handleGetSalesContacts(this.pageOptions,);
            }

        },
        mounted() {
            this.handleGetSalesContacts(this.pageOptions)
        }
    }
</script>

<style scoped>

</style>