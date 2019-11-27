<template>
  <div class="my-3 col-3" id='tempid'>
    <div class="card">
      <img :src="movie.poster_url"  :alt="movie.title" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">{{movie.title}}</h5>
        <router-link class="btn btn-sm btn-info" :to="{name: 'movie', params: {movie}}">상세보기</router-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MovieListItem',
  props: {
    movie: Object,
  },
  mehtods: {
    sendMovie() {
      console.log('이거 발생함돠')
    }
  }

}

</script>

<style>
.movie--poster {
  width: 200px;
}
</style>
