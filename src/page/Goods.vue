<template>
  <div class="goods">
    <RankHead class="header"></RankHead>

    <div class="content">
      <div class="menu-wrapper" ref="menuWrapper" id="menu-wrap">
        <ul>
          <li
            class="menu-list border"
            v-for="(item,index) in typeName"
            :key="index"
            :class="{'current':active == item.typeId}"
            @click="navTap(item.typeId)"
          >
            {{item.typeName}}
            <i></i>
          </li>
        </ul>
      </div>
      <div class="goods-wrapper" >
        <div id="div-wrap">
            <div
            v-if="isLoad"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10"
            >
            <ul>
                <li
                class="goods-list border-bottom"
                v-for="(item,index) in goodsList"
                :key="index"
                @click="goDetail(item)"
                >
                <div class="img">
                    <img v-lazy="item.goodsPhoto">
                </div>
                <div class="content-goods">
                    <h2 class="title">{{item.goodsName}}</h2>
                    <p class="norms">{{item.goodsSpecification}}</p>
                    <p class="price">{{item.goodsRetailPrice}}</p>
                    <p
                    class="price"
                    v-if="item.goodsTradePrice"
                    :class="{'buy-pirce':item.goodsProcurementPrice &&item.goodsProcurementPrice.length>0?false:true}"
                    >
                    <span>{{item.goodsTradePrice}}</span>
                    </p>
                    <p
                    class="buy-pirce"
                    v-if="item.goodsProcurementPrice"
                    >{{item.goodsProcurementPrice}}</p>
                    <div class="cart-control-wrapper" @click.stop>
                    <div
                        class="cart-decrease icon-circle"
                        v-show="item.goodsNum>0"
                        @click="editCart('minus',item)"
                    >
                        <i class="iconfont icon-jian"></i>
                    </div>
                    <div
                        class="cart-count"
                        v-show="item.goodsNum>0"
                    >{{typeof item.goodsNum == 'undefined'?$set(item,'goodsNum',0):item.goodsNum }}</div>
                    <div class="cart-add icon-circle">
                        <i class="iconfont icon-jiaru" @click="editCart('add',item)"></i>
                    </div>
                    </div>
                </div>
                </li>
            </ul>

            <div v-if="goodsList.length>0" class="bottom-tip">
                <div class="ladding" v-if="!end">
                <img src="../common/img/loading-svg/loading-spinning-bubbles.svg"> &nbsp; 加载中...
                </div>
                <div class="ladding" v-else>您已经到底了</div>
            </div>
            </div>
        </div>
         <div class="no-goods" v-if="goodsList.length<=0 && isLoadEnd">数据载入中</div>   
      </div>
    </div>

    
  </div>
</template>
<script>
import RankHead from "components/goods/RankHead.vue";
import {
  getGoodsTypeData,
  getIndexData,
  getAddCartData,
  getCartCount,
  getShareData
} from "common/api";
import wx from "weixin-js-sdk";

// let routerLeave =  false;
export default {
  data() {
    return {
      active: 1,
      tabStatus: 0,
      typeName: [],
      title: "分类页面",
      goodsList: [],
      page: 1,
      loading: true, //true为禁止，false 为启动
      isLoad: false,
      goodsNum: 0,
      end: false,
      isLoadEnd: false,
      scroll: 0 //记录滚动位置
    };
  },
  created() {
    this.active = this.$route.query.id || 1;

    this.getTypeName();
    this.$indicator.open({
      text: "Loading...",
      spinnerType: "fading-circle"
    });
    this.getGoodsTypeList();

    sessionStorage.clear();
  },
  computed: {
    userCode() {
      return this.$store.state.userCode == null
        ? ""
        : this.$store.state.userCode;
    }
  },
  mounted() {
    this.$nextTick(() => {
      let height =
        document.documentElement.clientHeight || document.body.clientHeight;
        document.getElementById("menu-wrap").style.height=  height -80+'px';
        document.getElementById("div-wrap").style.height=  height - 80  +'px';
    });
   
  },
  watch: {
    $route(to, from) {

        if(this.$route.meta.isUseCache){  
         
             document.getElementById("div-wrap").scrollTop = this.$route.meta.scrollTop ;
         }
         if(!this.$route.meta.isUseCache &&  to.name=='goods' && this.$route.query.id){
             console.log('没缓存')
         
            this.active = this.$route.query.id?this.$route.query.id: 1;
         
            this.page = 1;
            this.goodsList = [];
            this.end = false;
            this.loading = true;
            this.getGoodsTypeList();
        }
     
    }
  },

  methods: {
    async getWeChatShare() {
      let u = navigator.userAgent;
      let sharelink = "";
      if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        sharelink = encodeURIComponent(
          this.$store.state.shareUrl.split("#")[0]
        );
      } else {
        sharelink = encodeURIComponent(location.href.split("#")[0]);
      }
      let { data: res } = await getShareData({ url: sharelink }); //
      if (res && res.flag == "success") {
        //    if( this.shopId && this.shopId != '' && this.shopId != 'null' ){
        //         this.url = location.href.split('?')[0]+'?a='+this.$store.state.salesId+'&b='+this.shopId;
        //     }else{
        //         this.url = location.href.split('?')[0];
        //     }
        this.url = location.href.split("?")[0];
        let imgUrl = "http://www.scjksm.com" + require("../common/img/logo.png");

        let data = res.data;

        wx.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: [
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareQZone",
            "onMenuShareWeibo"
          ]
          //  'chooseImage','uploadImage','startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice'

          // 所有要调用的 API 都要加到这个列表中
        });
        wx.ready(() => {
          //分享给朋友
          // console.log(this.link)
          wx.onMenuShareAppMessage({
            title: "聚康供采平台", // 分享标题
            link: this.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            desc: "供应商与采购商的理想平台", // 分享描述
            imgUrl: imgUrl, // 分享图标

            success: function() {
              // 用户确认分享后执行的回调函数
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          });

          //分享到朋友圈
          wx.onMenuShareTimeline({
            title: "聚康供采平台", // 分享标题
            link: this.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

            imgUrl: imgUrl, // 分享图标
            success: function() {
              // 用户确认分享后执行的回调函数
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          });
          //分享到QQ
          wx.onMenuShareQQ({
            title: "聚康供采平台", // 分享标题
            link: this.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            desc: "供应商与采购商的理想平台", // 分享描述
            imgUrl: imgUrl, // 分享图标
            success: function() {
              // 用户确认分享后执行的回调函数
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          });
          //分享到微博
          wx.onMenuShareWeibo({
            title: "聚康供采平台", // 分享标题
            link: this.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            desc: "供应商与采购商的理想平台", // 分享描述
            imgUrl: imgUrl, // 分享图标
            success: function() {
              // 用户确认分享后执行的回调函数
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          });
          //分享到QQ空间
          wx.onMenuShareQZone({
            title: "聚康供采平台", // 分享标题
            link: this.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            desc: "供应商与采购商的理想平台", // 分享描述
            imgUrl: imgUrl, // 分享图标
            success: function() {
              // 用户确认分享后执行的回调函数
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          });
        });
      } else {
        console.log(res);
      }
    },
    async getTypeName() {
      let { data: res } = await getIndexData();
      if (res.goodsTypeList) {
        this.typeName = res.goodsTypeList;
        this.getTitle(); //获取分类名称
      }
    },
    getTitle() {
      if (this.typeName) {
        this.typeName.forEach(element => {
          if (element.typeId == this.$route.params.id) {
            this.title = element.typeName;
          }
        });
      } else {
        this.title = "分类页面";
      }
    },
    async getGoodsTypeList(flag) {
      let params = {};

      if (this.$store.state.salesId) {
        params = {
          typeId: this.active,
          salesId: this.$store.state.salesId,
          page: this.page,
          userType: "sales"
        };
      } else {
        params = {
          typeId: this.active,
          userCode: this.userCode,
          page: this.page
        };
      }

      let { data: res } = await getGoodsTypeData(params);

      this.getWeChatShare();
      if (flag) {
        this.goodsList = res.typeGoodsList;
        if (res.msg == "已到底部") {
          this.loading = true;
          this.end = true;
        } else {
          this.loading = false;
        }
      } else {
        if (res.flag == "success") {
          this.goodsList = res.typeGoodsList;
          this.loading = false;
          this.isLoad = true;

          if (res.msg == "已到底部") {
            this.loading = true;
            this.end = true;
          }
        } else {
          this.isLoadEnd = true;
        }
        this.$indicator.close();
      }
    },
    navTap(id) {
        this.active = id;
        this.page = 1;
        this.goodsList = [];
        this.end = false;
        this.loading = true;
        this.getGoodsTypeList();   
    },
    //上拉刷新
    loadMore() {
      // 缓存后 页面滚动条重复加载问题
      // if(routerLeave) return;
      this.loading = true;
      setTimeout(() => {
        this.page++;
        this.getGoodsTypeList(true);
      }, 300);
    },
    //  去详情页面
    goDetail(item) {
      this.scroll = document.getElementById("div-wrap").scrollTop;
      this.$router.push({
        name: "id",
        params: { goodsId: item.goodsId }
      });
    },
    // 加入购物车
    editCart(flag, item) {
      if (this.$store.state.salesId) {
        this.$toast({
          message: "您购买请联系您的店铺！",
          position: "middle",
          duration: 2000
        });
        return;
      }
      if (!this.userCode) {
        this.$toast({
          message: "请先登录",
          position: "middle",
          duration: 2000
        });
        setTimeout(() => {
          this.$router.push({
            name: "login",
            query: {
              redirect: this.$route.fullPath
            }
          });
        }, 500);

        return;
      }
      if (flag == "add") {
        item.goodsNum++;
      } else if (flag == "minus") {
        if (item.goodsNum <= 0) {
          return;
        }
        item.goodsNum--;
      }
      getAddCartData({
        userCode: this.userCode,
        goodsId: item.goodsId,
        goodsNum: item.goodsNum
      }).then(response => {
        let res = response.data;
        if (res.flag == "success") {
          let num = 0;
          if (flag == "add") {
            num = 1;
          } else if (flag == "minus") {
            num = -1;
          }
          this.$store.commit("updateCartCount", num);
        }
      
      });
    }
  },


  components: {
    RankHead
  },
   beforeRouteLeave(to,from,next){
    if(to.name =='index'){ //返回首页 点击分类 进入走watch 刷新数据
       from.meta.isUseCache = false;
     }
    
    from.meta.scrollTop = this.scroll;
    next()
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.goods 
  background #fff;

  .header 
    position static;
  
  .content 
      display flex;
      .menu-wrapper
        flex 0 0 1.4rem
        overflow-y: scroll;
        ul
         padding-bottom: 0.2rem;
         .menu-list
            border-left: 0.05rem solid $color-text;
            height: 0.8rem;
            line-height: 0.8rem;
            text-align: center;
            color: $color-text-d;
            font-size: $font-info;
            overflow hidden
            white-space nowrap;
            text-overflow ellipsis
            position: relative;

            i
                height: 100%;
                position: absolute;
                width: 1px;
                right: 0;
                top: 0;
                background: #fff;
                display: none;
            &.current
                border-left-color: $color-theme;
                background: #fff;
                i 
                    display: block;

      .goods-wrapper
        flex 1
        #div-wrap
         overflow-y: scroll;
         ul 
            margin-left: 0.2rem;
            .goods-list
                padding: 0.25rem 0;
                display: flex;
                align-items: center;
                .img
                    flex: 0 0 1.15rem;
                    margin-right: 0.2rem;
                    height: 1.15rem;
                    img 
                        width: 100%;
                        height: 100%;
                .content-goods
                    flex: 1;
                    position: relative;
                    margin-right: 0.2rem;
                    .title 
                        font-size: $font-highlight;
                        font-weight: bold;
                        height: 0.25rem;
                        line-height: 0.25rem;
                        color: $color-highlight;
                        width: 3.25rem;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    p 
                        padding-top: 0.14rem;
                        height: 0.16rem;
                        line-height: 0.16rem;
                        color: $color-highlight;
                        font-size: $font-info;
                        width: 3.25rem;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                        &.buy-pirce
                            color: $color-theme;
                        &.sale 
                            color: $color-highlight;
                    .cart-control-wrapper
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        font-size: 0;
                        .cart-decrease
                          
                        .cart-count 
                            display: inline-block;
                            width: 0.3rem;
                            height: 0.3rem;
                            padding: 0 0.05rem;
                            color: #000;
                            font-size: $font-info;
                            line-height: 0.3rem;
                            text-align: center;
                            font-size: 0.18rem;     
                        .icon-circle
                            display: inline-block;
                            width: 0.3rem;
                            height: 0.3rem;
                            background: $color-theme;
                            border-radius: 50%;
                            line-height: 0.3rem;
                            text-align: center;
                            font-size: $font-info;
                            i 
                                font-size: 0.18rem;
                                color: #fff;
                                font-weight: bold;
         .bottom-tip
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            color: #000;
            background: #fff;
            font-size: 0.18rem                    
            .loading-hook 
                img
                    width: 0.3rem;
        .no-goods {
            display: flex;
            justify-content: center;
            height: 100%;
            align-items: center;
            font-size: 0.2rem;
            color: #666;
        }            
</style>    


