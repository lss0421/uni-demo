<template>
  <view>
	  <!-- 热门预告 -->
	  <view class="df">
	  	<image src="../../static/img/预告.png" mode="" class="img"></image>
	  	<view class="remen">热门预告</view>
	  </view>
	  <view class="big-box">
	  	<view v-for="item in hot2" :key="item.id">
	  	<video class="sm-box" :src="item.trailer"></video>
	  	</view>		
	  </view>
	  
	 <!--推荐电影  --> 
	  <view>
	  	<view class="big" v-for="item in hot1" :key="item.id">
	  		<image class="tupian" :src="item.cover" mode="" @click="todetail(item)"></image>
			<view class="wenzi">
				<view class="bt">{{item.name}}</view>
				<uni-rate :size="14" :value="5" class="mt"/>
				<view class="sm-bt">{{item.basicInfo}}</view>
				<view class="sm-bt1">{{item.releaseDate}}</view>	
			</view>
			
			<view class="zan">
				<view class="weizhi" @click="dianzan">
				<image class="zan-tupian" src="../../static/img/赞.png" mode=""></image>
				<view class="">
					赞一下
				</view>
				</view>
			</view>
	  	</view>
	
	  </view>
	  
	  
	  
	  
  </view>
</template>

<script>
	import uniRate from '../uni-ui/uni-rate/uni-rate.vue'
export default {
name: "",
components: {
uniRate,
},
props: {
	hot1:{
		type:Array
	},
	hot2:{
		type:Array
	},
	
},
data () {
  return {
    }
  },
  methods: {
dianzan(){
	uni.showToast({
		title:"已点赞",
		icon:"success",
		duration:2000
	})
},
todetail(item){
	uni.navigateTo({
		url:`/pages/detail/detail?item=${JSON.stringify(item)}`
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
.df {		display: flex;		padding: 30rpx 10rpx 20rpx 20rpx;	}	.img {		width: 50rpx;		height: 50rpx;	}	.remen {		margin-left: 10rpx;	}
	.big-box{
		width: 90%;
		margin:0 auto;
		
        display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	
	}
.sm-box{
	width:320rpx ;
	height: 380rpx;
	margin-bottom: 30rpx;
	
}
.big{

	height: 380rxp;

	display: flex;
	margin-bottom: 30rpx;
}
.tupian{
	width:25% ;
	height:250rpx;
	margin-left: 30rpx;
}
.wenzi{
	margin-left: 30rpx;
	width: 45%;
}
.bt{
font-size: 36rpx;	
}
.sm-bt, .sm-bt1{
	font-size: 28rpx;
    color: #3B4144;
}
.mt{
	margin-top: 10rpx;
}
.zan{
	text-align: center;
	border-left:1px dashed red;
	font-size: 28rpx;
	margin-left: 30rpx;
	color: orange;
	text-indent: 1em;
}

.zan-tupian{
	width: 40rpx;
	height: 40rpx;
	margin-top: 80rpx;

}

</style>
