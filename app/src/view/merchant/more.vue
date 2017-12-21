<template>
    <div class="more">    
        <div class="nav">
            <div class="all" v-on:click="selectShop(0,'全部','all')">
                <span :class="{active:selectNow=='all'}">全部</span>
            </div>
            <div class="navwrap">
                <ul class="shopnav" :style="{width:width}">
                    <li v-for="(shop,index) in shops" v-on:click="selectShop(index,shop,'category')" >
                        <span :class="{active:selectNow==index}">{{shop}}</span>
                    </li>
                </ul>
            </div>
        </div>    
        <div class="merchantList">
            <ul class="clearfix">
                <li class="merchant" v-for="(merchantInfo,index) in merchantInfo" v-bind:key="index" v-if="merchantInfo.status==1">
                    <div class="merchantIcon" v-bind:style="{'backgroundImage':'url(/share/pictures/vcc/merchant/'+ merchantInfo.logoUrl + ')'}"></div>
                    <span class="merchantName">{{merchantInfo.merchantName}}</span>
                </li>           
            </ul>
            <ul class="">
                <li class="merchant" v-for="(merchantInfo,index) in merchantInfo" v-bind:key="index" v-if="merchantInfo.status==2">
                    <div class="merchantIcon lifeStyle" v-if="merchantInfo.merchantType=='生活·时尚'"></div>
                    <div class="merchantIcon tourism" v-if="merchantInfo.merchantType=='旅游·票务'"></div>
                    <div class="merchantIcon education" v-if="merchantInfo.merchantType=='电商·教育'"></div>
                    <div class="merchantIcon other" v-if="merchantInfo.merchantType=='其他'"></div>
                    <span class="merchantName">{{merchantInfo.merchantName}}</span>
                </li>           
            </ul>
        </div>
    </div>
</template>
<script>
    import toast from '../../components/toast/toast.js';
    import utils from "../../utils/utils"
    export default {
        name: 'activeCard',
        created() {
            var _this = this;
            resource.merchantList({},function(result){
                _this.allMerchant = [];
                _this.merchantCategory = {};
                if(result.code == '000000'){
                    if(!utils.isEmptyObject(result.data)){
                        _this.shops = result.data.industryNameList
                        _this.width = 1.5*(_this.shops.length) + 'rem'
                        for(var key in result.data){
                            if(key!=="industryNameList"){
                                _this.merchantCategory[key]=result.data[key]
                            }
                        }
                        for(var key in _this.merchantCategory){
                            for(var i=0;i<_this.merchantCategory[key].length;i++){
                                _this.allMerchant.push(_this.merchantCategory[key][i])
                            }
                        }
                        _this.merchantInfo = _this.allMerchant
                    }else{
                        toast({message:'暂无商户信息'})
                    }
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
        data() {
            return {
                shops: '',
                merchantInfo: '',
                merchantCategory: '',
                allMerchant: '',
                width: '',
                selectNow: 'all'
            }
        },
        methods: {
            selectShop: function(selectNow,shop,category) {
                if(category=='all'){
                    this.selectNow = 'all';
                    this.merchantInfo = this.allMerchant;
                }else{
                    this.selectNow = selectNow;
                    this.merchantInfo = this.merchantCategory[shop];
                }
            }
        }
    }
</script>
<style scoped>
    .lifeStyle{
        background-image: url('../../assets/imgs/lifeStyle.png')
    }
    .other{
        background-image: url('../../assets/imgs/other.png')
    }
    .education{
        background-image: url('../../assets/imgs/education.png')
    }
    .tourism{
        background-image: url('../../assets/imgs/tourism.png')
    }
    .nav{
        width: 100%;
        height: 1rem;
        position: relative;
   }

    .navwrap {
        height: 1rem;
        overflow: hidden;        
        background-color: #363f5e;
        overflow: scroll;
        margin-left: 1.5rem;
    }
    
    .shopnav {
        /*width: 9rem;*/
        height: 1rem;
        
    }

    .all{
        position: absolute;
        top: 0;
        left: 0;
        background-color: #363f5e;
    }

    .shopnav>li,.all {
        float: left;
        width: 1.5rem;
        height: 1rem;
        color: #fff;
        font-size: .24rem;
        text-align: center;
        line-height: 1rem;
    }
    
    .active {
        height: .92rem;
        display: inline-block;
        border-bottom: .04rem solid #e35386;
        color: #e35386;
    }
    .merchantList{
        padding: .46rem 0;
    }

    .merchantList .merchant,.nologomerchant{
        width: 25%;
        text-align: center;
        float: left;
        margin-bottom: .38rem
    }

    .merchantList .merchant{
        height: 1.24rem;
    }

    .merchantIcon{
        width: .82rem;
        height: .82rem;
        border-radius: 50%;
        background-color: #fff;
        margin: 0 auto;
        background-repeat: no-repeat;
        background-size: .82rem .82rem
    }
    .merchantName{
        color: #9ca0ad;
        font-size: .24rem;
    }
</style>