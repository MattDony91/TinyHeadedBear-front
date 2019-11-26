<template>
  <div>
    <div v-if="loading" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else="" class="login-div col-6 offset-3">
      <div v-if="errors.length" class="error-list alert alert-danger">
        <div v-for="(error, idx) in errors" :key="idx">{{error}}</div>
      </div>
      <div class="form-group row">
        <div class="col-2">
          <label for="userID">ID</label>
        </div>
        <div class="col">
          <input id="userID" class="form-control" type="text" v-model="credential.username">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-2">
          <label for="userPW">PW</label>
        </div>
        <div class="col">
          <input id="userPW" class="form-control" type="password" v-model="credential.password">
        </div>
      </div>
      <button class="btn btn-primary" @click="login">Login</button>
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
            // let user = JSON.parse(response.config.data)
            // console.log(user.username)
            response.data.token
            // if (user.username == 'admin'){동일하게 하는데 } 
        
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