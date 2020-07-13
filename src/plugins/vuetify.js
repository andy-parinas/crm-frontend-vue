import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'



Vue.use(Vuetify);

export default new Vuetify({
    icons:{
        iconfont: 'mdi'
    },
    theme: {
        themes: {
            light: {
                primary: '#1867C0',
                secondary: '#5CBBF6',
                tertiary: '#E57373',
                accent: '#005CAF',
            }
        }
    }
});
