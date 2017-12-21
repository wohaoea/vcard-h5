<template>
    <div class="index">
        <div class="loading">
            <div class="load-icon"></div>
        </div>
        <div class="topWrap clearfix">
            <niu-card :msg="msg"></niu-card>  
            <div class="navWrap"  v-bind:style="{ overflow : overflow}">
                <ul class="nav clearfix" v-bind:style="{ width : width }">
                    <li class="teachNew contain" v-on:click="toTutorial"></li>
                    <li class="bill contain" v-on:click="toBill"></li>
                    <li class="repayment contain" v-if="msg.status == 'loan'" v-on:click="toRepayment"></li>
                    <li class="recharge contain" v-if="msg.status == 'loan'" v-on:click="toRecharge"></li>
                </ul>
            </div>
        </div>
        <swiper :options="swiperOption"  ref="mySwiper" v-if="activityInfo">  
            <!-- 这部分放你要渲染的那些内容 -->  
            <swiper-slide class="card-item" v-for="(activity,index) in activityInfo" v-bind:key="index"> 
                <a class="banner" v-bind:href="activity.linkURL">
                    <img v-bind:src="activity.imageURL" style="width:100%;height:100%">
                </a>
            </swiper-slide>  
        </swiper>  
        <div class="defaultBanner contain" style="display:block" v-else></div>
        <div class="support">
            <div class="supportTop">
                <span>支持的商户平台</span>
                <router-link to="/more" class="more">更多></router-link>
                <div class="line contain"></div>
            </div>
            <ul class="platform" v-for="i in 8">
                <li v-for="j in 4">
                    <img :src="imageSrc[(i-1)*4+j-1]">
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import toast from '../../components/toast/toast.js';
    import utils from '../../utils/utils';
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        name: 'index',
        components: {  
            swiper,  
            swiperSlide  
        }, 
        created() {
            var _this = this;
            // 获取活动信息
            resource.getActivityInfo({},function(data){
                _this.activityInfo = utils.isEmptyObject(data) ? null : data.list
            })
            resource.merchantName({},function(result){
                var merchantName = result.data;
                _this.imageSrc = [];
                for(var i=0;i<merchantName.length;i++){
                    _this.imageSrc.push(require("../../assets/imgs/logo/"+merchantName[i]+".png"))
                }
            })
        },
        mounted() {
            let _this = this;
            let sign = this.$route.query.sign;
            let promise = new Promise(function(resolve, reject){
                resource.findOneBySign({sign:sign},function(data){
                    if(data.code == '000000'){
                        resolve(data)
                    }else{
                        reject(data)
                    }
                })
            })
            promise.then(function(data){
                resource.userInfo({}, function(result) {
                    if(result.code == '000000'){
                        _this.indexRender(result)
                    }else{
                        document.getElementsByClassName('navWrap')[0].style.display = 'block'
                        toast({
                            message: result.msg,
                            duration:'2000'
                        })
                        _this.msg.cardNo = '8888 8888 8888 8888'
                    }
                })
            },function(data){
                document.getElementsByClassName('navWrap')[0].style.display = 'block'
                toast({
                    message: data.msg,
                    duration:'2000'
                })
                _this.msg.cardNo = '8888 8888 8888 8888'    
            })
        },
        data() {
            return {
                imageSrc: [],
                msg: {
                    "status": null,
                    "isOpen": null,
                    "isLock": null,
                    "cardStatus":'disActive',
                    "cardNo": '',
                    "creditAmt": '5000',
                    "billAmount": null,
                    "repayAmount": null,
                    "billDate": null,
                    "repayDate": null,
                    "isLoan": false,
                    "isActive": false
                },
                width: '',
                overflow: '',
                Toast: '',
                swiperOption: {  
                    initialSlide: 0,
                    pagination: '.swiper-pagination',  
                    slidesPerView: 'auto',  
                    centeredSlides: true,  
                    paginationClickable: true,
                    loop: true,
                    autoplay: 5000
                }, 
                activityInfo: null,
                merchantName: null
            }
        },
        methods: {
            indexRender: function(result){
                var _this = this;
                result.data.repayAmount = utils.toFixed(result.data.repayAmount,2);
                result.data.billAmount = utils.toFixed(result.data.billAmount,2);
                _this.msg = result.data;
                if (_this.msg.status == 'loan' || _this.msg.status == 'overtime' && _this.msg.cardStatus == 'active' && _this.msg.isOpen == "Y") {
                    _this.width = '14rem';
                    _this.overflow = 'scroll';
                } else {
                    _this.width = '7rem';
                    _this.overflow = 'hidden';
                } 
                _this.$nextTick(() => { 
                    document.getElementsByClassName('navWrap')[0].style.display = 'block'
                    if(_this.overflow == 'scroll'){
                        document.getElementsByClassName('navWrap')[0].scrollLeft = document.body.clientWidth/7.5*5.26;
                    }
                })   
            },
            refresh: function() {
                var loading =document.getElementsByClassName('loading')[0];
                loading.style.display = 'block';
                var _this = this;
                resource.userInfo({}, function(result) {
                    if(result.code == '000000'){
                        loading.style.display = 'none';
                        _this.indexRender(result);
                    }else{
                        toast({
                            message: result.msg,
                            position:'',
                            iconClass:'warning',
                            duration:'2500'
                        })
                    }
                })
            },
            applyOpen: function() {
                var _this = this;
                resource.findCustAuth({},function(result){
                    if(result.code == '000000'){
                        var data = result.data;
                        if(data.success){
                            _this.$router.push({path:"/open"})
                        }else{
                            toast({
                                message: data.msg,
                                position:'',
                                iconClass:'warning',
                                duration:'1500'
                            })  
                        }
                    }else{
                        toast({
                            message: result.msg,
                            position:'',
                            iconClass:'warning',
                            duration:'1500'
                        }) 
                    }
                })
            },
            toRecharge: function() {
                var _this = this;
                /**
                 *  判断用户是否绑卡
                 */
                resource.getBankInfo({},function(result){
                    if(result.data.data.length !== 0){
                        //跳转充值页面
                        _this.$router.push({path:"/cardManage/recharge"})
                    }else{
                        toast({
                            message: "暂无绑定的银行卡",
                            position:'',
                            iconClass:'warning',
                            duration:'1500'
                        })
                        //跳转到银行卡管理页面
                        setTimeout(function() {
                            _this.$router.push({path:"/cardManage/list"})
                        }, 1500);     
                    }
                })
            },
            toBill: function(){
                if(this.msg.status == 'loan'){
                    this.$router.push({path: "/bill/bill"})
                }else{
                    toast({"message":"暂无账单"})
                }
            },
            toTutorial:function () {
                this.$router.push({path: "/tutorial"})
            },
            isToActive:function() {
                var _this = this;
                resource.userInfo({}, function(result) {   
                    if(result.data.isWaitActive){
                        _this.$router.push({path : '/activeCard'}) 
                    }else{
                        _this.msg = result.data;
                    }             
                })
            },
            toRepayment:function() {
                this.$router.push({path: '/cardManage/repayment'})
            },
            toCardLink: function() {
                if(this.msg.status == 'loan' || this.msg.status == 'unloan' && this.pageType!=='cardLimit'){
                    this.$router.push({path: '/card'})
                }
            }
        },
        computed:{
            
        }
    }
</script>
<style scoped>
    .loading{
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: fixed;
        z-index: 9999;
        margin-top: -.3rem;
        display: none;
    }
    .load-icon{
        width: .64rem;
        height: .64rem;
        background-color: rgba(0, 0, 0, .4);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background: url('../../assets/imgs/loading.gif') 0 0 no-repeat;
        background-size: .64rem .64rem;
    }
    .w100 {
        width: 100%;
        text-align: left;
    }

    .w240 {
        width: 2.64rem;
    }

    .w122 {
        width: 1.2rem;
        display: inline-block;
    }

    .fl {
        float: left;
    }

    .fr {
        float: right;
    }

    .hide {
        display: none;
    }

    .contain {
        background-size: contain!important;
        -webkit-background-size: contain!important;
        -ms-background-size: contain!important;
    }

    .topWrap {
        background-color: #3a4467;
        box-sizing: border-box;
        overflow: hidden;
        margin-top: .3rem;
        margin-bottom: .4rem;
    }

    .navWrap {
        width: 100%;
        /*overflow: scroll;*/
        padding: 0 .52rem;
        box-sizing: border-box;
        margin-top: .4rem;
        display: none
    }

    .navWrap>.nav {
        width: 7rem;
    }

    .nav>li {
        width: 3rem;
        height: 1.58rem;
        background-color: pink;
        float: left;
        margin-right: .5rem;
    }

    .nav>li:nth-child(1) {
        background: url('../../assets/imgs/reference.png') 0 0 no-repeat;
    }

    .nav>li:nth-child(2) {
        background: url('../../assets/imgs/bill.png') 0 0 no-repeat;
    }

    .nav>li:nth-child(3) {
        background: url('../../assets/imgs/repayment.png') 0 0 no-repeat;
    }

    .nav>li:nth-child(4) {
        background: url('../../assets/imgs/recharge.png') 0 0 no-repeat;
    }

    .banner,.defaultBanner {
        display: block;
        width: 100%;
        height: 2rem;
    }
    .defaultBanner{
        background: url('../../assets/imgs/banner.jpg') 0 0 no-repeat
    }
    .support {
        margin-bottom: .5rem;
        background-color: #3a4467;
        color: #ffffff;
    }

    .supportTop {
        line-height: .96rem;
        width: 100%;
        box-sizing: border-box;
        padding: 0 .3rem;
        font-size: .3rem;
        text-align: left
    }

    .more {
        float: right;
        font-size: .22rem;
        color: #c95080
    }

    .line {
        width: 100%;
        height: 0.02rem;
        background: url('../../assets/imgs/separated.png') 0 0 no-repeat;
    }

    .platform {
        display: flex;
        padding: .38rem .52rem 0;
        box-sizing: border-box;
        justify-content: space-between;
        align-items:center
    }
    
    .platform img {
        width:100%;
        height:100%
    }

    .platform>li {
        width: .8rem;
        height: .8rem;
        background-color: #ffffff;
        border-radius: 50%;
        background-size: 3.5rem 1.7rem!important;
    }

    .shadow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: .24rem;
        z-index: 999;
        background-color: rgba(0, 0, 0, .4);
    }

    .button {
        display: block;
        width: 1.58rem;
        height: .58rem;
        margin: 2.26rem auto 0;
        font-size: .28rem;
        color: #ffffff;
        line-height: .54rem;
        text-align: center;
        border: .02rem solid #ffffff;
        border-radius: .08rem;
    }

    .accountInfo {
        color: #ffffff;
        font-size: .22rem;
    }

    .detail {
        margin-bottom: .04rem
    }

    .unlock>img {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -.7rem;
        margin-left: -.7rem;
        width: 1.4rem
    }

    .report {
        color: #ffffff;
        font-size: 0.24rem;
        margin-top: 2.96rem;
    }

    .refresh {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: 2.5rem auto 0;
    }

    .deal1 {
        color: #ffffff;
        font-size: .28rem;
        margin-top: 1.36rem;
        line-height: 1;
    }

    .deal2 {
        color: #ffffff;
        font-size: .28rem;
        line-height: 1;
        margin-top: .18rem;
    }

</style>
