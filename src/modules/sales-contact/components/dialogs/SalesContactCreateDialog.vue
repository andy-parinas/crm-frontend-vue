<template>
    <v-card>
        <DialogHeader title="Create Sales Contact" @close="handleDialogClose" />
        <SalesContactForm
                ref="salesContactForm"
                :saving="saving"
                @onSave="handleSalesContactCreate"/>
    </v-card>
</template>

<script>
    import DialogHeader from "../../../common/components/DialogHeader";
    import SalesContactForm from "../forms/SalesContactForm";
    import {mapActions} from 'vuex';
    import ErrorHandlerMixins from "../../../common/mixins/error-handler-mixins";

    export default {
        name: "SalesContactCreateDialog",
        components: {SalesContactForm, DialogHeader},
        data(){
            return {
                saving: false,
            }
        },
        mixins: [ErrorHandlerMixins],
        methods: {
            ...mapActions('salesContacts', ['createSalesContact']),
            ...mapActions(['setSuccessMessage']),
            async handleSalesContactCreate(formData){
                try {
                    this.saving = true;
                    await this.createSalesContact(formData);
                    this.setSuccessMessage("Sales Contact Successfully Created")
                    this.handleDialogClose();

                }catch (e) {
                    this.handleError(e)
                }finally {
                    this.saving = false
                }
            },
            handleDialogClose(){
                this.$refs.salesContactForm.reset();
                this.$emit('close');
            }
        }
    }
</script>

<style scoped>

</style>