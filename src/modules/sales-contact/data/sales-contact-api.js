import api from "../../common/api/api";
import csrf from "../../common/api/csrf";
import URIBuilder from "../../common/helpers/uri-builders";

const SalesContactApi = {

    normalizeFormData(formData){
        return {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            email2: formData.email2,
            contact_number: formData.contactNumber,
            street1: formData.street1,
            street2: formData.street2,
            suburb: formData.suburb,
            state: formData.state,
            postcode: formData.postcode,
            customer_type: formData.customerType,
            status: formData.status
        }
    },

    async getContacts(pageOptions, searchOptions){

        const uri = URIBuilder.build('/api/contacts',pageOptions, searchOptions )

        const response = await api().get(uri);

        return response.data;
    },

    async update(formData){

        const data = this.normalizeFormData(formData)

        await csrf.getCSRFCookie();

        const response = await api().put(`/api/contacts/${formData.id}`, data);

        return response.data.data;

    },
    async create(formData){

        const data = this.normalizeFormData(formData);

        await csrf.getCSRFCookie();

        const response = await api().post('/api/contacts', data);

        return response.data.data;
    },

    async delete(id){

        await csrf.getCSRFCookie();

        const response = await api().delete(`/api/contacts/${id}`);

        return response.data.data;
    }


}

export default SalesContactApi;