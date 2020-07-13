import api from "../../common/api/api";
import csrf from "../../common/api/csrf";
import URIBuilder from "../../common/helpers/uri-builders";


const LeadApi = {
    async getLeads(pageOptions, searchOption){

        const requestUri = '/api/leads'
        const uri = URIBuilder.build(requestUri, pageOptions, searchOption)

        const response = await api().get(uri);

        return response.data;
    },

    async getSingleLead(leadId){

        const requestUri = `/api/leads/${leadId}`

        const response = await api().get(requestUri);

        return response.data.data;
    },

    async createLead(formData){

        //Normalize the Data
        const data = {
            lead: {
                sales_contact_id: formData.sales_contact_id,
                lead_source_id: formData.details.leadSourceId,
                lead_date: formData.details.leadDate,
                lead_number: formData.details.leadNumber
            },
            job_type: {
                taken_by: formData.jobType.takenBy,
                date_allocated: formData.jobType.dateAllocated,
                description: formData.jobType.description,
                product_id: formData.jobType.productId,
                design_assessor_id: formData.jobType.designAssessorId
            },
            appointment: {
                appointment_date: `${formData.appointment.appointmentDate} ${formData.appointment.appointmentTime}`,
                appointment_notes: formData.appointment.notes,
                quoted_price: formData.appointment.quotedPrice,
                outcome: formData.appointment.outcome,
                comments: formData.appointment.comments,
            }

        }

        const uri = `/api/franchises/${formData.details.franchiseId}/leads`;

        await csrf.getCSRFCookie();

        const response = await api().post(uri, data);


        return response.data;

    },

    async updateLeadDetails(formData){

        //Normalize the data
        const data = {
            lead_number:  formData.leadNumber,
            lead_date: formData.leadDate,
            franchise_id: formData.franchiseId,
            lead_source_id: formData.leadSourceId
        }

        const uri = `/api/leads/${formData.id}`;

        await csrf.getCSRFCookie();

        const response = await api().patch(uri, data);

        return response.data;
    },


    async updateJobType(leadId, formData){
        //Normalize the data
        const data = {
            taken_by: formData.takenBy,
            date_allocated: formData.dateAllocated,
            product_id: formData.productId,
            design_assessor_id: formData.designAssessorId,
            description: formData.description
        }

        const uri = `/api/leads/${leadId}/job-types/${formData.id}`;

        await csrf.getCSRFCookie();

        const response = await api().patch(uri, data);

        return response.data;
    },

    async updateAppointment(leadId, formData)
    {

        // Normalized Data
        const data = {
            appointment_date: formData.date,
            appointment_notes: formData.notes,
            outcome: formData.outcome,
            quoted_price: formData.quotedPrice,
            comments: formData.comments
        }

        const uri = `/api/leads/${leadId}/appointments/${formData.id}`;

        await csrf.getCSRFCookie();

        const response = await api().patch(uri, data);

        return response.data;
    },

    async deleteLead(leadId){
        const uri = `/api/leads/${leadId}`;

        await csrf.getCSRFCookie();

        const response = await api().delete(uri);

        return response.data;

    }

}

export default LeadApi;