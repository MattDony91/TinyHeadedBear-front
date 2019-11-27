<template>
  <div class="jumbotron jumbotron-fluid my-5" style="border-radius: 5px;">
    <div class="row ">
        <div class="col-6 text-center" style="padding-right: 0;">
            <img width="90%" :src="movie_detail.poster_url" alt="">
        </div>
        <div class="col-6" style="vertical-align: middle;
        padding-left: 0;">
            <div class="mr-3">
                <h1 class="display-4"> {{movie_detail.title}}</h1>
                <p>{{movie_detail.subtitle}}</p>
                <div style="">
                  <span v-if="movie_detail.open_date != '정보없음'">| {{movie_detail.open_date}} </span>
                  <span v-if="movie_detail.running_time != '정보없음'">| {{movie_detail.running_time}} </span>
                  <p>감독 <span v-for="director in movie_detail.directors" :key="director.id">| {{director.name}} </span></p>
                  <p>출연 <span v-for="actor in movie_detail.actors" :key="actor.id">| {{actor.name}} </span></p>
                  <p>누적관객 <span>| {{movie_detail.audience}}</span></p>
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
    <div class="my-3">
    <ReviewForm :movie_detail="movie_detail"/>

    </div>



</div>

</template>

<script>
import axios from 'axios'

import ReviewForm from '../components/movies/ReviewForm.vue'

export default {
  name: 'Movie',
  components: {
    ReviewForm
  },
  props: {
    movie: Object,
  },
  data(){
    return {
      movie_detail: '',
    }
  },
  mounted() {
    const MOVIE_DETAIL_URL = 'http://127.0.0.1:8000/api/v1/movies/'
    console.log(this.movie.id)
    axios.get(MOVIE_DETAIL_URL + this.movie.id)
      .then(res => {
      this.movie_detail = res.data
      this.movie_detail.review_set.reverse()
      })
      .catch(err => console.log(err))

  },
}
</script>

<style>

</style>