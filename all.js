const app = Vue.createApp({
  data() {
    return {
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'iris831206',
      products: [],
      tempProduct: {},
    };
  },
  methods: {
    checkLogin() {
      //驗證登入
      const url = `${this.apiUrl}/api/user/check`;
      axios.post(url)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message)
          window.location = 'login.html';
        })
    },
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      axios.get(url)
        .then((res) => {
          //console.log(res);
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    }
  },

  mounted() {
    //將token存到cookie
    const myCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    axios.defaults.headers.common['Authorization'] = myCookie;
    this.checkLogin()
  },

})

app.mount('#app') 