import pagination from "./pagination.js";
import Modal from "./Modal.js";

const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'iris831206';

const app = Vue.createApp({
  data() {
    return {

      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false, //判斷是否為新增產品
      pages: {},
    };
  },
  methods: {
    checkLogin() {
      //驗證登入
      const url = `${apiUrl}/api/user/check`;
      axios.post(url)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message)
          window.location = 'login.html';
        })
    },
    getData(page = 1) {//帶入分頁參數及預設值
      //取得資料
      const url = `${apiUrl}/api/${apiPath}/admin/products?page=${page}`;
      axios.get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pages = res.data.pagination; //取得分頁
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },

    updateProduct() {
      //新增產品
      let url = `${apiUrl}/api/${apiPath}/admin/product`;
      let http = 'post';
      //編輯產品
      if (!this.isNew) {
        url = `${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
        http = 'put'
      }
      axios[http](url, { data: this.tempProduct })
        .then((res) => {
          this.getData(); //重新渲染產品列表
          this.$refs.pModal.closeModal();; //關掉Modal
          this.tempProduct = {}; //清除欄位
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    delProduct() {
      //刪除產品
      const url = `${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
      axios.delete(url, { data: this.tempProduct })
        .then((res) => {
          this.getData();
          this.$refs.pModal.closeDelModal();
          this.tempProduct = {};
        })
        .catch((err) => {
          alert(err.response.data.message);
        })
    },
    openModal(status, item) {
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: [], 
        };
        this.isNew = true;
        this.$refs.pModal.openModal();
      } else if (status === 'edit') {
        this.tempProduct = { ...item };
        this.isNew = false;
        this.$refs.pModal.openModal();
      } else if (status === 'del') {
        this.tempProduct = { ...item };
        this.$refs.pModal.openDelModal();
      }

    },
    createImages(){
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('');
    },
  },

  mounted() {
    //將token存到cookie以進行驗證
    const myCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    axios.defaults.headers.common['Authorization'] = myCookie;
    this.checkLogin();

  },
  components: {
    pagination,
    Modal
  }

})

app.mount('#app') 