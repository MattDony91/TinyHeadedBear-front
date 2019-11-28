<template>

<div class="sign-up-form">
    <h1 class="my-4">회원가입</h1>

    <div v-if="loading" class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else="" class="login-div col-6 offset-3">
    
        <div role="alert"  v-if="errors.length" class="mb-2">
            <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2 text-center">
             🙅‍♀️ Danger 🙅‍♂️
            </div>
            <div  v-for="(error, idx) in errors" :key="idx" class="border-red-400 rounded-b bg-red-100 px-4 py-1 text-red-700 text-center" >
              {{error}}
            </div>
        </div>
    <form class="w-full max-w-lg">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="username">
            아이디
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="username" type="text" v-model="credential.username">
          <p class="text-500 text-xs italic">아이디를 써주세요 :)</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="password1">
            비밀번호
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password1" type="password" placeholder="******************"  v-model="credential.password">
          <p class="text-gray-600 text-xs italic">비밀번호를 입력해주세요!</p>
        </div>
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="password2">
            비밀번호 재확인
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password2" type="password" placeholder="******************"  v-model="credential.password2">
          <p class="text-gray-600 text-xs italic">다시 한 번 더!</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <div class="form-group">
            <div class="row d-block">
              Gender
            </div>
            <div class="row d-block">
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

<!-- 
          <div v-if="errors.length" class="error-list alert alert-danger">
            <div v-for="(error, idx) in errors" :key="idx">{{error}}</div>
          </div> -->


        </div>

    
      </div>
    </form>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click.prevent="createUser()">회원가입</button>

    </div>
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