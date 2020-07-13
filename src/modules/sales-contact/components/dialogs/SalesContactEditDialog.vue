<template>
    <v-card>
        <DialogHeader title="Create Sales Contact" @close="handleDialogClose" />
        <SalesContactForm
                ref="salesContactForm"
                :saving="saving"
                :initial-data="salesContact"
                @onSave="handleSalesContactUpdate"/>
    </v-card>
</template>

<script>
    import DialogHeader from "../../../common/components/DialogHeader";
    import SalesContactForm from "../forms/SalesContactForm";
    import {mapActions} from 'vuex';
    import ErrorHandlerMixins from "../../../common/mixins/error-handler-mixins";

    export default {
        name: "SalesContactEditDialog",
        components: {SalesContactForm, DialogHeader},
        props: {
            salesContact: {type: [Object, null]}
        },
        data(){
            return {
                saving: false
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions('salesContacts', ['updateSalesContact']),
            ...mapActions(['setSuccessMessage']),

            async handleSalesContactUpdate(formData){
                try {

                    this.saving = true;
                    await this.updateSalesContact(formData);
                    this.handleDialogClose();

                    this.setSuccessMessage("Sales Contact Successfully Updated")

                }catch (e) {
                    this.handleError(e)
                }finally {
                    this.saving = false;
                }
            },
            handleDialogClose(){
                this.$emit('close');
            }
        }
    }
</script>

<style scoped>

</style>