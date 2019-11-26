<template>
  <div class="sign-up">
    <SignUpForm @createUser="createUser"/>
  </div>
</template>

<script>
import axios from 'axios'
import SignUpForm from '../components/SignUpForm'

export default {
  name: 'SignUp',
  components: {
    SignUpForm
  },
  methods: {
    createUser(credential) {
      const url = `http://127.0.0.1:8000/api/v1/accounts/signup/`
      
      const requestForm = new FormData()
      requestForm.append('username', credential.username)
      requestForm.append('password', credential.password)
      requestForm.append('gender', credential.gender)

      axios.post(url, requestForm)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }
  }
}
</script>

<style>

</style>