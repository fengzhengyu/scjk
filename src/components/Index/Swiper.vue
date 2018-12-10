<template>
   <swiper :options="swiperOption">
    <swiper-slide v-for="(slide, index) in sliders" :key="index">
      <img :src="slide" >
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>

</template>
<script>
    export default {
      props: {
        sliders: {
          type: Array,
          default: ['test']
        }
      },
      data() {
        return {
            swiperOption: {
              loop : true,
              autoplay:true,
              pagination: {
                el: '.swiper-pagination'
              }
            }
        }
      },
     
    }
</script>
<style  scoped>
  .swiper-slide img{
    width: 100%;
    height: 2.7rem;
  }

</style>
