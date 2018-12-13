<template>
  
   <transition name="slide">
    <div class="address-list">
        <div class="header border-bottom">
          <div class="back" @click="$router.go(-1)">
            <i class="iconfont icon-fanhui2"></i>
          </div>
          <div class="text">我的收货地址</div>
          <div class="add" @click="$router.push({name:'addressAdd'})">
            <i class="iconfont icon-jiaru">
            </i>
          </div>
        </div>

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
         this.userCode = this.getCookie('userCode');
             
            if(this.userCode){
                this.getAddressList()
            }
        
   },
    //  beforeCreate () {
    // console.group('%c%s', 'color:red', 'beforeCreate 创建前状态===============组件2》')
    // },
    // created () {
    // console.group('%c%s', 'color:red', 'created 创建完毕状态===============组件2》')
    // },
    // beforeMount () {
    // console.group('%c%s', 'color:red', 'beforeMount 挂载前状态===============组件2》')
    // },
    // mounted () {
    // console.group('%c%s', 'color:red', 'mounted 挂载状态===============组件2》')
    // },
    // beforeUpdate () {
    // console.group('%c%s', 'color:red', 'beforeUpdate 更新前状态===============组件2》')
    // },
    // updated () {
    // console.group('%c%s', 'color:red', 'updated 更新状态===============组件2》')
    // },
    // beforeDestroy () {
    // console.group('%c%s', 'color:red', 'beforeDestroy 破前状态===============组件2》')
    // },
    // destroyed () {
    // console.group('%c%s', 'color:red', 'destroyed 破坏状态===============组件2》')
    // }    
    methods: {
        async getAddressList(){
            let {data:res} = await getAddressData({userCode: this.userCode});
         
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
           this.addressItem = data;
            //  点击编辑时，vue生命周期,editaddres页面还未创建，导致   editaddres页created得不到eventbus.$on,mounted里面也是第一次得不到，之后点击才能得到，解决： 在beforeDestroy 前， editaddres页已加载
            // EventBus.$emit('changeEditAddressMsg',this.addressItem)
            let  id =this.$route.query.id;
            this.$router.push({
                name: 'order',
                query: {id:id},
                hash: '#addressEdit'

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
  z-index 999
  
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
                height .25rem
                background #fd7722
                color #ffffff
                font-size .16rem
                text-align center
                line-height .25rem
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

