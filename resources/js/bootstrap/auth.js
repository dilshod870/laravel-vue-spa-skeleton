import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import VueAuth from '@websanova/vue-auth'
import {Message} from 'element-ui';

Vue.use(VueAxios, axios)
let token = document.head.querySelector('meta[name="csrf-token"]')
axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = process.env.MIX_API_ENDPOINT

// Response interceptor
axios.interceptors.response.use(response => response, error => {

    if (error.response.data.errors) {
        // validate errors
    } else if (error.response.data.message) {
        Message.error(window.Vue.$t('global.unknown_server_error'))
        console.error('--- ', error.response.data.message)
    } else {
        Message.error(window.Vue.$t('global.unknown_server_error'))
    }

    return Promise.reject(error)
})

Vue.use(VueAuth, {
    auth:           require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http:           require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router:         require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    loginData:      { url: process.env.MIX_API_ENDPOINT + 'auth/login' },
    logoutData:     { url: process.env.MIX_API_ENDPOINT + 'auth/logout', redirect: '/login' },
    registerData:   { url: process.env.MIX_API_ENDPOINT + 'auth/register', method: 'POST'},
    fetchData:      { url: process.env.MIX_API_ENDPOINT + 'auth/me', method: 'POST' },
    refreshData:    { enabled: false },
});
