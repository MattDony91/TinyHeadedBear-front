<template>
  <div class="w-full max-w">
  <div v-if="loading" class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <div v-else="" class="login-div col-6 offset-3">
    <div v-if="errors.length"  class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
      <div v-for="(error, idx) in errors" :key="idx">{{error}}</div>
    </div>
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 my-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="userID">
        Username
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="userID" type="text" placeholder="Username" v-model="credential.username">
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="userPW">
        Password
      </label>
      <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  v-model="credential.password" id="userPW" type="password" placeholder="******************">
      <p class="text-red-500 text-xs italic">비밀번호를 써주세요</p>
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" @click="login" type="button">
        Log In
      </button>
    </div>
  </form>
  </div>
</div>
</template>
<script>
import axios from 'axios'
import router from '../router'
// import
export default {
  name: 'LoginForm',
  data: function () {
    return {
      credential: {
        username: '',
        password: ''
      },
      loading: false,
      errors: [],
    }
  },
  methods: {
    login() {
      if (this.checkForm()) {
        axios.post('http://localhost:8000/api-token-auth/', this.credential)
          .then(response => {
            this.loading = true
            response.data.token
            this.$session.start()
            this.$session.set('jwt', response.data.token) // 저장을 한다.
            router.push('/')
          })
          .catch(() => {
            alert('해당하는 아이디 또는 비밀번호가 없습니다.');
            this.credential.username = ''
            this.credential.password = ''
          })
        this.$emit('checkUser',this.credential.username)
      }
    },
    checkForm () {
      this.errors = []
      if (this.credential.password.length < 8) {
        this.errors.push("비밀번호는 8글자가 넘어야 합니다.")
      }
      if (!this.credential.username) {
        this.errors.push("아이디를 입력해 주세요.")
      }
      console.log(this.errors)
      if (this.errors.length == 0) {
        return true
      }
    },
  },
}
</script>
<style>
</style>