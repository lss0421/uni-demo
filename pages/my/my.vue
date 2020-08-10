<template>
  <view>
	  <!-- 已登录状态下 -->
	  <view class="top-box" v-if="user===''">
	  	<view class="user-img"></view>
		<view class="title" @click="login">注册/登录</view>
	  </view>
	  <!-- 未登录状态下 -->
	  <view class="top-box" v-else>
	  	<image class="user-imge" :src="user.faceImage" mode=""></image>
		<view class="use-name">{{user.nickname}}</view>
		<view class="use-id">{{user.id}}</view>
		<image class="chilun" src="../../static/img/齿轮.png" mode="" @click="ziliao"></image>
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
user:"",

    }
  },
  methods: {
login(){
	uni.navigateTo({
		url:"/pages/login/login"
	})
},
ziliao(){
	
	uni.navigateTo({
		url:`/pages/ziliao/ziliao`
	})
}
  },
  mounted () {

  },
  onLoad (options) {



  },
  onShow(){
	this.user=uni.getStorageSync("user")  
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
.top-box{
	background-image: url(../../static/img/背景.jpeg);
	width: 100%;
	height: 500rpx;
}
.user-img{
	background-image: url(../../static/img/人头.jpg);
	width: 200rpx;
	height: 200rpx;
	background-size: 100%;
	background-position: center;
	border-radius: 100rpx;
	position: absolute;
	left: 50rpx;
	top: 150rpx;
}
.user-imge{

	width: 200rpx;
	height: 200rpx;
	background-size: 100%;
	background-position: center;
	border-radius: 100rpx;
	position: absolute;
	left: 50rpx;
	top: 150rpx;
}
.title{
	width: 200rpx;
	height: 100rpx;
	line-height: 100rpx;
	text-align: center;
	position: absolute;
	top: 200rpx;
	left: 300rpx;
}
.use-name{
	
	height: 100rpx;
	line-height: 100rpx;
	text-align: center;
	position: absolute;
	top: 180rpx;
	left: 270rpx;
	font-size: 40rpx;
	font-weight: 700;
}
.use-id{
	color: #67C23A;
	height: 100rpx;
	line-height: 100rpx;
	text-align: center;
	position: absolute;
	top: 250rpx;
	left: 270rpx;
	font-size: 28rpx;
	
}
.chilun{
	position: absolute;
	width: 50rpx;
	height: 50rpx;
	top: 50rpx;
	right: 50rpx;
}
</style>
