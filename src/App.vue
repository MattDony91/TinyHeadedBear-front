<template>
  <div id="app">
    
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link class="navbar-brand" to="/">작은 대가리 곰</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse nav" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <div v-if="isAuthenticated" class="row align-items-center">
            <a href="#" @click.prevent="logout">logout</a>
            <router-link class="nav-link" to="/mypage">mypage</router-link>
            <a href="http://localhost:8000/admin">관리자 페이지</a>
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
        
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </nav>

    <div class="container">
      <router-view/>
    </div>
    <!-- <Home :check="isAuthenticated"/> -->
  </div>
</template>
<script>
// import Login from './views/Login.vue'
// import Home from './views/Home.vue'
export default {
  name: 'App',
  components:{
    // Home,
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
