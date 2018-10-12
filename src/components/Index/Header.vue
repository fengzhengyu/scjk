<template>
    <div class="header">
        <div class="search-wrap">
            <i class="iconfont icon-sousuo icon"></i>
            <input type="text" class="search"  value="搜索商品" @click="goSearch">
        </div>
    </div>     
</template>
<script>
    export default {
        methods: {
            goSearch(){
                this.$router.push({
                    name: 'search'
                })
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .header
        width 100%
        height 3rem
        background url('head.png') no-repeat
        background-size 100% 100%
    .search-wrap
        margin 0  .7rem
        padding-top .2rem
        height .5rem
        position relative
        
        .icon    
            color #c3c3c3
            font-size .3rem;
            display block
            position absolute
            top 50%
            left .15rem
            margin-top -0.01rem
        .search
            color #c3c3c3
            width 100%  
            height .5rem
            border-radius 0.2rem 
            padding .05rem  0  0.05rem .5rem
            box-sizing border-box
            outline none
            line-height .4rem
            font-size .24rem
</style>
