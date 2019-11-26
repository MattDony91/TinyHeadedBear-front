<template>
<!-- vue 콘솔에서 확인하여, 추가 정보들도 출력하세요. -->
<!-- 고유한 모달을 위해 id 속성을 정의하시오. 예) movie-1, movie-2, ... -->
<!-- v-bind:id movie.id 에러가 -->
<div class="modal fade" :id="'movie'+movie_detail.id" tabindex="-1" role="dialog">

  <div class="modal-dialog" role="document">

    <div class="modal-content">
      <div class="modal-header">
        <div>
          <h3 class="modal-title">{{movie_detail.title}}</h3>
          <h5>{{movie_detail.subtitle}}</h5>
        </div>
        <p>{{movie_detail.open_date}}</p>
        <p>{{movie_detail.actor}}</p>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body">
        <p class="my-3">줄거리</p>
        <p>{{movie_detail.description}}</p>
        
      </div>
      <div class="modal-footer">
        
        <ul class="list-group">
          <li class="list-group-item" v-for="review in movie_detail.review_set" :key="review.id">{{review.score}} | {{review.comment}}</li>
        </ul>
      </div>

      <hr>
        <div class="review">
          <form class="form-inline">
            <div class="form-group mb-2">
              <p>유저</P>
            </div>
            <div class="form-group mx-sm-3 mb-2">
              <label for="inputPassword2" class="sr-only">comment</label>
              <input type="text" class="form-control" id="comment" placeholder="평점을 남겨주세요" v-model="comment">
            </div>
            <button type="submit" class="btn btn-primary mb-2" @click.prevent="create_review">리뷰 작성</button>
          </form>
        </div>
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
          Authorization: "JWT " + token
        }
      }
      console.log(user_id)
      console.log(requestHeader.headers.Authorization)

      console.log(this.movie_detail.id)
      const REVIEW_URL = `http://localhost:8000/api/v1/movies/${this.movie_detail.id}/review/create/`
      axios.post(REVIEW_URL,this.message,requestHeader.headers.Authorization)
      .then((res)=> {console.log(res)})
      .catch((err)=>{console.log(err)})
    }
  }
}
</script>

<style>

</style>