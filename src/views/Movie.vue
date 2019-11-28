<template>
  <div class="jumbotron jumbotron-fluid my-5" style="border-radius: 5px;">
    <!-- 영화 상세정보 -->
    <div class="row ">
      <div class="col-5 text-center ml-3" style="padding-right: 0;">
        <img width="90%" style="min-height:450px;" :src="movie_detail.poster_url" alt="" :class="{active:hover}">
      </div>
      <div class="col-6" style="vertical-align: middle; padding-left: 0;">
        <div class="mr-3">
          <h1 class="display-4 row align-items-center"> {{movie_detail.title}}  <h2>{{movie_detail.subtitle}}</h2></h1>
         
          <div style="">
            <p> 개요 
              <span v-if="movie_detail.open_date != '정보없음'">| {{movie_detail.open_date}} </span>
              <span v-if="movie_detail.running_time != '정보없음'">| {{movie_detail.running_time}} </span>
            </p>
            <p>감독 <span v-for="director in movie_detail.directors" :key="director.id">| {{director.name}} </span></p>
            <p>출연 <span v-for="actor in movie_detail.actors" :key="actor.id">| {{actor.name}} </span></p>
            <p>누적관객 <span>| {{movie_detail.audience}}</span></p>
            <p>
              <button class=" text-black font-bold " @click="movieLike()">
               <i class="far fa-thumbs-up"></i>
              </button>
              {{movie_detail.like_users.length}}
            </p>
            <p>
              평점:
              <span v-if="movie_detail.review_set.length">{{score_average}}</span>
              <span v-else>리뷰를 남겨주세요.</span>
            </p>
            
          </div>
            
          <hr>
          <span style="font-weight:bold">줄거리</span>
          <div>
            {{movie_detail.description}}
          </div>
        </div>
      </div>
    </div>
    <hr>
    <!-- 리뷰 관련 기능들 -->
    <ul class="list-group" style="width:80%; margin-left:10%">
      <li class="list-group-item m-0 px-3 py-2 row">
        <input class="col-2" type="number" placeholder="평점" v-model="score">
        <input class="col-9" type="text" placeholder="리뷰를 남겨주세요." v-model="comment">
        <button class="btn btn-info btn-sm col-1" @click="reviewCreate()">📝</button>
      </li>
      <li class="list-group-item d-flex flex-row m-0 px-4 py-2 row" v-for="review in this.movie_detail.review_set" :key="review.id">
        <span class="col-2 text-center">⭐{{review.score}}</span>
        <span class="col">
          {{review.comment}}
          <span v-if="review.user.id === user_info.user_id">
            <!-- <button class="btn btn-warning btn-sm">EDI</button> -->
            <!-- 모달시작한다 -->
            <button type="button" class="btn btn-warning btn-sm" data-toggle="modal" :data-target="'#review' + review.id">수정</button>

            <!-- Modal -->
            <div class="modal fade" :id="'review' + review.id" tabindex="-1" role="dialog" aria-labelledby="reviewModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="reviewModalLabel">리뷰를 수정해주세요.</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body row">
                    <input :id="'edit_score' + review.id" class="col-2" type="number" :value="review.score">
                    <input :id="'edit_comment' + review.id" class="col-9" type="text" :value="review.comment">
                    <button class="btn btn-success btn-sm col-1" data-dismiss="modal" @click="reviewUpdate(review)">📝</button>
                  </div>
              
                </div>
              </div>
            </div>
            <!-- 모달끝난다 -->
            <button class="btn btn-danger btn-sm" @click="reviewDelete(review)">DEL</button>
          </span>
        </span>
        <span class="col-2 text-right">{{review.user.username}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'

export default {
  name: 'Movie',
  props: {
    movie: Object,
  },
  data(){
    return {
      score:'',
      comment:'',
      movie_detail: '',
      score_average: '',
      user_info: {
        token: '',
        user_id: '',
        username: '',
      },
      hover:false
    }
  },
  mounted() {
    let movie_detail_url = 'http://127.0.0.1:8000/api/v1/movies/'
    if (this.movie) {
      movie_detail_url += this.movie.id
      console.log('True')
    } else {
      movie_detail_url += this.$session.get('movie_id')
      console.log('False')
    }
    axios.get(movie_detail_url)
      .then(res => {
        this.movie_detail = res.data
        this.movie_detail.review_set.reverse()
        this.getScoreAvg()
      })
      .catch(err => console.log(err))

    

    this.$session.start()
    if (this.$session.get('jwt')) {
      this.user_info.token = this.$session.get('jwt')
      const decodedToken = jwtDecode(this.user_info.token)
      this.user_info.user_id = decodedToken.user_id
      this.user_info.username = decodedToken.username
    }
    if (this.movie) {
      this.$session.set('movie_id', this.movie.id)
    }
  },
  methods: {
    getScoreAvg() {
      if (this.movie_detail.review_set) {
        let score_sum = 0
        for (let review of this.movie_detail.review_set) {
          score_sum += review.score
        }
        this.score_average = score_sum / this.movie_detail.review_set.length
      }
    },
    reviewCreate(){
      const REVIEW_CREATE_URL = `http://localhost:8000/api/v1/movies/${this.movie_detail.id}/review/create/`

      const requestHeader = {
        headers: {
          Authorization: `JWT ${this.user_info.token}`
        }
      }
      const requestForm = new FormData()
      requestForm.append('user', this.user_info.user_id)
      requestForm.append('score', this.score)
      requestForm.append('comment', this.comment)

      axios.post(REVIEW_CREATE_URL, requestForm, requestHeader)
        .then((res)=> {
          this.movie_detail.review_set.unshift(res.data)
          this.getScoreAvg()
          this.score = ''
          this.comment = ''
          })
        .catch((err)=>{console.log(err)})
    },
    reviewDelete(review) {
      const requestHeader = {
        headers: {
          Authorization: `JWT ${this.user_info.token}`
        }
      }
      const REVIEW_DETAIL_URL = `http://localhost:8000/api/v1/movies/${this.movie_detail.id}/review/${review.id}/`
      axios.delete(REVIEW_DETAIL_URL, requestHeader)
        .then(res => {
          console.log(res)
          const targetReview = this.movie_detail.review_set.find(function (el) {
            return el === review
          })
          const idx = this.movie_detail.review_set.indexOf(targetReview)
          if (idx != -1) {
            this.movie_detail.review_set.splice(idx, 1)
            this.getScoreAvg()
          }
        })
        .catch(err => console.log(err))
    },
    reviewUpdate(review) {
      const edit_score = document.querySelector('#edit_score' + review.id).value
      const edit_comment = document.querySelector('#edit_comment' + review.id).value

      const requestHeader = {
        headers: {
          Authorization: `JWT ${this.user_info.token}`
        }
      }

      const requestForm = new FormData()
      requestForm.append('score', edit_score)
      requestForm.append('comment', edit_comment)

      const REVIEW_DETAIL_URL = `http://localhost:8000/api/v1/movies/${this.movie_detail.id}/review/${review.id}/`
      axios.put(REVIEW_DETAIL_URL, requestForm, requestHeader)
        .then(res => {
          console.log(res)
          const targetReview = this.movie_detail.review_set.find(function (el) {
            return el === review
          })
          const idx = this.movie_detail.review_set.indexOf(targetReview)
          if (idx != -1) {
            this.movie_detail.review_set[idx].score = Number(edit_score)
            console.log(this.movie_detail.review_set)
            this.movie_detail.review_set[idx].comment = edit_comment
            this.getScoreAvg()
          }
        })
        .catch(err => console.log(err))
    },
    movieLike() {
      const requestHeader = {
        headers: {
          Authorization: `JWT ${this.user_info.token}`
        }
      }

      const requestForm = new FormData()
      requestForm.append('user', this.user_info.user_id)

      console.log(requestHeader)
      console.log(this.user_info.username)

      const MOVIE_LIKE_URL = `http://localhost:8000/api/v1/movies/${this.movie_detail.id}/like/`
      
      console.log(MOVIE_LIKE_URL)
      axios.post(MOVIE_LIKE_URL, requestForm, requestHeader)
        .then(res => this.movie_detail.like_users = res.data.like_users)
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>

</style>