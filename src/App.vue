<template>
  <div id="app">
    
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/" ><i class="fas fa-paw ml-4" style="height:30px;"> 작대곰</i></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse nav" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <div v-if="isAuthenticated" class="row align-items-center">
            <a href="#" @click.prevent="logout">Logout</a>
            <!-- <router-link class="nav-link" to="/mypage">mypage</router-link> -->
            <a href="http://localhost:8000/admin" class="ml-3">관리자 페이지</a>
          </div>
          <div v-else class="row">
            <li class="nav-item">
              <router-link class="nav-link" to="/signup">SignUp</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
          </div>
        </ul>
        
        <form class="w-full max-w-sm">
          <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
            <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="" aria-label="Full name">
            <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
              Search
            </button>
          </div>
        </form>
      </div>
    </nav>

    <div class="container my-4">
      <router-view/>
    </div>
  <go-top></go-top>

  </div>
</template>

<script>
import GoTop from '@inotom/vue-go-top';

export default {
  name: 'App',
  components:{
    GoTop
  },
  data: function(){
    return {
      isAuthenticated: this.$session.has('jwt'),
      // isAuthenticated: this.$store.getters.isAuthenticated
    }
  },
  methods: {
    logout: function(){
      console.log('로그아웃버튼!')
      this.$session.destroy()
      // this.$store.dispatch('logout')
      this.$router.push('/login') 
    },
  
  },
  updated: function(){
    this.isAuthenticated =this.$session.has('jwt')
    // this.isAuthenticated = this.$store.getters.isAuthenticated
  }
 
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

.nav {
  padding: 30px;
}

.nav a {
  font-weight: bold;
  color: whitesmoke;
}

.nav a.router-link-exact-active {
  color: #42b983;
}
</style>
