<template>
    <div>
        <CardSkeletonLoader :loading="loading" v-if="loading" />
        <v-card flat class="mx-10 mt-5 mb-10" outlined v-else>
            <v-list >
                <template v-for="(document, index) in documents">
                    <v-list-item  :key="document.id">
                        <DocumentIcon :document-type="document.type" />
                        <span class="ml-2">{{ document.title }}</span>
                        <v-spacer></v-spacer>
                        <div class="d-flex">
                            <v-btn  v-if="currentUser.userType !== 'staff_user'"
                                    @click="handleSelectFileToDelete(document)"
                                    x-small fab text color="error" dark>
                                <v-icon small>mdi-trash-can-outline</v-icon>
                            </v-btn>
                            <v-btn  @click="downloadFile(document)"
                                    :loading="document.id === downloadingId"
                                    x-small fab text color="success" dark>
                                <v-icon >mdi-download</v-icon>
                            </v-btn>
                        </div>
                    </v-list-item>
                    <v-divider
                            v-if="index + 1 < documents.length"
                            :key="index"
                    ></v-divider>
                </template>
            </v-list>
        </v-card>
        <v-divider></v-divider>
        <v-row v-if="currentUser.userType !== 'staff_user'"
               class="mx-10 mt-10 mb-5" align="center">
            <v-file-input v-model="fileForUpload"
                          show-size label="Lead Document"></v-file-input>
            <v-btn @click="handleFileUpload"
                   :loading="uploading"
                   :disabled="fileForUpload === null"
                   small color="primary" class="text--white ml-3">
                Upload
                <v-icon small>mdi-upload</v-icon>
            </v-btn>
        </v-row>
        <v-dialog v-model="showDeleteDialog" persistent max-width="450" class="px-2">
            <DeleteDialog title="Delete Document"
                          :message="fileToDelete? fileToDelete.title : ''"
                          :deleting="deleting"
                        @delete="handleFileDelete"/>
        </v-dialog>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import LeadDocumentApi from "../../data/lead-document-api";
    import DocumentIcon from "../../../common/components/DocumentIcon";
    import CardSkeletonLoader from "../ui/CardSkeletonLoader";
    import DeleteDialog from "../../../common/components/DeleteDialog";

    export default {
        name: "LeadDocumentDetails",
        components: {DeleteDialog, CardSkeletonLoader, DocumentIcon},
        props: {
            leadId: {required: true}
        },
        data(){
            return {
                loading: false,
                documents: [],
                fileForUpload: null,
                uploading: false,
                downloadingId: null,
                showDeleteDialog: false,
                deleting: false,
                fileToDelete: null

            }
        },
        computed: {
            ...mapState('auth', ['currentUser'])
        },
        methods: {
            ...mapActions(['setSuccessMessage', 'setErrorMessage']),
            async getDocuments(){
                try {
                    this.loading = true;
                    const response = await LeadDocumentApi.getDocuments(this.leadId)
                    this.documents = response.data;
                }catch (e) {
                    this.handleError(e)
                }finally {
                    this.loading = false
                }

            },
            async handleFileUpload(){
                const data = new FormData();
                data.append('file', this.fileForUpload)
                data.append('title', this.fileForUpload.name)
                data.append('type', this.fileForUpload.type? this.fileForUpload.type : "unknown" )

                try {
                    this.uploading = true;

                    const response = await LeadDocumentApi.uploadFile(this.leadId, data);
                    this.documents.push(response.data);

                    this.fileForUpload = null
                    this.setSuccessMessage('File successfully uploaded');

                }catch (e) {
                    this.handleError(e)
                }finally {
                    this.uploading = false;
                }

            },
            async downloadFile(doc){

                const file = doc.title.replace(" ", "_")

                try {
                    this.downloadingId = doc.id
                    const response = await LeadDocumentApi.downloadFile(this.leadId, doc.id)
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');

                    link.href = url;
                    link.setAttribute('download', file)
                    document.body.appendChild(link);
                    link.click();

                }catch (e) {
                    this.handleError(e)
                }finally {
                    this.downloadingId = null;
                }



            },
            handleSelectFileToDelete(doc){
                this.fileToDelete = Object.assign({}, doc);
                this.showDeleteDialog = true;
            },
            onCancelDelete(){
                this.fileToDelete = null;
                this.showDeleteDialog = false
            },
            async handleFileDelete(){

                try {
                    this.deleting = true;

                    await LeadDocumentApi.deleteFile(this.leadId, this.fileToDelete.id);
                    this.documents = this.documents.filter(doc => doc.id !== this.fileToDelete.id);
                    this.setSuccessMessage("File successfully deleted");
                    this.fileToDelete = null;
                    this.showDeleteDialog = false;

                }catch (e) {
                    this.handleError(e)
                }finally {
                    this.deleting = false;
                }

            }
        },
        mounted() {
            console.log('Document Mounted', this.leadId)
            if(this.leadId){
                this.getDocuments();
            }
        }

    }
</script>

<style scoped>

</style>