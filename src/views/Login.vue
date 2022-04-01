<template>
  <div class="wrapper">
    <div class="login">
      <input type="text" v-model="userName" />
      <input type="text" v-model="password" />
      <input type="text" v-model="code" />
      <img :src="verifySrc" alt="" />
      <button @click="doLogin">提交</button>
    </div>
  </div>
</template>
<script>
import { GetImage, LoginWithCode } from '@/apis/Authoriza';
import { setCookie } from '@/utils/storage';
export default {
  name: 'Login',
  data() {
    return {
      // 用户名 & 密码
      userName: '',
      password: '',
      code: '',
      key: '',
      verifySrc: '',
    };
  },
  created() {
    this.getVerifyImage();
  },
  methods: {
    async getVerifyImage() {
      let {
        data: {
          data: {
            image: { fileContents, contentType },
            key: key,
          },
        },
      } = await GetImage();
      this.verifySrc = 'data:' + contentType + ';base64,' + fileContents;
      this.key = key;
    },
    async doLogin() {
      const {
        data: { data },
      } = await LoginWithCode({
        username: this.userName,
        password: this.password,
        key: this.key,
        code: this.code,
      });
      setCookie('token', data);
      this.$router.push({
        path: '/home',
      });
    },
  },
};
</script>
<style lang="less" scoped>
.wrapper {
  .login {
    margin: 200px auto;
    display: flex;
    flex-direction: column;
    width: 200px;
  }
  input {
    line-height: 2;
    margin-bottom: 8px;
  }
}
</style>
