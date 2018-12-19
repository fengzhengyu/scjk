<template>
    <transition name="slide">
        <div class="mark-wrap">
            <mHeader>
                 <div slot="text" class="text">订单列表</div>
               
            </mHeader>
            <div class="goods-wrap">
              <div class="desc border-bottom">
                  <p>包裹</p>
                  <span>4件</span>
              </div>
              <ul class="goods">
                  <li class="border-bottom">
                      <div class="img"></div>
                      <div class="info">
                          <h3>标题</h3>
                          <p>300/sdfsd </p>
                          <p class="price">$50.00</p>
                          <div>x1</div>
                      </div>
                  </li>
                  <li class="border-bottom">
                      <div class="img"></div>
                      <div class="info">
                          <h3>标题</h3>
                          <p>300/sdfsd </p>
                          <p class="price">$50.00</p>
                          <div>x1</div>
                      </div>
                  </li>
              </ul>
            </div>
        </div>
    </transition>
   
</template>
<script>
 import mHeader from 'components/Member/memberHead'
    export default {
        components: {
            mHeader
        },
        data(){
            return {
                writeWord: ''
               
            }
        },
        created(){

        },
        computed: {
            newLength(){
                
                return this.writeWord.length
            }
        },
        methods: {
            save(){
                

              
                
                    
                
            },
            invoiceFlag(){
            
                this.$router.go(-1)

                
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
    .mark-wrap
        position absolute
        top 0
        bottom 0
        width 6.4rem
        background #ffffff
        .goods-wrap
            margin .15rem 
            .desc
                padding .25rem .2rem
                display flex
                font-size .24rem
                align-items center
                p 
                    flex 1
                    font-weight bold
                    color #202020
                span 
                    flex 1  
                    text-align right
                    color #ccc
            .goods
                li 
                    display flex        

                    .img 
                        margin .2rem .15rem
                        flex 0 0 1.25rem
                        width 1.25rem
                        height 1.25rem
                        border 0.01rem solid #150d0f
                        img  
                            width 100%
                            height 100%
                    .info
                        flex 1
                        padding .2rem
                        position relative
                        height 1.25rem
                        h3 
                            font-size .24rem
                            padding .1rem 0  
                            color #161616
                        p 
                            font-size .2rem
                            padding-top .15rem
                            color #9a9a9a
                            &.price
                                color #ff6600
                        div 
                            position absolute
                            right .2rem
                            bottom .2rem   
                            font-size .2rem
                            color #474747

        
                   
</style>    


