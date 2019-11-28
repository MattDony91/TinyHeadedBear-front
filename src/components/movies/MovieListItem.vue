<template>
  <div class="my-3 col-3" id='tempid'>
    <div class="card">
      <span>
        
      </span>
      <img :src="movie.poster_url" id="image" :class="{active:hover}" :alt="movie.title" class="card-img-top">
       <!-- @mouseover="hover= true" @mouseleave="hover=false" -->
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
  data(){
    return {
      hover: false,
    }
  }

}

</script>

<style>
.movie--poster {
  width: 200px;
}
.card {
  position: relative;
}
#image{
  -webkit-transform:scale(1);
  -moz-transform:scale(1);
  -ms-transform:scale(1); 
  -o-transform:scale(1);  
  transform:scale(1);
  -webkit-transition:.3s;
  -moz-transition:.3s;
  -ms-transition:.3s;
  -o-transition:.3s;
  transition:.3s;
  opacity: 1;
  transition: .5s ease;
}
#image:hover {
   -webkit-transform:scale(1.2);
    -moz-transform:scale(1.2);
    -ms-transform:scale(1.2);   
    -o-transform:scale(1.2);
    transform:scale(1.2);
    opacity: 0.7;
    transition: .5s ease;
}


</style>
