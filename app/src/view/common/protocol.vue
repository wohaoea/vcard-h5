<template>
    <div v-html="html" class="html">
        <p>123123</p>
    </div>
</template>
<script>
    export default {
        name: 'protocol',
        data () {
            return {
                html: null
            }
        },
        created(){
            var _this = this;
            var protType = _this.$route.query.protType;
            resource.protocol({
                protType: protType
            },function (result) {  
                _this.html = result.data
            })   
        }
    }
</script>
<style scoped>
    body{
        
    }
    .html{
        background-color: #fff;
        text-align:left
    }
</style>
