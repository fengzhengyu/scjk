<template>
 <transition name="slide">
   <div class="address-page">

      <mt-header title="选择地址">
          <span to="" slot="left" @click="$router.go(-1)">
              <mt-button icon="">
                  <i class="iconfont icon-fanhui"></i>
              </mt-button>
          </span>        
      </mt-header>
      <div class="address-content">
          <h1>
            配送地址
            <p @click="goAddressEdit">+增加配送地址</p>  
          </h1>
          <ul class="address-list">
              <li v-for="(item,index) in addressList" :key="index">
                  <div class="info">
                      <div class="cur" @click="changeAddress(item)">
                          <i class="iconfont icon-weixuanzhong " :class="{'icon-xuanzhong':item.selected}"></i>
                      </div>
                      <div class="msg ">
                          <h2>
                              <span class="name">{{item.name}}</span>
                              <span>{{ item.phone }}</span>
                          </h2>   
                           <p>
                               <span v-if="item.isdefault">默认</span>
                               {{ item.address }}
                            </p> 
                      </div>
                  </div>
                  <div class="handle">
                      <p></p>
                      <div @click=" EditAddress(item,index)">
                          <i class="iconfont icon-bianji"></i>
                      </div>
                      <div>
                           <i class="iconfont icon-shanchu"></i>
                      </div>
                  </div>
                 
              </li>
             
              
             
          </ul>
      </div>
    </div>
 </transition>
  
</template>
<script>
    import EventBus from 'common/js/eventBus.js'
  export default {
    data(){
      return {
          addressList: [
              {
                  name: '张三',
                  phone: 15188886666,
                  selected: false,
                  address: '北京市北京市房山区全区世茂维拉21号楼二单元202',
                  province: '北京市',
                  city: '市辖区',
                  county: '房山区',
                  isdefault: false
              },
              {
                  name: '张四',
                  phone: 15188886666,
                  selected: true,
                  address: '山西省忻州市忻府区奇村',
                  province: '山西省',
                  city: '忻州市',
                  county: '偏关县',
                  isdefault: true,
                   isdefault: false
              },
              {
                  name: '张五',
                  phone: 15188886666,
                  selected: false,
                  address: '北京市北京市海淀区区全区世茂维拉21号楼二单元202',
                  isdefault: false,
                  province: '北京市',
                  city: '市辖区',
                  county: '海淀区',
              },
              {
                  name: '张六',
                  phone: 15188886666,
                  selected: false,
                  address: '北京市北京市东城区全区世茂维拉21号楼二单元202',
                  isdefault: false,
                  province: '北京市',
                  city: '市辖区',
                  county: '东城区',
                 
              }

          ],
          addressItem: {}
      }
    },
    // created(){
      
    // },
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
    .address-page
        position fixed
        top 0
        right 0
        left 0
        bottom 0
        width 6.4rem
        margin 0 auto;
        background #ffffff
        overflow-y auto
        .mint-header
            background #f5f5f5;
            color #000
            font-size 18px
            .mint-header-button 
                .iconfont 
                    font-size 20px
                .mint-header-title
                        font-weight bold
        .address-content
            
            h1
                font-size .24rem
                padding .2rem
              
                background #dbd0ca
                p 
                    float right
            .address-list
                li 
                    padding .2rem .2rem 0 .2rem
                    border-bottom: 1px solid #d0d0d0;
                    display flex
                    flex-direction column

                    .info
                        display flex
                        flex-flow:row;
                        div 
                            
                            &.cur
                                width .6rem
                                margin-right: 0.1rem;
                                display flex
                                justify-content center
                                align-items center
                                i   
                                    font-size .36rem
                                    &.icon-xuanzhong
                                        color #cc3e2e
                                    
                            &.msg 
                                flex 1    
                                h2 
                                    height .5rem
                                    line-height .5rem
                                    font-size .26rem
                                    .name 
                                        margin-right .2rem
                                p 
                                    padding-bottom .1rem
                                    color #999
                                    font-size .22rem
                                    line-height .4rem
                                    span
                                        display inline-block
                                        background #f60
                                        padding  0 .1rem
                                        color #fff
                                        height .3rem
                                        line-height .3rem
                                        border-radius .05rem
                    .handle
                        height: .6rem;
                        border-top: 1px dashed #dcdcdc;
                        display flex
                        p 
                          flex 1

                        div 
                            width .6rem
                            line-height .6rem
                            text-align center
                            i 
                             font-size .36rem
                             color #666












</style>
