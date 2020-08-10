<template>
	<view>

		<view class="bodyer">
			<image class="fengmiantu" :src="img" mode="" @click="open"></image>
		</view>
		<uniPopup ref="popup" type="bottom">
			<view class="bt-1" @click="save">保存图片到本地</view>
			<view class="bt-2" @click="close">取消</view>
		</uniPopup>

	</view>
</template>

<script>
	import uniPopup from '../../components/uni-ui/uni-popup/uni-popup.vue'
	import uniPopupMessage from '../../components/uni-ui/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '../../components/uni-ui/uni-popup/uni-popup-dialog.vue'
	export default {
		name: "",
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		props: {},
		data() {
			return {
				img: ""
			}
		},
		methods: {
			close(){
			this.$refs.popup.close()	
			},
			open() {
				this.$refs.popup.open()
			},
			save(){
				uni.showLoading({
					title:"下载中",
				})
				uni.downloadFile({
					url:this.img,
					success: res=> {
						if(res.statusCode === 200){
							let tfp=res.tempFilePath
							uni.saveImageToPhotosAlbum({
								filePath:tfp,
								success(){
									uni.hideLoading()
									uni.showToast({
										title:"下载成功",
										icon:"success",
										duration:2000
									})
								}
							})
						}else{
							uni.showToast({
								title:"下载失败",
								icon:"none",
								duration:2000
								
							})
						}
					}
				})
			},
		},
		mounted() {

		},
		onLoad(options) {
			console.log(options)
			this.img = options.img
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
	.bodyer {
		width: 100%;
		height: 100%;
		background-color: black;
		position: absolute;
		justify-content: center;
		align-items: center;
		display: flex;
	}

	.fengmiantu {
		width: 90%;

	}

	.bt-1,
	.bt-2 {
		margin-top: 10rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;

		background-color: white;
	}
</style>
