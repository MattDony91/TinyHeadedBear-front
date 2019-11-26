<template>
  <div>
    <h1 class="my-4">Login Page</h1>
    <!-- <LoginForm @checkUser="checkUser"/> -->
    <LoginForm/>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  methods: {
  //    update(message){
  //   this.$emit("checkUser",message)
  // }
  },

}
</script>

<style>

</style>