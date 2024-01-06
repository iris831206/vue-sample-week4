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
                    console.log(res);
                    const { token, expired } = res.data;
                    console.log(token, expired);
                    document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
                }).catch((err) => {
                    alert(err.response.data.message);
                });
        },
        checkLogin() {
            //驗證登入
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
                .then((res) => {
                    console.log(res.data);
                })
                .catch((err) => {
                    alert(err.response.data.message)
                })
        },
        getData() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
            axios.get(url)
                .then((res) => {
                    console.log(res);
                    this.products = res.data.products;
                })
                .catch((err) => {
                    alert(err.response.data.message);
                })
        },

    },
    mounted() {
        //將token存到cookie
        const myCookie = document.cookie.replace(
            /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
            "$1",
        );
        console.log(myCookie);
        axios.defaults.headers.common['Authorization'] = myCookie;
    },
}).mount('#app');
