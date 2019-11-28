<template>
  <div class="my-3 col-3" id='tempid'>
    <div class="card">
      <img :src="movie.poster_url"  :alt="movie.title" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">{{movie.title}}</h5>
        <button :id="'btn' + movie.id" class="btn btn-sm btn-info" data-toggle="modal" :data-target="'#movie' + movie.id">상세보기</button>
      </div>
    </div>
    <!-- img 태그에 src와 alt값(영화제목)을 설정하시오 -->
    <MovieListItemModal :movie="movie"/>
  </div>
</template>

<script>
// 1-1. 저장되어 있는 MovieListItemModal 컴포넌트를 불러오고,
// import axios from 'axios'
import MovieListItemModal from './MovieListItemModal.vue'

export default {
  name: 'MovieListItem',
  // 1-2. 아래에 등록 후
  components: {
    MovieListItemModal,
  },
  // 0. props 데이터를 받기 위하여 설정하시오.
  // movie 타입은 Object이며, 필수입니다.
  // 설정이 완료 되었다면, 상위 컴포넌트에서 값을 넘겨 주세요.
  // 그리고 적절한 곳에 사용하세요.
  props: {
    movie: Object,
  },

}

</script>

<style>
.movie--poster {
  width: 200px;
}
</style>
