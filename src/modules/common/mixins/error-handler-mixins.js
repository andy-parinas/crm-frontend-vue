import {mapActions} from 'vuex';
import ErrorHandler from "../helpers/error-handler";

const ErrorHandlerMixins =  {
    methods: {
        ...mapActions(['setErrorMessage']),
        handleError(error){
            if(error.response && error.response.status){
                console.error(error.response.data)
                ErrorHandler.handlerError(error.response.status, (message) => {
                    //this.$emit('throwError', true, message);
                    this.setErrorMessage(message)
                }, error.response)
            }else {
                console.error(error);
                ErrorHandler.handlerError(503, (message) => {
                    //this.$emit('throwError', true, message);
                    this.setErrorMessage(message)
                })
            }
        }
    }
}

export default ErrorHandlerMixins;