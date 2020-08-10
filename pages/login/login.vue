<template>
  <view>
	 <image class="touxiang" src="../../static/img/人头.jpg" mode=""></image>
	  <view class="zhanghao-box">
	  	<view class="tt">账号</view><input class="tt1" type="text" v-model="username" placeholder="请输入用户名"/>
	  </view>
	  <view class="mima-box">
	  	<view class="tt">密码</view>  <input class="tt1" type="password" v-model="password" placeholder="请输入密码"/>
	  </view>
	  <view class="chajian">第三方账号登录</view>
	<view class="sanfang">
		<!-- #ifdef APP-PLUS -->
		<image class="t-u" src="../../static/img/微信.png" mode="" @click="weixinlogin"></image>
		<image class="t-u" src="../../static/img/腾讯.png" mode="" @click="qqlogin"></image>
		<image class="t-u" src="../../static/img/新浪.png" mode="" @click="sinalogin"></image>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->		
		<image class="t-u" src="../../static/img/微信.png" mode="" @click="weixinlogin"></image>
		<!-- #endif -->
		
		
	</view>
	  <button type="default" class="b-t" @click="registerorlogin">注册/登录</button>
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
	  username:"",
	  password:"",
	  
    }
  },
  methods: {
	  // 微信登录
	  weixinlogin(){
		
	uni.login({
	  provider: 'weixin',
	  success: loginRes => {
	    console.log(loginRes.authResult);
	    // 获取用户信息
	    uni.getUserInfo({
	      provider: 'weixin',
	      success: infoRes => {
	        console.log(infoRes.userInfo);
			let user={
				
				birthday:infoRes.userInfo.birthday,
				sex:infoRes.userInfo.gender,
				faceImage:infoRes.userInfo.avatarUrl,
				nickname:infoRes.userInfo.nickName,
				id:infoRes.userInfo.openId
			}
			
			
			uni.showLoading({
				title:"正在登陆"
			})
			uni.request({
				url: `${this.$api}/appUnionLogin/?qq=434714873&loginType='weixin'`,
				method: 'POST',
				data: {
					face:user.faceImage,
					nickname:user.nickname,
					openIdOrUid:user.id
				},
				success: res => {
					uni.hideLoading()
					uni.setStorageSync("user",user)
					uni.switchTab({
						url:`/pages/my/my`
					})
				},
				fail: () => {
					uni.hideLoading()
					uni.showToast({
						title:"登录失败",
						icon:"none",
						duration:2000
					})
				},
				complete: () => {}
			});
	      }
	    });
	  }
	});
		  
	  },
	  // qq登录
	  qqlogin(){
		  uni.login({
		    provider: 'qq',
		    success: loginRes=> {
		      console.log(loginRes.authResult);
		      // 获取用户信息
		      uni.getUserInfo({
		        provider: 'qq',
		        success: infoRes=> {
		          console.log(infoRes.userInfo);
		  		let user={
					
				birthday:infoRes.userInfo.birthday,
				sex:infoRes.userInfo.gender,
					faceImage:infoRes.userInfo.headimgurl,
					nickname:infoRes.userInfo.nickname,
					id:infoRes.userInfo.openId
				}
		  		
		  		
		  		uni.showLoading({
		  			title:"正在登陆"
		  		})
		  		uni.request({
		  			url: `${this.$api}/appUnionLogin/?qq=434714873&loginType='qq'`,
		  			method: 'POST',
		  			data: {
		  				face:user.faceImage,
		  				nickname:user.nickname,
		  				openIdOrUid:user.id
		  			},
		  			success: res => {
		  				uni.hideLoading()
		  				uni.setStorageSync("user",user)
		  				uni.switchTab({
		  					url:"/pages/my/my"
		  				})
		  			},
		  			fail: () => {
		  				uni.hideLoading()
		  				uni.showToast({
		  					title:"登录失败",
		  					icon:"none",
		  					duration:2000
		  				})
		  			},
		  			complete: () => {}
		  		});
		        }
		      });
		    }
		  });
	  },
	  // 新浪登录
	  sinalogin(){
		  uni.login({
		    provider: 'sinaweibo',
		    success: loginRes=> {
		      console.log(loginRes.authResult);
		      // 获取用户信息
		      uni.getUserInfo({
		        provider: 'sinaweibo',
		        success: infoRes=> {
		          console.log(infoRes.userInfo);
		  		let user={
					birthday:infoRes.userInfo.birthday,
					sex:infoRes.userInfo.gender,
					faceImage:infoRes.userInfo.avatar_large,
					nickname:infoRes.userInfo.nickname,
					id:infoRes.userInfo.id
				}
		  		
		  		
		  		uni.showLoading({
		  			title:"正在登陆"
		  		})
		  		uni.request({
		  			url: `${this.$api}/appUnionLogin/?qq=434714873&loginType='sinaweibo'`,
		  			method: 'POST',
		  			data: {
		  				face:user.faceImage,
		  				nickname:user.nickname,
		  				openIdOrUid:user.id
		  			},
		  			success: res => {
		  				uni.hideLoading()
		  				uni.setStorageSync("user",user)
		  				uni.switchTab({
		  					url:'/pages/my/my'
		  				})
		  			},
		  			fail: () => {
		  				uni.hideLoading()
		  				uni.showToast({
		  					title:"登录失败",
		  					icon:"none",
		  					duration:2000
		  				})
		  			},
		  			complete: () => {}
		  		});
		        }
		      });
		    }
		  });
	  },
	  // 账号密码登录
registerorlogin(){
	if(this.username==="" || this.password===""){
		uni.showToast({
			title:"账号或密码不能为空",
			icon:"none",
			duration:2000
		})
	}else{
		uni.showLoading({
			title:"登陆中"
		})
		uni.request({
			url: `${this.$api}/user/registOrLogin?qq=434714873`,
			method: 'POST',
			data: {
				username:this.username,
				password:this.password
			},
			success: res => {
				uni.hideLoading()
				console.log(res)
				if(res.data.status===200){
					uni.setStorageSync("user",res.data.data)
					uni.switchTab({
						url:"/pages/my/my"
					})
				}else{
					uni.showToast({
						title:res.data.msg,
						icon:"none",
						duration:2000
					})
				}
				
			},
			fail: () => {
				uni.hideLoading()
			},
			complete: () => {}
		});
	}
	
	
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
.touxiang{
	width: 200rpx;
	height: 200rpx;
	position: absolute;
	left: 50%;
	margin-left: -100rpx;
	border-radius: 100rpx;
	top: 100rpx;
}
.zhanghao-box{
	width: 80%;
	height: 100rpx;
	position: absolute;
	display: flex;
	top: 400rpx;
	left: 100rpx;
	border-bottom: 1px solid #C0C0C0;
}
.mima-box{
	width: 80%;
	height: 100rpx;
	position: absolute;
	display: flex;
	top: 500rpx;
	left: 100rpx;
	border-bottom: 1px solid #C0C0C0;
}
.tt1{
	height: 100rpx;
	line-height: 100rpx;
	margin-left: 20rpx;
}
.tt{
	height: 100rpx;
	line-height: 100rpx;
}
.b-t{
	width: 500rpx;
	height: 80rpx;
	color: #FFFFFF;
	background-color: blue;
	line-height: 80rpx;
	position: absolute;
	top: 650rpx;
	left: 50%;
margin-left: -250rpx;
	
}
.chajian{
	width: 100%;
	position: absolute;
	top:750rpx;
	text-align: center;
	color: #AAAAAA;
	font-size: 28rpx;
	
}
.sanfang{
	width: 400rpx;
	height: 80rpx;
	line-height: 80rpx;
	position: absolute;
	top: 800rpx;
	
	left: 50%;
	margin-left: -200rpx;
	display: flex;
	justify-content: space-around;
}
.t-u{
	width: 70rpx;
	height: 70rpx;
}
</style>
