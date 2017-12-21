<template>
    <div class="activeCard">
        <nui-step v-bind:index=step :values="['重置支<br>付密码','选择<br>账单日','激活<br>成功']"></nui-step>
        <!--第一步，重置密码-->
        <div class="active" v-if="status=='normal'&&step=='1'">
            <p class="cardNo">购牛卡号：{{cardNo}}</p>
            <div data-clipboard-action="copy" :data-clipboard-text="cardNo" class="clipboardCard"></div>
            <p class="tip">*修改购牛卡时需输入卡号，建议复制</p>
            <div class="SMS clearfix">              
                <input type="number" name="" value=""  placeholder="手机验证码"  v-model="yzm">
                <div class="SMSBtn cover" v-on:click="wait" v-bind:style="{ backgroundImage: backgroundImage }">{{seconds}}</div>
                <div class="line"></div>
            </div>
            <div class="change">
                <div class="cover changePw" id="d_clip_button" value="修改密码" v-on:click="change">修改密码</div>
                <nui-button type="empty" title="修改成功" :number="null"  @click.native="handleUpdatePasswordSuccess" v-if="firstFlag=='N'"></nui-button>
            </div>
            <div class="tips">
                <p class="tal">温馨提示：</p> 
                <p class="tal">1. 您在使用购牛卡进行信用支付时需要输入卡号及支付密码</p>
                <p class="tal">2. 购牛卡的初始支付密码不能用于信用支付，需重置密码后方可正常使用</p>
                <p class="tal">3. 重置支付密码功能由第三方支付提供；稻垣及牛娃不会因任何原因保存或索要您的密码</p>
                <p class="tal">4. 请您妥善保存好您的卡号及支付密码，避免因泄露带来损失</p>
            </div>
        </div>
        <!--重置密码部分结束-->
        <!--通讯录异常部分开始-->
        <div v-if="status=='abnormal'">
            <div class="abnormal">
                <div class="icon">
                    <img src="../../assets/imgs/abnormal.jpg" alt="">
                </div>
            </div>
            <div class="abnormalTips">
                <p>通讯异常未返回结果</p>
                <p>请点击刷新按钮</p>
            </div>
            
                <input type="button" class="contain" value="刷新">
            
        </div>
        <!--通讯录异常部分结束-->
        <!--选择账单日部分开始-->
        <div class="selectDate" v-if="status=='normal'&&step=='2'">
            <div class="dateWrap">
                <ul class="date">
                    <li v-for="(date,index) in dateTime" v-on:click="select(date.zd,date.hk, index)" class='contain' :class="{select:index==selectNow}">
                        <span>{{date.zd}}</span>
                        <span>{{date.hk}}</span>
                    </li>
                </ul>
                <div class="dateType">
                    <span>账单日：</span>
                    <span>还款日：</span>
                </div>
            </div>
            <p style="color:#cb4e80;font-size: .24rem;margin-bottom:.4rem">账单日：当期费用结算日，账单日当天消费计算在当期账单中</p>
            <nui-button type="solid" title="确定" :number="null" false false @click.native="submitDate"></nui-button>
            <div class="tips">
                <p class="tal">温馨提示：</p>
                <p class="tal">1. 选择账单日后，系统会自动匹配还款日</p>
                <p class="tal">2. 暂时不提供修改账单日及还款日功能，请谨慎选择 </p>
                <p class="tal">3. 还款日如果不能还款将会产生逾期，因而请根据您的收入情况科学选择账单日</p>
            </div>
        </div>
        <!--选择账单日部分结束-->
        <!--重置密码结果-->
        <div class="changeSuc" v-if="step=='1.5'&&isSuccess">
            <img src="../../assets/imgs/successChange.png" alt="" class="success">
            <p class="result">密码重置成功</p>
            <div class="next">
                <input type="button" class="cover" value="下一步" v-on:click="nextStep">
            </div>
            <div class="tips">
                <p class="tal">请您妥善保存好您的卡号及支付密码，避免因泄露带来损失；如果您发现卡号或密码可能泄露，请立即申请挂失</p>
            </div>
        </div>
        <div class="changeSuc" v-if="step=='1.5'&&!isSuccess">
            <img src="../../assets/imgs/changefail.png" alt="" class="success">
            <p class="result">密码重置失败</p>
            <div class="next">
                <input type="button" class="cover" value="重置密码" v-on:click="changeAgain">
            </div>
            <div class="tips">
                <p class="tal">请您妥善保存好您的卡号及支付密码，避免因泄露带来损失；如果您发现卡号或密码可能泄露，请立即申请挂失</p>
            </div>
        </div>
        <!--选择账单日结果-->
        <div class="selectDateResult" v-if="step=='4'">
            <img src="../../assets/imgs/successChange.png" alt="" class="success">
            <p class="result">激活账户成功</p>
            <div class="next">
                <input type="button" class="cover" value="确定" v-on:click="toIndex">
            </div>
        </div>
        <div class="selectDateResult" v-if="step=='3'">
            <img src="../../assets/imgs/changefail.png" alt="" class="success">
            <p class="result">选择账单日失败</p>
            <div class="next">
                <input type="button" class="cover" value="重新选择账单日" v-on:click="step='2'">
            </div>
        </div>
    </div>
</template>

 <script scoped>
    
    import toast from '../../components/toast/toast.js';
    import utils from '../../utils/utils.js';
    import Clipboard from 'clipboard';
    import jquery from 'jquery';
    export default {
        name: 'activeCard',
        created() {
            var _this = this;
            _this.step = '1';
            _this.seconds = '获取验证码';
            _this.flag = true;
            _this.status = 'normal';
            // 获取还款日期
            resource.setDate({},function(result){
                _this.dateTime = result.data;
            })
            // 获取用户密码是否修改接口
            resource.getUserPwdStatus({},function(result){
                if(result.code == '000000' && !utils.isEmptyObject(result.data)){
                    if(result.data.success){
                        _this.cardNo = result.data.cardNo;
                        _this.firstFlag = result.data.firstFlag
                    }else{
                        toast({
                            message: result.data.msg,
                            duration:'2000'
                        })
                        _this.cardNo = '8888 8888 8888 8888'
                    }
                }else{
                    toast({
                        message: result.msg, 
                        duration:'2000'
                    })
                    _this.cardNo = '8888 8888 8888 8888'
                }      
            })
            var clipboard = new Clipboard('.clipboardCard');
            clipboard.on('error', function(e) {
                            toast({message: '修改购牛卡时需输入卡号，建议手动复制',duration:'2000'})
            });
            clipboard.on('success',function(e){
                toast({message: '购牛卡号已复制到剪切板',duration:'2000'})
                clipboard.destroy()
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
                dateTime: [],
                selectDateResult: '',
                billDate: '01',
                repayDate: '13',
                firstFlag: 'Y',
                cardNo: '',
                selectNow:0
            }
        },
        methods: {
            select: function(billDate,repayDate,selectNow) {
                this.selectNow = selectNow;
                this.billDate = billDate;
                this.repayDate = repayDate;
            },
            submitDate: function($event) {
                var _this = this;
                resource.selectDate({"billDate": _this.billDate,"repayDate": _this.repayDate}, function(result) {
                    if(result.code == '000000'){
                        if(!utils.isEmptyObject(result.data)){
                            if (result.data.success) {
                                _this.step = "4";
                                _this.selectDateResult = true;
                            } else {
                                _this.step = "3";
                                _this.selectDateResult = false;
                            }
                        }else{
                            toast({
                                message: result.msg,  
                                position:'',  
                                iconClass:'warning',  
                                duration:'2500'
                            })
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
                var domains = "/api";
                if (window.location.port == "8080") {
                    domains = window.location.protocol + "//" + window.location.hostname + ":5200/api"
                }
                jquery.ajax({
                    url: domains + '/checkPhoneCode',
                    type: 'post',
                    async: false,
                    data: {
                        "phoneCode": _this.yzm
                    },
                    beforeSend: function(xhr) {
                        xhr.withCredentials = true;
                    },
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function(result){
                        if(result.code!="000000"){
                            toast({message: result.msg})
                            return;
                        }
                        if(!result.data.success){
                            toast({
                                message: "验证码错误", 
                                position:'',  
                                iconClass:'warning',  
                                duration:'2000'
                            })
                            return;
                        }
                        jquery.ajax({
                            url: domains +'/resetPayPassword',
                            type: 'post',
                            async: false,
                            data: {

                            },
                            beforeSend: function(xhr) {
                                xhr.withCredentials = true;
                            },
                            xhrFields: {
                                withCredentials: true
                            },
                            success: function(result1){
                                 if(result1.code == '000000'){
                                    if(result1.data.success){
                                        document.getElementsByClassName("clipboardCard")[0].click();
                                        setTimeout(function() {
                                            window.location.href = result1.data.url;
                                        }, 2000);  
                                    }else{
                                        toast({message: result1.data.msg})
                                    }
                                }else{
                                    toast({message: result1.msg})
                                }    
                            }
                        })
                    }
                })
            },
            nextStep: function() {
                this.step = '2';
            },
            changeAgain: function() {
                this.step = '1';
            },
            toIndex:function() {
                this.$router.push({path:'/'})
            },
            handleUpdatePasswordSuccess:function(){
                var _this = this;
                resource.handleUpdatePasswordSuccess({},function(result){
                    if(result.code == '000000'){
                        if(result.data.success){
                            _this.step = '1.5';
                            _this.isSuccess = result.data.success
                        }else{
                            _this.step = '1.5';
                            _this.isSuccess = result.data.success
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
            copy:function(){
                
            }
        }
    }
</script>

<style scoped>
    .tip{
        font-size: .2rem;
        text-align: left;
        margin-left: .36rem;
        color: #989aa9
    }
    .cardNo{
        margin-top: .5rem;
        font-size: .26rem;
        text-align: left;
        margin-left: .36rem;
        color: #CCC;
        line-height: .5rem;
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
        margin-top: .45rem;
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
        padding-top: 1.8rem;
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
    
    .abnormal {
        width: 100%;
        height: 3.8rem;
        position: relative;
    }
    
    .abnormal>.icon {
        width: 2.42rem;
        height: 2.4rem;
        overflow: hidden;
        border-radius: 50%;
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -1.21rem;
    }
    
    .abnormal img {
        height: 2.4rem;
    }
    
    .abnormalTips {
        height: 2.1rem;
        padding-top: 0.6rem;
    }
    
    .abnormalTips>p {
        color: #989aa9;
    }
    
    .abnormalTips>p:nth-child(1) {
        font-size: .32rem;
        margin-bottom: .1rem;
    }
    
    .abnormalTips>p:nth-child(2) {
        font-size: .3rem;
    }
    
    
    .success {
        width: 2.4rem;
        height: 2.4rem;
        margin-top: 1.4rem;
        margin-bottom: .55rem;
    }
    
    .result {
        font-family: 'simsun';
        color: #989aa9;
        font-size: .28rem;
        margin-bottom: 1.17rem;
    }
    
    .next {
        width: 100%;
    }
</style>