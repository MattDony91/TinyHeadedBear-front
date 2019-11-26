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
  // props: {
  //   check: {
  //     type: String 
  //   },
  // },
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
    // const GENRE_URL = 'https://gist.githubusercontent.com/Hwakyung/13a1bf7000853e272536d65055000bff/raw/4e4f63cc2b972e1c4a16c1a9df84b597dfa93085/genre.json'
    // const MOVIE_URL = 'https://gist.githubusercontent.com/Hwakyung/1b186c6dd0f9a929af588b3704c9b6e5/raw/cb0c67382ce834404005dad16fe3d035828ab7ee/movie.json'


    // axios.get(GENRE_URL)
    //     .then((response)=>{
    //       console.log(response.data)
    //       this.genres = response.data
    //     })
    //     .catch((error)=>{
    //       console.log(error)
    //     })
    // axios.get(MOVIE_URL)
    //     .then((response)=>{
    //       console.log(response.data)
    //     this.movies = response.data
    //     })
    //     .catch((error)=>{
    //       console.log(error)
    //    })
    const MOVIE_LIST_URL = 'http://127.0.0.1:8000/api/v1/movies/'
    axios.get(MOVIE_LIST_URL)
    .then((res)=> {
      console.log(typeof(res.data))
      console.log(res.data)
      this.movies = res.data
    })
    .catch((err)=> {
      console.log(err)
    })

  }
}
</script>
