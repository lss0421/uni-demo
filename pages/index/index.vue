<template>   <view>
	<lunbo :lunbo="lunbo"></lunbo>
<like :like="like"></like>
	   <hot :hot1="hot1" :hot2="hot2"></hot>
	   
  </view></template>	<script>

import lunbo from "../../components/index/lunbo.vue"
import like from "../../components/index/like.vue"
import hot from "../../components/index/hot.vue"export default {name: "",components: {
lunbo,
like,
hot,},props: {},data () {  return {
lunbo:[],
like:[],
hot1:[],
hot2:[]
    }  },  methods: {
	 getlunbo(){
		 uni.request({
		 	url: `${this.$api}/index/carousel/list?qq=434714873`,
		 	method: 'POST',
		 	data: {},
		 	success: res => {
				console.log(res)
			
					this.lunbo=res.data.data
			
				
			},
		 	fail: () => {console.log(Error)},
		 	complete: () => {}
		 });
	 },
	 
	 getlike(){
		 uni.request({
		 	url: `${this.$api}/index/guessULike?qq=434714873`,
		 	method: 'post',
		 	data: {},
		 	success: res => {
				console.log(res)
				
					this.hot1=res.data.data
				
			},
		 	fail: () => {},
		 	complete: () => {}
		 });
	 },
	 
	 gethot1(){
		 uni.request({
		 	url: `${this.$api}/index/movie/hot?qq=434714873&type=superhero`,
		 	method: 'POST',
		 	data: {},
		 	success: res => {
				console.log(res)
			
					this.like=res.data.data
				
			},
		 	fail: () => {},
		 	complete: () => {}
		 });
	 },
	 gethot2(){
	 		 uni.request({
	 		 	url: `${this.$api}/index/movie/hot?qq=434714873&type=trailer`,
	 		 	method: 'POST',
	 		 	data: {},
	 		 	success: res => {
	 				console.log(res)
	 			
	 					this.hot2=res.data.data
	 				
	 			},
	 		 	fail: () => {},
	 		 	complete: () => {}
	 		 });
	 },
	 	onReachBottom() {
			uni.showToast({
				title:"加载中",
				icon:"loading",
				duration:1000
			})				this.getlike()							},
			onPullDownRefresh() {				setTimeout(function() {					uni.stopPullDownRefresh();				}, 1000);							},

	   },  mounted () {  },  onLoad () {this.getlunbo()
this.getlike()
this.gethot1()
this.gethot2()
  },  filters: {  },  computed: {  },  watch: {  },  directives: {  }}</script><style scoped lang="scss"></style>