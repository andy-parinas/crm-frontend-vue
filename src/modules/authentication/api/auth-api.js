import api from "../../common/api/api";
import csrf from "../../common/api/csrf";


const AuthAPi =  {

    async login(loginData) {
        await csrf.getCSRFCookie();

        const response =  await api().post('/api/login', loginData);

        console.log('AuthAPI', response);

        return response;
    },

    async logout(){
        await csrf.getCSRFCookie();

        return api().post('/api/logout');
    }
}

export default AuthAPi;