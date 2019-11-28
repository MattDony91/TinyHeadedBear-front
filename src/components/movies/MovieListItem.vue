<template>
  <div class="my-3 col-3" id='tempid'>
    <div class="card" style="position: relative;">
      <div style="vertical-align: middle;" class="text-center">
      <router-link class="btn btn-sm" :to="{name: 'movie', params: {movie}}">
      <img :src="movie.poster_url" id="image" :class="{active:hover}" :alt="movie.title" class="card-img-top" style="min-height:300px; max-height:300px; "  @mouseover="visible = !visible" @mouseleave="visible = !visible">
      </router-link>
      </div>
      
      <!-- @mouseover="hover= true" @mouseleave="hover=false" -->
      <!-- :@mouseover="{visibility:'hiidden'}" :@mouseleave="{display:'visible'} -->
      <div id="title" class="card-body" style="position:absolute; top:50%;left:50% text-align:center; padding: 5px 10px;">
        <h5 class="card-title text-center mr-5" v-if="visible">🎄 {{movie.title}}</h5>
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
      visible:false
    }
  },
  methods: {
    doMouseOver(){

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
    opacity: 0.2;
    transition: .5s ease;
}
.card-title {
  font-weight: bold;

}



</style>
