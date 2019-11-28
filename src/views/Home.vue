<template>
  <div class="home">
    <div class="my-5">
      <div class="row">
        <div class="col">
          <BoxOffice/>
        </div>
        <div class="col">
          <ThumsupMovie/>
        </div>
      </div>
      <MovieList :movies="movies" :genres="genres"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import MovieList from '../components/movies/MovieList.vue'
import BoxOffice from '../components/movies/BoxOffice.vue'
import ThumsupMovie from '../components/movies/ThumsupMovie.vue'

export default {
  name: 'home',

  components: {
    MovieList,
    BoxOffice,
    ThumsupMovie,
  },
  data() {
    return {
      // 활용할 데이터를 정의하시오.
      movies: [],
      genres: []
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
