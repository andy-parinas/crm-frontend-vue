<template>
    <v-autocomplete
            v-model="postcode"
            :items="postcodes"
            :search-input.sync="search"
            :loading="loading"
            :rules="required? [v => !!v || 'This field is required'] : []"
            :disabled="edit"
            color="black"
            label="Postcode"
            return-object
            no-filter
            prepend-icon="mdi-mailbox"
            hint="Enter 3 characters to search"
            persistent-hint
            @keyup="searchOnKeyUp"
            @change="postcodeValueChange"
    ></v-autocomplete>
</template>

<script>
    import ErrorHandlerMixins from "../../../common/mixins/error-handler-mixins";
    import PostcodeApi from "../../../common/api/postcode-api";

    export default {
        name: "PostcodeSelectField",
        props: {
            required: {type: Boolean},
            initialData: {type: [String, null]},
            edit: {type: Boolean}
        },
        data(){
            return {
                loading: false,
                postcodes: [],
                search: '',
                postcode: ''
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            async handlePostcodeSearch(){
                try {
                    if(this.loading) return;

                    this.loading = true;
                    const response = await PostcodeApi.search(this.search);
                    const data = response.data.map(postcode => {
                        return `${postcode.pcode}`
                    })
                    this.postcodes = data;
                }catch (e) {
                    this.handleError(e)
                }finally {
                    this.loading = false;
                }
            },

            async searchOnKeyUp(event){
                const excludedKeys = [
                    9,16,18,17, 112,113,114,115,116,117,118,119,120,121,122, 123,
                    36,35,144,20,45,33,34,27,37,38,39,40,91,13
                ]

                // Do not listen for the Tab Key
                if(event && !excludedKeys.includes(event.keyCode)){
                    if(this.search && this.search.length >= 3 && this.search.trim() !== '' ){
                        await this.handlePostcodeSearch()
                    }
                }

            },
            postcodeValueChange(){
                this.$emit('onValueChanged', this.postcode)
            }
        },
        watch: {
            initialData: {
                handler(){
                    if(this.initialData){
                        this.postcode = this.initialData
                        this.postcodes.push(this.postcode)
                    }
                },
                deep: true
            }
        },
        mounted() {

            if(this.initialData){
                this.postcode = this.initialData
                this.postcodes.push(this.postcode)
            }
        }
    }
</script>

<style scoped>

</style>