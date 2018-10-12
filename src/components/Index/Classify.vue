<template>
  <div class="classify">
      <ul class="classify-wrap">
          <li class="item" v-for="(item,index) in goodsTypeList" :key="index">
            <router-link :to="{name:'goods',params:{id:item.typeId}}" class="link">
                <span >
                    <div class="box" :class="imgList[index]"></div>
                </span>
                <span class="text">{{item.typeName}}</span>
            </router-link>
          </li>
           
      </ul>
    
  </div>
</template>
<script>
    export default {
        data() {
            return {
                goodsTypeList: [],
                imgList: [
                    'img1','img2','img3','img4','img5','img6','img7','img8',
                ]
            }
        },
        created() {

            this.getGoodsTypeList()
        },
        methods: {
            getGoodsTypeList(){
                this.$http.post('Goods/index',{},{
                    transformRequest:[function(data){
                        let params = '';
                        for(let key in data){
                            params += key +'='+data[key]+'&'
                        }
                        return params
                    }]
                    
                }).then(response=>{
                    let res =response.data
                    this.goodsTypeList = res.goodsTypeList;
                    
                    
                }).catch(err=>{
                    console.log(err)
                    this.goodsTypeList =[];
                })
            }
        }
    }
</script>
<style lang="stylus" scoped>
.classify 
    width 100%
    .classify-wrap 
        overflow hidden
        padding-bottom .15rem
        .item 
            float left
            width 25%
            margin-top .15rem
            span
                display block
                width 100%
                text-align center
                .box
                    width 1rem
                    height 1rem
                    display inline-block
                    &.img1
                        background url('./1.png') no-repeat
                        background-size 100% 100%
                    &.img2
                        background url('./2.png') no-repeat
                        background-size 100% 100%
                    &.img3
                        background url('./3.png') no-repeat
                        background-size 100% 100%
                    &.img4
                        background url('./4.png') no-repeat
                        background-size 100% 100%
                    &.img5
                        background url('./5.png') no-repeat
                        background-size 100% 100%
                    &.img6
                        background url('./6.png') no-repeat
                        background-size 100% 100%
                    &.img7
                        background url('./7.png') no-repeat
                        background-size 100% 100%
                    &.img8
                        background url('./8.png') no-repeat
                        background-size 100% 100%
            .text
                padding-top 0.15rem
                font-size .22rem
                color #7d7d7d

            
        
    

</style>

