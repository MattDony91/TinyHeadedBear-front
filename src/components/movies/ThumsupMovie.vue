<template>
  <div class="thums-up " style="position: relative;">
    <ul class="list-group">
      <div class="row d-flex" style="">
        <div class="col-4 m-0 p-0">
          <img :src="mouseover_url" alt="" style="min-height:30px; max-height:490px;  vertical-align: center;">
        </div>
        <div class="col m-0 p-0">
          <li class="list-group-item" v-for="movie in movie_list" :key="movie.id" @mouseover="mouseoverPoster(movie.poster_url)">
            <router-link :to="{name: 'movie', params: {movie}}">{{movie.title}}({{movie.subtitle}})</router-link>
          </li>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import jwtDecode from 'jwt-decode'

export default {
  name: 'ThumsupMovie',
  data(){
    return {
      login_check: false,
      movie_list: '',
      mouseover_url: '',
      user_info: {
        token: '',
        user_id: '',
        username: '',
      }
    }
  },
  mounted(){
    // 로그인 상태를 확인(로그인 유무에 따라 추천영화가 다름)
    const RECOMMENDED_URL = `http://localhost:8000/api/v1/movies/recommended/`

    this.$session.start()
    if (this.$session.get('jwt')) {
      this.login_check = true
      this.user_info.token = this.$session.get('jwt')
      const decodedToken = jwtDecode(this.user_info.token)
      this.user_info.user_id = decodedToken.user_id
      this.user_info.username = decodedToken.username
      const requestHeader = {
        headers: {
          Authorization: `JWT ${this.user_info.token}`
        }
      }
      axios.get(RECOMMENDED_URL, requestHeader)
        .then(res => {
          this.movie_list = res.data
          this.mouseover_url = this.movie_list[0].poster_url
        })
        .catch(err => console.log(err))
    } else {
      this.login_check = false

      axios.get(RECOMMENDED_URL)
        .then(res => {
          this.movie_list = res.data
          this.mouseover_url = this.movie_list[0].poster_url
        })
        .catch(err => console.log(err))
    }
  },
  methods: {
    mouseoverPoster(poster_url) {
      this.mouseover_url = poster_url
    }
  }
}
</script>

<style>
.col {
  flex: 1;
}
</style>