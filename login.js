import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'iris831206',
        };
    },
    methods: {
        login() {
            const url = `${this.apiUrl}/admin/signin`;
            axios.post(url, this.user)
                .then((res) => {
                    const { token, expired } = res.data;
                    document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path:/`;
                    window.location = 'index.html';
                }).catch((err) => {
                    alert(err.response.data.message);
                });
        },

    },
}).mount('#app');
