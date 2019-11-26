<template>
  <div class="sign-up-form">
    <h1 class="my-4">회원가입</h1>

    <div v-if="loading" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>

    <div v-else="" class="login-div col-6 offset-3">
      <div class="form-group row">
        <div class="col-3">
          <label for="username">Username</label>
        </div>
        <div class="col">
          <input type="text" class="form-control" id="username" aria-describedby="usernameHelp" placeholder="Enter Username" v-model="credential.username">
          <small id="usernameHelp" class="form-text text-muted">Username 똑띠 쓰라</small>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-3">
          <label for="password1">Password</label>
        </div>
        <div class="col">
          <input type="password" class="form-control" id="password1" placeholder="Password" v-model="credential.password">
          <small id="password1Help" class="form-text text-muted">비번!!!</small>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-3">
          <label for="password2">PasswordCheck</label>
        </div>
        <div class="col">
          <input type="password" class="form-control" id="password2" placeholder="Password" v-model="credential.password2">
          <small id="password2Help" class="form-text text-muted">비번!!!</small>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-3">
          <label>Gender</label>
        </div>
        <div class="col">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="radio1" value="1" v-model="credential.gender">
            <label class="form-check-label" for="radio1">남자</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="radio2" value="2" v-model="credential.gender">
            <label class="form-check-label" for="radio2">여자</label>
          </div>
        </div>
      </div>

      <div v-if="errors.length" class="error-list alert alert-danger">
        <div v-for="(error, idx) in errors" :key="idx">{{error}}</div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary" @click.prevent="createUser()">회원가입</button>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'SignUpForm',
  data() {
    return {
      credential: {
        username: '',
        password: '',
        password2: '',
        gender: ''
      },
      loading: false,
      errors: [],
    }
  },
  methods: {
    createUser() {
      if (this.checkForm()) {
        this.loading = true
        this.$emit('createUser', this.credential)
        router.push('/login')
      }
    },
    checkForm () {
      this.errors = []
      if (!this.credential.username) {
        this.errors.push("아이디를 입력해 주세요.")
      }
      if (this.credential.password.length < 8) {
        this.errors.push("비밀번호는 8글자가 넘어야 합니다.")
      }
      if (this.credential.password != this.credential.password2) {
        this.errors.push("비밀번호가 일치하지 않습니다.")
      }
      if (this.credential.gender.length === 0) {
        this.errors.push("성별을 선택해 주세요.")
      }
      if (this.errors.length == 0) {
        return true
      }
    },
  },

}
</script>

<style>
  h1 {
    text-align: center;
  }
</style>