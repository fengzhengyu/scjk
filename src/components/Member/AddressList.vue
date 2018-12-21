<template>
  
   <transition name="slide">
    <div class="address-list">
        <mHeader>
             <div class="text" slot="text">我的收货地址</div>
             <div class="add" @click="$router.push({name:'addressAdd'})" slot="handle">
                <i class="iconfont icon-jiaru">
                </i>
            </div>
        </mHeader>
        <ul class="list ">
              <li v-for="(item,index) in addressList" :key="index" class="border-bottom">
                  <div class="info">
                     <p class="default">
                          <span v-if="item.addressStatus == 0">默认</span>
                          
                      </p> 
                      <div class="msg" @click.stop="changeAddress(item)">
                          <h2>{{ item.addressRegion }} {{item.addressDetail}}</h2>
                          <p>
                              <span class="name">{{item.consigneeName}}</span>
                              <span>{{ item.consigneePhone }}</span>
                          </p>   
                          
                      </div>
                      
                  </div>
                  <div class="handle">
                      <p></p>
                      <div @click.stop=" EditAddress(item,index)">
                          <i class="iconfont icon-bianji"></i>
                      </div>
                  </div>
                
                 
              </li>
             
              
             
          </ul>
          <div class="not-address" v-if="addressList.length<=0">暂无地址，请添加地址</div>
    </div>
  </transition>
  
</template>
<script>
    import EventBus from 'common/js/eventBus.js'
    import {  getAddressData, delAddressData } from 'common/api'
    import mHeader from 'components/Member/memberHead'
  export default {
      // props: {
      //     userCode: {
      //         type: String
      //     }
          
      // },
    data(){
      return {
        addressList:[],
        addressItem: {}
      }
    },
    created(){
         this.userCode = this.$store.state.userCode
             
            if(this.userCode){
                this.getAddressList()
            }
        
   },
    
    methods: {
        async getAddressList(){
            let {data:res} = await getAddressData({userCode: this.userCode});
            console.log(res)
            this.addressList = res.data;

        },
        goAddressEdit(){
              let  id =this.$route.query.id;
                this.$router.push({
                    name: 'order',
                    query: {id:id},
                    hash: '#addressEdit'

                })
        },
        changeAddress(data){
            this.$emit('changeAddressMsg',data)
            this.$router.go(-1)
            
        },
        EditAddress(data,i){
         
            this.$router.push({
                name: 'addressAdd',
                query: {id:data.addressId}
               

            })

        },
        async delAddress(item){

            let {data:res} = await  delAddressData({userCode:  this.userCode,addressId: item.addressId});
             this.$toast({
                message: res.info,
                position:'middle',
                duration: 2000
            });   
            if(res.flag == 'success'){
                this.getAddressList()
            }        
                      
        }
    },
    // 只有在组件销毁前，bus页面created 才能接受eventBus$on
    beforeDestroy(){
            EventBus.$emit('changeEditAddressMsg',this.addressItem)
    },
    components: {
        mHeader
    }
    
    
  }
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
    transition: all 0.3s

.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
.address-list
  position absolute
  top 0
  width 6.4rem
  bottom 0
  background #fff
  .header
    height .8rem
    line-height .8rem
    overflow hidden
    color #727272
    background #f9f9f9
    div
      float left
    .back
      width .8rem
      text-align center
     
      i 
        font-size .3rem
        color #727272
    .text 
      font-size .26rem
    .add
      float right 
      margin-right .3rem 
      width .48rem
      height .48rem
      background #fd7722
      border-radius 50%
      text-align center
      line-height .48rem
      margin-top .15rem
      i 
        font-size .18rem
        color #fff
  .list
    width 100%
    li 
        padding .5rem .3rem
        display flex
        // flex-direction column
        .info
            flex 1
            display flex
            .default
              flex 0 0 .55rem
              width .55rem
              span
                width .45rem
                padding .03rem 0
                background #fd7722
                color #ffffff
                font-size .16rem
                text-align center
                line-height normal
                display block
                        
            .msg 
                flex 1
                h2 
                    font-size .24rem
                    width 100%
                    color #2a2a2a
                    
                p 
                    padding-top .2rem
                    color #565656
                    font-size .2rem
                  
                    span.name 
                      margin-right .15rem
                    
        .handle
            height: .6rem;
            border-left: 1px  solid #d4d4d4
            flex 0 0 .6rem
            width .6rem
            div 
                width .6rem
                line-height .6rem
                text-align right 
                i 
                  font-size .36rem
                  color #adadad
  .not-address
      line-height 1rem
      text-align center
      font-size .22rem
      color #999


</style>

