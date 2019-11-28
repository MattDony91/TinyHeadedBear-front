<template>
  <div class="">
    
    <h1>영화 목록</h1>

    <select class="form-control" v-model="selectedGenreId">
      <option value="">
        전체보기
      </option>
      <option v-for="genre in genres" :key="genre.id" :value="genre.id">
        {{genre.title}}
      </option>
    </select>
    
    <div class="row card-deck  justify-content-between">
      <MovieListItem v-for="movie in computedGenreId" :key="movie.id" :movie="movie"/>
    </div>
    
  </div>
</template>

<script>
import MovieListItem from './MovieListItem.vue'
export default {
  name: 'MovieList',
  components: {
    MovieListItem,
  },
  data () {
    return {
      selectedGenreId: '',
      temp_arr: []
    }
  },
  props:{
    genres: {
      type:Array,
      
    },
    movies: {
      type:Array,
    }
  },
  computed:{
    computedGenreId() {
      if (!this.selectedGenreId){
        return this.movies
      }
      const movie_list = []
      for (let movie of this.movies) {
        for (let genre of movie.genres) {
          if (genre.id === this.selectedGenreId) {

            movie_list.push(movie)
          }
        }
      }
      console.log(movie_list)
      return movie_list
    }
  },

}
</script>

<style>
select {
  display: block;
  width: 50% !important;
  margin: 2rem auto !important;
}
</style>