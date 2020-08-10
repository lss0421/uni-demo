<template>
	<view class="bodyer">
		<view class="header">
			<!-- 头像 -->
			<view class="t-x-box" @click="touxiang">
				<view class="t-x-zi">头像</view>
				<image class="t-x-tu" :src="user.faceImage" mode=""></image>
			<!-- 	<view class="jiantou">></view> -->
			</view>
			<uniPopup ref="popup" type="bottom">
				<view class="bt-1" @click="chakantouxiang">查看我的头像</view>
				<view class="bt-1" @click="xuanzetouxiang">从手机相册中选</view>
				<view class="bt-2" @click="close">取消</view>
			</uniPopup>
			<!-- 昵称 -->
			<view class="t-x-box" @click="nicheng">
				<view class="t-x-zi">昵称</view>
				<view class="nicheng">{{user.nickname}}</view>
		<!-- 		<view class="jiantou">></view> -->
			</view>
			<uniPopup ref="popups" type="bottom">
				<view class="ni-cheng-box">
					<view class="queren" @click="queren">确认</view>
					<input class="_input" @input="input" type="text" :value="user.nickname" />
					<view class="quxiao" @click="nichengclose">取消</view>
				</view>

			</uniPopup>
			<!-- 生日 -->
			<view class="t-x-box">
				<view class="t-x-zi">生日</view>
				<view class="s-r">

					<gpp-date-picker @onCancel="onCancel" @onConfirm="onConfirm" :startDate="startDate" :endDate="endDate">
						{{user.birthday}}
					</gpp-date-picker>
				</view>
		<!-- 		<view class="jiantou">></view> -->
			</view>






			<!-- 性别 -->
			<view class="t-x-box" @click="xingbie">
				<view class="t-x-zi">性别</view>
				<view class="nicheng" v-if="user.sex===1">男</view>
				<view class="nicheng" v-if="user.sex===2">女</view>

			<!-- 	<view class="jiantou">></view> -->
			</view>
			<uniPopup ref="popupsss" type="bottom">
				<view class="ni-cheng-box">
					<view class="queren" @click="xingbiequeren">确认</view>
					<view class="sex">
						<view class="s" @click="nan">男</view>
						<view class="s" @click="nv">女</view>

					</view>

					<view class="quxiao" @click="xingbieclose">取消</view>
				</view>

			</uniPopup>
		</view>

		<!-- 点击保存 -->
		<view class="baocun" @click="dianjibaocun">点击保存</view>



		<view class="footer">
			<view class="huan-cun" @click="qingli">清理缓存</view>
			<view class="tuichu" @click="exit">退出登录</view>
		</view>

	</view>
</template>

<script>
	import gppDatePicker from "../../components/gpp-datePicker/gpp-datePicker.vue"
	import uniPopup from '../../components/uni-ui/uni-popup/uni-popup.vue'
	import uniPopupMessage from '../../components/uni-ui/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '../../components/uni-ui/uni-popup/uni-popup-dialog.vue'
	export default {
		name: "",
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
			gppDatePicker
		},
		props: {},
		data() {
			return {
				user: {},
				value: "",
				flag: null,
				startDate: "2018-05-02",
				endDate: "2022-09-20",
				

			}
		},
		methods: {
			// 头像修改
			dianjibaocun(){
				uni.request({
					url: `${this.$api}/user/modifyUserinfo?qq=434714873`,
					method: 'POST',
					data: {
						birthday:this.user.birthday,
						sex:this.user.sex,
						nickname:this.user.nickname,
						id:this.user.id
					},
				
					success: res => {
						uni.removeStorageSync("user")
						uni.setStorageSync("user",this.user)
						uni.switchTab({
							url:"/pages/my/my"
						})
					},
					fail: () => {},
					complete: () => {}
				});
			
			},
			touxiang() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			},
			chakantouxiang() {
				uni.navigateTo({
					url: `/pages/page/page?img=${this.user.faceImage}`
				})
			},
			xuanzetouxiang() {
				
				uni.chooseImage({
					count: 1, //默认9
					success: res=> {
						console.log(JSON.stringify(res.tempFilePaths));


						uni.uploadFile({
							url: `${this.$api}/user/uploadFace?qq=434714873&userId=${this.user.id}`, //仅为示例，非真实的接口地址
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							header:{
								"headerUserId":this.user.id,
								"headerUserToken":this.user.userUniqueToken
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
								this.$refs.popup.close()
							}
						});
					}
				});
			},
			// 昵称修改
			nicheng() {
				this.$refs.popups.open()
			},
			nichengclose() {
				this.$refs.popups.close()
			},
			input(e) {
				console.log(e)
				this.value = e.detail.value
			},
			queren() {
				if (this.value === "") {
					this.$refs.popups.close()
				} else {
					this.$refs.popups.close()
					this.user.nickname = this.value
				}

			},
			// 修改生日
			// 取消生日修改
			onCancel(e) {
				console.log(e);
			},
			// 确认生日修改
			onConfirm(e) {

				this.user.birthday = e.dateValue
			},

			// 修改性别
			xingbie() {
				this.$refs.popupsss.open()
			},
			xingbiequeren() {
				if (this.flag === null) {
					this.$refs.popupsss.close()
				} else {
					this.user.sex = this.flag
					this.$refs.popupsss.close()
				}


			},
			xingbieclose() {
				this.$refs.popupsss.close()
			},
			nan() {
				this.flag = 1
			},
			nv() {
				this.flag = 2
			},
			// 清理缓存
			qingli() {
				uni.removeStorageSync("user")
				uni.switchTab({
					url: "/pages/my/my"
				})

			},
			// 退出登录
			exit() {
				uni.request({
					url: `${this.$api}/user/logout?qq=434714873`,
					method: 'POST',
					data: {
						userId: this.user.id
					},
					success: res => {

						uni.removeStorageSync("user")
						uni.switchTab({
							url: "/pages/my/my"
						})
					},
					fail: () => {},
					complete: () => {}
				});


			},


		},
		mounted() {

		},
		onLoad(options) {
			this.user = uni.getStorageSync("user")
		console.log(this.user)
		},
		onShow() {

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
	.s {
		width: 100%;
		margin-top: 10rpx;

	}

	.s:hover {
		background-color: #DDDDDD;
	}

	.sex {
		position: absolute;
		width: 100%;
		text-align: center;
		margin-top: 100rpx;
	}

	.s-r {
		margin-left: 350rpx;
		color: #AAAAAA;
	}

	.huan-cun {
		width: 100%;
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
		font-size: 32rpx;
		background-color: #F0F0F0;
	}

	.tuichu {
		width: 100%;
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
		font-size: 32rpx;
		margin-top: 10rpx;
		background-color: #F0F0F0;

	}

	.footer {
		width: 100%;
		height: 150rpx;
		position: absolute;
		bottom: 0;

	}

	.baocun {
		width: 300rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background-color: green;
		color: #FFFFFF;
		font-size: 32rpx;
		border-radius: 20rpx;
		position: absolute;
		top: 500rpx;
		left: 50%;
		margin-left: -150rpx;
	}

	.t-x-box {
		display: flex;

		width: 100%;
		height: 100rpx;

		line-height: 100rpx;
	}

	.t-x-zi {
		font-size: 36rpx;
		margin-left: 10rpx;
		color: #AAAAAA;
	}

	.t-x-tu {
		width: 70rpx;
		height: 70rpx;
		border-radius: 35rpx;
		margin-top: 15rpx;
		margin-left: 65%;
	}

	// .jiantou {
	// 	margin-left: 30rpx;
	// 	color: #AAAAAA;
	// }

	.bt-1,
	.bt-2 {
		margin-top: 10rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;

		background-color: white;
	}

	.nicheng {
		margin-left: 65%;
		color: #AAAAAA;
	}

	.ni-cheng-box {
		width: 750rpx;
		height: 300rpx;
		background-color: #FFFFFF;
	}

	.queren {
		position: absolute;
		right: 20rpx;
		color: blue;
	}

	.quxiao {
		position: absolute;
		color: #999999;
		left: 20rpx;
	}

	._input {
		position: absolute;
		top: 100rpx;
		width: 100%;
		text-align: center;
	}
</style>
