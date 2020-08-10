<template>
	<view>
		<video class="shipin" :src="arr.trailer" controls></video>
		<view class="center-box">
			<image class="tupian" :src="arr.cover" mode="" @click="fengmian(arr)"></image>
			<view class="center-right">
				<view class="bt1">{{arr.name}}</view>
				<view class="bt2">{{arr.basicInfo}}</view>
				<view class="bt3">{{arr.originalName}}</view>
				<view class="bt4">{{arr.releaseDate}}</view>
				<view class="bb-gg">
					<view class="sm-box1">
						<view class="pinfen">综合评分:</view>
						<view class="pinfen1">{{arr.score}}</view>
					</view>
					<view class="sm-box2">
						<uni-rate :size="14" :value="5" active-color="#aaaaaa" />
						<view class="dianzan">{{arr.prisedCounts}}人点赞</view>
					</view>
				</view>

			</view>
		</view>

		<!-- 剧情介绍 -->
		<view class="b-t-b">
			<view class="j-q">剧情介绍:</view>
			<view class="x-q">{{arr.plotDesc}}</view>
		</view>
		<!-- 演职人员 -->
		<view class="b-t-b">
			<view class="j-q">演职人员:</view>
			<scroll-view scroll-x="true" >
				<view class="y-y-b-b">
					<!-- 导演 -->
					<view class="y-y-s-b" v-for="item in daoyan " :key="item.staffId">
						<image class="y-y-t" :src="item.photo" mode="" @click="daoyantu(item)"></image>
						<view class="y-y-m">{{item.name}}</view>
						<view class="y-y-y">{{item.actName}}</view>
					</view>
					<!-- 演员 -->
					<view class="y-y-s-b" v-for="(item,index) in yanyuan " :key="index">
						<image class="y-y-t" :src="item.photo" mode="" @click="yanyuantu(item)"></image>
						<view class="y-y-m">{{item.name}}</view>
						<view class="y-y-y">饰演：{{item.actName}}</view>
					</view>
				</view>
				</scroll-view>
		</view>
		<!-- 剧照 -->
		<view class="b-t-b">
			<view class="j-q">剧照:</view>
			<view class="sm-tu1">
				<view v-for="(item,index) in pics" :key="index" @click="longtap(item)">
					<image class="ju-zhao" :src="item" mode=""></image>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import uniRate from '../../components/uni-ui/uni-rate/uni-rate.vue'
	export default {
		name: "",
		components: {
			uniRate,
		},
		props: {},
		data() {
			return {
				arr: [],
				pics: [],
				daoyan: [],
				yanyuan: []
			}
		},
		methods: {
longtap(item){
uni.navigateTo({
	url:`/pages/page/page?img=${item}`
})
},
fengmian(arr){
	uni.navigateTo({
		url:`/pages/page/page?img=${arr.cover}`
	})
},
daoyantu(item){
	uni.navigateTo({
		url:`/pages/page/page?img=${item.photo}`
	})
},
yanyuantu(item){
	uni.navigateTo({
		url:`/pages/page/page?img=${item.photo}`
	})
},
			getdaoyan() {
				uni.request({
					url: `${this.$api}/search/staff/${this.arr.id}/1?qq=434714873`,
					method: 'POST',
					data: {},
					success: res => {
						console.log(res)
						this.daoyan = res.data.data
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getyanyuan() {
				uni.request({
					url: `${this.$api}/search/staff/${this.arr.id}/2?qq=434714873`,
					method: 'POST',
					data: {},
					success: res => {
						console.log(res)
						this.yanyuan = res.data.data
					},
					fail: () => {},
					complete: () => {}
				});
			}

		},
		mounted() {

		},
		onLoad(options) {
			console.log(options)
			this.arr = JSON.parse(options.item)
			this.pics = JSON.parse(this.arr.plotPics)
			this.getdaoyan()
			this.getyanyuan()
			console.log(this.arr)
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
	.y-y-b-b {
		width: 90%;
		margin: 0 auto;
	
		display: flex;
		padding: 30rpx;
	}

	.y-y-s-b {
		margin-right: 30rpx;


	}

	.y-y-t {
		width: 160rpx;
		height: 200rpx;
	}

	.y-y-m,
	.y-y-y {
		font-size: 24rpx;
		color: #C0C0C0;
	}

	.sm-tu1 {

		display: flex;
		flex-wrap: wrap;

	}

	.ju-zhao {
		width: 200rpx;
		height: 220rpx;
		margin-left: 20rpx;
		margin-top: 30rpx;
	}




	.shipin {
		width: 100%;
	}

	.center-box {
		margin: 0 auto;
		width: 90%;
		height: 400rpx;
		margin-top: 80rpx;
		display: flex;
		border-bottom: 1px solid #C0C0C0;
	}

	.tupian {
		width: 40%;
		height: 350rpx;
		margin-left: 10rpx;
	}

	.center-right {
		width: 50%;
		margin-left: 20rpx;

	}

	.bt1 {
		font-size: 36rpx;
	}

	.bt2,
	.bt3,
	.bt4 {
		font-size: 24rpx;
		color: #808080;
		margin-top: 10rpx;
	}

	.sm-box1 {
		width: 50%;
		margin-top: 30rpx;


	}

	.sm-box2 {
		margin-top: 70rpx;
	}

	.pinfen {
		font-size: 28rpx;
		width: 150rpx;

	}

	.pinfen1 {
		color: red;
		text-indent: 1em;
	}

	.bb-gg {
		display: flex;
		background-color: #EEEEEE;
	}

	.dianzan {
		font-size: 28rpx;
		width: 150rpx;
		color: #AAAAAA;
	}

	.b-t-b {
		width: 90%;
		margin: 0 auto;
		border-bottom: 1px solid #C0C0C0;
	}

	.j-q {
		margin-left: 20rpx;
		font-size: 24rpx;
		color: #D3D3D3;
		margin-top: 20rpx;
	}

	.x-q {
		margin-top: 20rpx;
		font-size: 24rpx;
		margin-bottom: 30rpx;
	}
</style>
