<template>
   <div class="mypage">
    
    <MyPageForm/>
  </div>
</template>

<script>
//userid를 axios를 해서 serialize
// import axios from 'axios'
import MyPageForm from '../components/MyPageForm'
export default {
  name: 'MyPage',
  components: {
    MyPageForm,
  },
  methods: {
    // userdetail() {
    //   axios.post('http://localhost:8000/api-token-auth/',)
    // }

  }
}
</script>

<style>

</style>