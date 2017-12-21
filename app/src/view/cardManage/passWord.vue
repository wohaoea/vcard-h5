<template>
    <div class="activeCard">
        <div class="isSuccessWrap">
            <div class="isSuccess">
                <div class="successChange selectButton" v-on:click="toCardMange"></div>
                <div class="failChange selectButton" v-on:click="closeIsSuccessWrap"></div>
            </div>
        </div>
        <div class="cardNo" v-show="step==1">银行卡号：{{ msg.cardNo }}</div>
        <!--第一步，重置密码-->
        <div class="active" v-if="status=='normal'&&step=='1'">
            <div class="SMS clearfix">              
                <input type="number" name="" value=""  placeholder="手机验证码"  v-model="yzm">
                <div class="SMSBtn cover" v-on:click="wait" v-bind:style="{ backgroundImage: backgroundImage }">{{seconds}}</div>
                <div class="line"></div>
            </div>
            <div class="change">
                <div class="cover changePw" value="修改密码" v-on:click="change">修改密码</div>
            </div>
            <div class="tips">
                <p class="tal">温馨提示：</p> 
                <p class="tal">1. 您在使用购牛卡进行信用支付时需要输入卡号及支付密码</p>
                <p class="tal">2. 购牛卡的初始支付密码不能用于信用支付，需重置密码后方可正常使用</p>
                <p class="tal">3. 重置支付密码功能由第三方支付提供；稻垣及牛娃不会因任何原因保存或索要您的密码</p>
                <p class="tal">4. 请您妥善保存好您的卡号及支付密码，避免因泄露带来损失</p>
            </div>
        </div>
    </div>
</template>

<script scoped>
    import toast from '../../components/toast/toast.js';
    export default {
        name: 'activeCard',
        created() {
            var _this = this;
            _this.step = '1';
            _this.seconds = '获取验证码';
            _this.flag = true;
            _this.status = 'normal';
            resource.userInfo({},function(result){
                _this.msg = result.data;
            })
            
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                if(from.path == '/card'){
                    document.getElementsByClassName('isSuccessWrap')[0].style.display = 'none';
                }else{
                    document.getElementsByClassName('isSuccessWrap')[0].style.display = 'block';
                }
            })
        },
        data() {
            return {
                seconds: '',
                backgroundImage: '',
                yzm: '',
                isSuccess: '',
                step: '',
                status: '',
                msg:Object
            }
        },
        methods: {
            wait: function() {
                if (this.flag) {
                    var _this = this;
                    _this.flag = false;
                    resource.sendPhoneCode({}, function(result) {
                        var data = result.data;
                        if(result.code == '000000'){
                            toast({message: data.msg})
                            if(data.success){
                                _this.backgroundImage = 'url()';
                                var seconds = 60;
                                _this.seconds = seconds + 's';
                                var time = setInterval(function() {
                                    seconds--;
                                    _this.seconds = seconds + 's';
                                    if (seconds == 0) {
                                        clearInterval(time);
                                        _this.backgroundImage = '';
                                        _this.seconds = '获取验证码';
                                        _this.flag = true;
                                    }
                                }, 1000)
                            }else{
                                setTimeout(function() {
                                    _this.flag = true;
                                }, 2500);
                            }
                        }else{
                            toast({message:result.msg})
                            setTimeout(function() {
                                _this.flag = true;
                            }, 2500);
                        }             
                    })
                }
            },
            change: function() {
                var _this = this;
                // 查询验证码是否正确
                resource.checkPhoneCode({
                    "phoneCode": _this.yzm
                },function(result){
                    if(result.code == '000000'){
                        if(result.data.success){
                            resource.resetPayPassword({},function(result){
                                if(result.code == '000000'){
                                    if(result.data.success){
                                        window.location.href = result.data.url;
                                    }else{
                                        toast({message: result.data.msg})
                                    }
                                }else{
                                    toast({message: result.msg})
                                }
                            })
                        }else{
                            toast({
                                message: "验证码错误", 
                                position:'',  
                                iconClass:'warning',  
                                duration:'2000'
                            })
                        }
                    }else{
                        toast({message: result.msg})
                    }
                })
            },
            toCardMange:function() {
                this.$router.push({path:"/card"})
            },
            closeIsSuccessWrap:function() {
                var isSuccessWrap = document.getElementsByClassName('isSuccessWrap')[0];
                isSuccessWrap.style.display = "none";
            },
            submitChange:function() {
                var isSuccessWrap = document.getElementsByClassName('isSuccessWrap')[0];
                isSuccessWrap.style.display = "block";
            }
        }
    }
</script>

<style scoped>
    
    .isSuccessWrap{
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 999;
        display: none;
    }
    .isSuccess{
        width: 5rem;
        height: 3.1rem;
        background-color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        border-radius: .26rem;
        padding-top: .4rem;
    }
    .selectButton{
        width: 4.4rem;
        height: 1rem;
        margin: 0 auto;
        margin-bottom: .28rem;
        border-radius: .1rem;
    }
    .successChange{
        background: url('../../assets/imgs/change_success.png') 0 0 no-repeat;
        background-size: 4.4rem 1rem;
    }
    .failChange{
        background: url('../../assets/imgs/change_fail.png') 0 0 no-repeat;
        background-size: 4.4rem 1rem;
    }
    .cardNo{
        margin-top: .6rem;
        font-size: .26rem;
        text-align: left;
        margin-left: .36rem;
        color: #989aa9
    }

    .selectDate {
        height: 3.94rem;
        padding-top: 1.92rem
    }
    
    .select {
        background: url("../../assets/imgs/select.png") 0 0 no-repeat;
        background-position: center;
        color: #fff!important;
    }
    
    .contain {
        background-size: contain!important;
        -webkit-background-size: contain!important;
        -ms-background-size: contain!important;
    }
    
    .dateWrap {
        height: 1.92rem;
        padding: 0 .28rem;
        margin-bottom: 1.96rem;
    }
    
    .dateType {
        width: 1.24rem;
        height: 100%;
        padding: .3rem 0;
    }
    
    .dateType>span {
        width: 100%;
        display: block;
        color: #989aa9;
        font-size: .28rem;
        line-height: .28rem;
    }
    
    .dateType>span:nth-child(2) {
        margin-top: .7rem;
    }
    
    .date {
        float: right;
        width: 5.7rem;
        height: 1.92rem;
    }
    
    .date>li {
        width: 12.25%;
        color: #989aa9;
        font-size: .28rem;
        line-height: .28rem;
        float: left;
        height: 100%;
    }
    
    .date>li>span {
        display: block;
        height: 50%;
        padding-top: .3rem
    }
    
    .tips {
        padding: .4rem .4rem
    }
    
    .tal {
        text-align: left;
        font-size: .24rem;
        color: #989aa9;
        line-height: .5rem;
    }
    
    .activeCard {
        padding-top: .3rem;
    }
    
    .contain {
        background-size: contain!important;
        -webkit-background-size: contain!important;
        -ms-background-size: contain!important;
    }
    
    .cover {
        background-size: cover!important;
        -webkit-background-size: cover!important;
        -ms-background-size: cover!important;
    }
    
    .SMS {
        margin-top: .9rem;
        padding: 0 .34rem;
    }
    
    .line {
        width: 100%;
        float: left;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.1);
    }
    
    .SMS>input {
        float: left;
        background-color: rgba(0, 0, 0, 0);
        font-size: .24rem;
        height: .84rem;
        color: #989aa9;
        padding-bottom: .32rem;
        width: 5rem;
    }
    
    .SMSBtn {
        float: right;
        width: 1.52rem;
        height: .54rem;
        background: url('../../assets/imgs/button.jpg') 0 0 no-repeat;
        font-size: .24rem;
        color: #fff;
        line-height: .54rem;
        border-radius: .1rem;
        background-color: #989aa9
    }
    
    .change {
        width: 100%;
        padding-top: 1.58rem;
    }
    
    input[type="button"] {
        width: 6.8rem;
        height: 1rem;
        background: url("../../assets/imgs/submit.jpg") 0 0 no-repeat;
        color: #fff;
    }

    .changePw{
        width: 6.8rem;
        height: 1rem;
        background: url("../../assets/imgs/submit.jpg") 0 0 no-repeat;
        color: #fff;
        margin: 0 auto;
        line-height: 1rem;
        font-size: .38rem;
        margin-bottom: .38rem;
    }

</style>