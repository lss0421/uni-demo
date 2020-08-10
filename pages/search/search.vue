<template>
  <view>
	  <!-- 搜索框 -->
	  <view class="w-k">
		  <image class="ss-tu" src="../../static/img/搜索.png" mode=""></image>
	  	<input type="text" v-model="keywords" @input="input" @confirm="search" placeholder="请输入电影信息" class="input"/>
	  <view class="xx" v-if="active===2" @click="dele">
	  	x
	  </view>
	  <view class="s-s" @click="search">
	  	搜索
	  </view>
	  </view>
	  <!-- 电影列表 -->
	  <view class="bottom-box" v-if="movies.length>=1">
	  	<view class="one-box" v-for="item in movies" :key="item.id" @click="todetail(item)">
	  		<image class="bei-tu" :src="item.cover" mode=""></image>
			<view  class="movie-name">
				{{item.name}}
			</view>
	  	</view>
	  </view>
	  
	  <view class="err" v-else>
	  	很抱歉，未搜索到您需要的内容，请重新搜索!!!
	  </view>
	   
  </view>
</template>

<script>
export default {
name: "",
components: {

},
props: {},
data () {
  return {
	  keywords:"",
	  page:1,
	  pageSize:10,
	  movies:[],
	  active:1,
	  add:10
    }
  },
  methods: {
getlist(){
	uni.request({
		url: `${this.$api}/search/list?qq=434714873&keywords=${this.keywords}&page=${this.page}&pageSize=${this.pageSize}`,
		method: 'POST',
		data: {},
		success: res => {
			console.log(res)
			this.movies=res.data.data.rows
		},
		fail: () => {},
		complete: () => {}
	});
},
todetail(item){
	uni.navigateTo({
		url:`/pages/detail/detail?item=${JSON.stringify(item)}`
	})
	
},

 	onReachBottom() {
		uni.showToast({
			title:"加载中",
			icon:"loading",
			duration:1000
		})
		this.pageSize=this.pageSize*1 + this.add*1
						this.getlist()	
										},
			onPullDownRefresh() {				setTimeout(function() {					uni.stopPullDownRefresh();				}, 1000);							},
search(){

	this.getlist()
},

input(e){
	console.log(e)
this.keywords=e.detail.value
if(e.detail.value===""){
	this.active=1
}else{
	this.active=2
}
this.getlist()
},
dele(){
	this.active=1
	this.keywords=""
	this.getlist()
}

  },
  mounted () {

  },
  onLoad () {
this.getlist()


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
.w-k{
	width: 100%;
	height: 100rpx;
	border-bottom: 1px solid #ededed;
	display: flex;
	line-height: 100rpx;
}
.input{
	width: 80%;
	height: 70rpx;
	border: 1px solid #C0C0C0;
	line-height: 70rpx;
	text-align: center;
	margin-top: 15rpx;
	border-radius: 35rpx;
	margin-left: 10rpx;
}
.s-s{
	margin-left: 30rpx;
}
.ss-tu{
	width: 50rpx;
	height: 50rpx;
	position: absolute;
	top:25rpx ;
	left: 30rpx;
}
.bottom-box{
	display: flex;
	flex-wrap: wrap;
	
}
.one-box{
	width: 30%;
	height: 350rpx;
	margin-top: 70rpx;
	margin-left: 20rpx;
}
.bei-tu{
	width: 100%;
	height: 80%;
}

.movie-name{
	font-size: 32rpx;
}
.xx{
	width: 50rpx;
	height: 50rpx;
	line-height: 50rpx;
	text-align: center;
	border-radius: 25rpx;
	background-color:rgba(0,0,0,0.5);
	position: absolute;
	top:25rpx ;
	left: 550rpx;
}
.err{
	width: 80%;
	margin: 150rpx auto;
	font-size: 36rpx;
	color: red;
}
</style>
