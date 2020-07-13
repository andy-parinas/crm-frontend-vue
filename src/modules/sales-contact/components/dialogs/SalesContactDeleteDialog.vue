<template>
    <DeleteDialog title="Delete Sales Contact"
                  :message="message"
                  :deleting="deleting"
                  @close="$emit('close')"
                  @delete="handleSalesContactDelete"  />
</template>

<script>
    import DeleteDialog from "../../../common/components/DeleteDialog";
    import ErrorHandlerMixins from "../../../common/mixins/error-handler-mixins";
    import {mapActions} from 'vuex';

    export default {
        name: "SalesContactDeleteDialog",
        components: {DeleteDialog},
        props: {
            salesContact: {required: true}
        },
        data(){
            return {
                deleting: false
            }
        },
        mixins: [ErrorHandlerMixins],
        computed: {
            message(){
                return this.salesContact ? `${this.salesContact.firstName  } ${this.salesContact.lastName}` : '';
            }
        },
        methods: {
            ...mapActions('salesContacts', ['deleteSalesContact']),
            ...mapActions(['setSuccessMessage']),
            async handleSalesContactDelete(){
                try {
                    this.deleting = true;
                    await this.deleteSalesContact(this.salesContact.id);
                    this.setSuccessMessage("Sales Contact Successfully Deleted");
                    this.$emit('close');

                }catch (e) {
                    this.handleError(e)
                }finally {
                    this.deleting = false;
                }
            }
        }
    }
</script>

<style scoped>

</style>