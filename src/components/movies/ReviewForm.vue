<template>
<div>
    <ul class="list-group">
    <li class="list-group-item d-flex flex-row align-items-stretch m-0 p-0 row">
        <input class="flex-fill col-2" type="number" placeholder="평점" v-model="score">
        <input class="flex-fill col-9" type="text" placeholder="리뷰를 남겨주세요." v-model="comment">
        <button class="btn btn-info btn-sm col-1" @click="reviewCreate">📝</button>
    </li>
    <!-- <li>{{movie_detail.review_set.reverse()}}</li> -->
    <li class="list-group-item d-flex flex-row m-0 px-0 py-2 row" v-for="review in movie_detail.review_set" :key="review.id">
        <span class="col-2 text-center">{{review.score}}</span>
        <span class="col">{{review.comment}}
        <span v-if="review.user.id === user_info.user_id">

            <!-- <button class="btn btn-warning btn-sm" @click="showInput(review)">EDI</button> -->
            <!-- 모달버튼 -->
            <button :id="'reviewBtn' + review.id" class="btn btn-warning btn-sm" data-toggle="modal" :data-target="'#review' + review.id">EDI</button>
            <!-- 모달띄우기 -->
            <div class="modal fade" :id="'review' + review.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
            </div>
            <!-- <button :id="'btn' + movie.id" class="btn btn-sm btn-info" data-toggle="modal" :data-target="'#movie' + movie.id">상세보기</button> -->

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
// import jwtDecode from 'jwt-decode'

export default {

  name: 'movie-list-item-modal',
  components:{
  },
  props:{
    movie: Object,
  },
  data(){
    return {
      movie_detail: '',
      comment: '',
      score: '',
      user: {
        token: '',
        user_id: '',
        username: '',
      }
    }
  },

  methods: {
    reviewCreate(){
      const REVIEW_CREATE_URL = `http://localhost:8000/api/v1/movies/${this.movie.id}/review/create/`
      const requestHeader = {
        headers: {
          Authorization: `JWT ${this.user.token}`
        }
      }

      const requestForm = new FormData()
      requestForm.append('user', this.user.user_id)
      requestForm.append('score', this.score)
      requestForm.append('comment', this.comment)

      axios.post(REVIEW_CREATE_URL, requestForm, requestHeader)
        .then((res)=> {
          // console.log(res.data)
          // console.log(this.movie_detail)
          this.movie_detail.review_set.unshift(res.data)
          this.score = ''
          this.comment = ''
          })
        .catch((err)=>{console.log(err)})
    },
    reviewDelete(review) {
      const requestHeader = {
        headers: {
          Authorization: `JWT ${this.user.token}`
        }
      }
      const REVIEW_DETAIL_URL = `http://localhost:8000/api/v1/movies/${this.movie.id}/review/${review.id}/`
      axios.delete(REVIEW_DETAIL_URL, requestHeader)
        .then(res => {
          console.log(res)
          const targetReview = this.movie_detail.review_set.find(function (el) {
            return el === review
          })
          const idx = this.movie_detail.review_set.indexOf(targetReview)
          if (idx != -1) {
            this.movie_detail.review_set.splice(idx, 1)
          }
        })
        .catch(err => console.log(err))
    },
    showInput(review) {
      console.log('창 뜰까??')
      prompt('수정할 내용을 입력해주세요', review.comment)
    }
  },
}
</script>

<style>

</style>