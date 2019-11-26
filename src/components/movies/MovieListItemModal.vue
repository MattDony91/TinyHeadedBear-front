<template>
<!-- vue 콘솔에서 확인하여, 추가 정보들도 출력하세요. -->
<!-- 고유한 모달을 위해 id 속성을 정의하시오. 예) movie-1, movie-2, ... -->
<!-- v-bind:id movie.id 에러가 -->
<div class="modal fade " :id="'movie'+movie_detail.id" tabindex="-1" role="dialog">

  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <div>
        <h5 class="modal-title">{{movie_detail.title}} ({{movie_detail.subtitle}})</h5>
        </div>
        <p>{{movie_detail.open_date}}</p>
        <p>{{movie_detail.actor}}</p>
        <!-- <p>{{movie_detail.directors}}</p> -->
        <!-- <p v-for="m for movie_detail" :key="m.id">{{movie_detail.genres}}</p> -->
        <!-- <p>{{movie_detail.watch_grade}}</p> -->
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body">
        <p class="my-3">줄거리</p>
        <p>{{movie_detail.description}}</p>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-warning btn-sm " data-dismiss="modal">Close</button>
      </div>
      <hr>
        <Review/>
    </div>
  
  </div>

</div>
</template>

<script>
import axios from 'axios'
import Review from './Review.vue'
export default {

  name: 'movie-list-item-modal',
  components:{
    Review,
  },

  props:{
    movie: Object
  },
  data(){
    return {
      movie_detail: ''
    }
  },
  mounted(){
    const MOVIE_DETAIL_URL = 'http://127.0.0.1:8000/api/v1/movies/'
    axios.get(MOVIE_DETAIL_URL + this.movie.id)
      .then(res => {
      this.movie_detail = res.data})
      .catch(err => console.log(err))
  }
}
</script>

<style>

</style>
