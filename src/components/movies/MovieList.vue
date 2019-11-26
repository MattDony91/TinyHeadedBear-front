<template>
  <div class="">
    
    <!-- <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"> -->

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
      <MovieListItem v-for="movie in computedGenreId" v-bind:key="movie.id" :movie="movie"/>
    </div>
    
  </div>
</template>

<script>
// 1-1. 저장되어 있는 MovieListItem 컴포넌트를 불러오고,
import MovieListItem from './MovieListItem.vue'
export default {
  name: 'MovieList',
  // 1-2. 아래에 등록 후
  components: {
    MovieListItem,
  },
  data () {
    return {
      // 활용할 데이터를 정의하시오.
      selectedGenreId: '',
      temp_arr: []
    }
  },
  // 0. props 데이터를 받이 위하여 설정하시오.
  // genres와 movies 모두 타입은 Object이며, 필수입니다.
  // 설정이 완료 되었다면, 상위 컴포넌트에서 값을 넘겨 주세요.
  // 그리고 적절한 곳에 사용하세요.
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
      return movie_list
    }
  }
}
</script>

<style>
select {
  display: block;
  width: 50% !important;
  margin: 2rem auto !important;
}
</style>
