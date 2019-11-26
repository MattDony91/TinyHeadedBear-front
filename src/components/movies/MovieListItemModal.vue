<template>
<!-- vue 콘솔에서 확인하여, 추가 정보들도 출력하세요. -->
<!-- 고유한 모달을 위해 id 속성을 정의하시오. 예) movie-1, movie-2, ... -->
<!-- v-bind:id movie.id 에러가 -->
<div class="modal fade" :id="'movie'+movie_detail.id" tabindex="-1" role="dialog">

  <div class="modal-dialog" role="document">

    <div class="modal-content">
      <div class="row">
        <div class="col-4">
          <img src="" alt="">
        </div>
        <div class="col">
          <div class="modal-header">
            <div>
              <h3 class="modal-title">{{movie_detail.title}}</h3>
              <h5>{{movie_detail.subtitle}}</h5>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <p>개요
              <span v-if="movie_detail.open_date != '정보없음'">| {{movie_detail.open_date}} </span>
              <span v-if="movie_detail.running_time != '정보없음'">| {{movie_detail.running_time}} </span>
              <!-- <span v-if="movie_detail.watch_grade.watch_grade != '정보없음'">| {{movie_detail.watch_grade.watch_grade}} </span> -->
            </p>
            <p>감독 <span v-for="director in movie_detail.directors" :key="director.id">| {{director.name}}</span></p>
            <p>출연 <span v-for="actor in movie_detail.actors" :key="actor.id">| {{actor.name}}</span></p>
            <p>누적관객 <span>| {{movie_detail.audience}}</span></p>
            <hr>
            <p>{{movie_detail.description}}</p>
          </div>
        </div>
      </div>
      <!-- <div class="modal-footer">
        
      </div> -->
      
      <ul class="list-group">
        <li class="list-group-item d-flex flex-row align-items-stretch m-0 p-0 row">
          <input class="flex-fill col-2" type="number" placeholder="평점" v-model="score">
          <input class="flex-fill col-9" type="text" placeholder="리뷰를 남겨주세요." v-model="comment">
          <button class="btn btn-info btn-sm col-1" @click="create_review">📝</button>
        </li>
        <li class="list-group-item" v-for="review in movie_detail.review_set" :key="review.id">{{review.score}} | {{review.comment}}</li>
      </ul>

      
        
    </div>
  
  </div>

</div>
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'

export default {

  name: 'movie-list-item-modal',
  components:{
    // Review,
  },
  props:{
    movie: Object
  },
  data(){
    return {
      movie_detail: '',
      comment: '',
      score: '',
    }
  },
  mounted(){
    const MOVIE_DETAIL_URL = 'http://127.0.0.1:8000/api/v1/movies/'
    axios.get(MOVIE_DETAIL_URL + this.movie.id)
      .then(res => {
      this.movie_detail = res.data})
      .catch(err => console.log(err))
  },
  methods: {
    create_review(){
      this.$session.start()
      const token = this.$session.get('jwt')
      const decodedToken = jwtDecode(token)
      const user_id = decodedToken.user_id
      const requestHeader = {
        headers: {
          Authorization: `JWT ${token}`
        }
      }
      // console.log(requestHeader)
      const REVIEW_URL = `http://localhost:8000/api/v1/movies/${this.movie.id}/review/create/`
      const requestForm = new FormData()
      requestForm.append('user', user_id)
      requestForm.append('score', this.score)
      requestForm.append('comment', this.comment)

      axios.post(REVIEW_URL, requestForm, requestHeader)
        .then((res)=> {
          console.log(res.data)
          console.log(this.movie_detail)
          this.movie_detail.review_set.push(res.data)
          this.score = ''
          this.comment = ''
          })
        .catch((err)=>{console.log(err)})
    }
  }
}
</script>

<style>

</style>