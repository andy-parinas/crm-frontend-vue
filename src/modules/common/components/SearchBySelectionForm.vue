<template>
    <v-row align-content="end" justify="start">
        <v-col cols="12" md="7"  sm="12">
            <v-text-field
                    v-model="searchFor"
                    label="Search" single-line hide-details>
            </v-text-field>
        </v-col>
        <v-col cols="12" md="3"  sm="12">
            <v-select v-model="searchIn" :items="selections" label="Search In" single-line ></v-select>
        </v-col>
        <v-col cols="12" md="2" sm="12">
            <v-btn color="secondary" fab small elevation="3" class="mr-2 white--text"
                   :disabled="cantSearch"
                   @click="$emit('search', {searchFor,searchIn})">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn color="success" fab small elevation="3" class="mr-2 white--text"
                   @click="resetSearch">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "SearchBySelectionForm",
        props: {
            selections: {required: true, type: Array}
        },
        data(){
            return {
                searchFor: '',
                searchIn: '',
            }
        },
        computed:{
            cantSearch(){
                return this.searchIn.trim() === '' || this.searchFor.trim() === '';
            }
        },
        methods: {
            resetSearch(){
                this.searchFor = '';
                this.searchIn = '';
                this.$emit('reset');
            }
        }
    }
</script>

<style scoped>

</style>