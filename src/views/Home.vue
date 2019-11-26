<template>
  <div class="home">
    <div class="my-5">
      <BoxOffice/>
      <MovieList :movies="movies" :genres="genres"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import router from '../router'
import { mapGetters } from 'vuex'
import MovieList from '../components/movies/MovieList.vue'
import BoxOffice from '../components/movies/BoxOffice.vue'
export default {
  name: 'home',

  components: {
    MovieList,
    BoxOffice,
  },
  computed:{
    // 구조를 분해하는 문법
    ...mapGetters([
      'isAuthenticated',
      'requestHeader',
      'userId',
    ])
  },
  data() {
    return {
      // 활용할 데이터를 정의하시오.
      movies: [],
      genres: []
    }
  },

  methods: {
    checkLoggedIn(){
      // Session Storage에 token이 있으면 login 된 상태
      this.$session.start() // session 시작
      // session에 jwt가 없으면
      // if (!this.$session.has('jwt')){

      if (!this.isAuthenticated){
        // 로그인 페이지로 redirect
        router.push('/login')
      }
    },
    mounted: function(){
    this.checkLoggedIn() // 로그인 되었는지 확인
  }
  },
  mounted(){
    const MOVIE_LIST_URL = 'http://127.0.0.1:8000/api/v1/movies/'
    axios.get(MOVIE_LIST_URL)
      .then((res)=> {
        this.movies = res.data
      })
      .catch((err)=> {
        console.log(err)
      })
    const GENRE_LIST_URL = 'http://127.0.0.1:8000/api/v1/movies/genres/'
    axios.get(GENRE_LIST_URL)
      .then(res => this.genres = res.data)
      .catch(err => console.log(err))
  }
}
</script>
