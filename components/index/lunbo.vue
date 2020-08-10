<template>
  <view>
	  <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="500">
	                          <swiper-item  v-for = "item in lunbo" :key="item.id" @click="longtap(item)">
	                          <image :src="item.image" mode="" class="tu"></image>
	                          </swiper-item>
	                      
	                      </swiper>

	     
	  
	  
	  
  </view>
</template>

<script>
export default {
name: "",
components: {

},
props: {
	lunbo:{
		type:Array
	}
},
data () {
  return {
	   
    }
  },
  methods: {
longtap(item){
	uni.navigateTo({
		url:`/pages/page/page?img=${item.image}`
	})
}
  },
  mounted () {

  },
  onLoad () {

  },
  filters: {

  },
  computed: {

  },
  watch: {

  },
  directives: {

  }
}
</script>

<style scoped lang="scss">

.tu{
	width: 100%;
	height: 500rpx;
}
.swiper{
	width: 100%;
	height: 500rpx;
}
</style>
