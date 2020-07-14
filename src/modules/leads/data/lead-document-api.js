import api, {baseUrl} from "../../common/api/api";
import csrf from "../../common/api/csrf";
import axios from 'axios';

const LeadDocumentApi = {

    async getDocuments(leadId){
        const uri = `/api/leads/${leadId}/documents`;

        const response = await api().get(uri)

        return response.data
    },

    async uploadFile(leadId, data){

        const uri = `/api/leads/${leadId}/documents`;

        await csrf.getCSRFCookie();

        const response = await api().post(uri, data)

        return response.data;
    },

    async downloadFile(leadId, documentId){

        const uri = `/api/leads/${leadId}/documents/${documentId}`;

        const response = await axios({
            url: baseUrl + uri,
            method: 'GET',
            responseType: 'blob',
            withCredentials: true
        })

        return response;
    },

    async deleteFile(leadId, documentId){
        const uri = `/api/leads/${leadId}/documents/${documentId}`;

        const response = await api().delete(uri);

        return response.data;
    }
}

export default LeadDocumentApi;