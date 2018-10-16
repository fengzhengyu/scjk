<template>
  <transition name="slide">
   <div class="address-page">

      <mt-header title="新增收货地址">
          <span to="" slot="left" @click="$router.go(-1)">
              <mt-button icon="">
                  <i class="iconfont icon-fanhui"></i>
              </mt-button>
          </span>        
      </mt-header>
      <ul class="edit-area">
        <li>
          <label>收货人</label>
          <div class="form-input ">
            <input type="text" placeholder="收货人姓名" class="input-text ">
          </div>
        </li>
        <li>
          <label>联系方式</label>
          <div class="form-input ">
            <input type="text" placeholder="收货人手机号" class="input-text ">
          </div>
        </li>
        <li>
          <label>所在区域</label>
          <div class="form-input area " >
            <div @click="showAddressPicker ">{{myAddressProvince}} {{ myAddressCity}} {{myAddresscounty}}</div>
            
          </div>
        </li>
        <li>
          <label>详细地址</label>
          <div class="form-input ">
            <input type="text" placeholder="街道详细地址" class="input-text ">
          </div>
        </li>
        <li>
          <label>设为默认地址</label>
          <div class="form-input ">
            <input type="checkbox" class="check">
          </div>
        </li>
      </ul>
      <div class="save-btn">
        保存并使用
      </div>
      <!-- <div class="picker-wrap" > -->
        <mt-popup position="bottom" v-model="popupVisible" class="region-popup">
           <mt-picker :slots="myAddressSlots" @change="onMyAddressChange" value-key="name" ></mt-picker>
        </mt-popup>
        
      <!-- </div> -->
     
    </div> 
   
    
    
    
  </transition>   
</template>
<script>
  import Address from 'common/js/address.json'
  import { Picker } from 'mint-ui';
  
  export default {
    components: {
      // 'mt-picker': Picker
    },
    data(){
      return {
        myAddressSlots: [
          {
            flex: 1,
            defaultIndex: 0,    
            values:this.getProvinceArr(),  //省份数组Object.keys(myaddress)
            //  values:Address,
            className: 'slot1',
            textAlign: 'center'
          },
          {
            divider: true,
            content: '-',
            className: 'slot2'
          },
          {
            flex: 1,
            values: this.getCityArr("北京市"),
            // values: [],

            className: 'slot3',
          
          },
          {
            divider: true,
            content: '-',
            className: 'slot4'
          },
          {
            flex: 1,
            values:this.getCountyArr("北京市","市辖区"),
            //  values: [],
            className: 'slot5',
           
          }
        ],
        myAddressProvince:'省',
        myAddressCity:'市',
        myAddresscounty:'区/县',
      
        popupVisible: false,
        regionInit: false,
        province:'',//省
        city:'',//市
        county:'',//县
       
      }
    },
    methods: {
      showAddressPicker(){
         this.popupVisible = true
        
      },
     onMyAddressChange(picker, values) {
      //  console.log(Address[0].name)
       if(this.regionInit){
          // console.log(values[0].children[0].children instanceof Array)
          // picker.setSlotValues(1,values[0].children); // Object.keys()会返回一个数组，当前省的数组
          // picker.setSlotValues(2,values[0].children[0].children); // 区/县数据就是一个数组
          picker.setSlotValues(1, this.getCityArr(values[0]["name"]));
          picker.setSlotValues(2, this.getCountyArr(values[0]["name"], values[1]["name"]))
          this.myAddressProvince = values[0]["name"];
          this.myAddressCity = values[1]["name"];
          this.myAddresscounty = values[2]["name"];

       }else{
         this.regionInit = true;
       }
      
      },
      getProvinceArr(){
        let provinceArr = [];
        Address.forEach(function (item) {
          let obj = {};
          obj.name = item.name;
          obj.code = item.code;
          provinceArr.push(obj);
        });
        return provinceArr;

      },
      getCityArr(province) {
        // console.log("省：" + province);
        let cityArr = [];
        Address.forEach(function (item) {
          if (item.name === province) {
            item.children.forEach(function (args) {
              let obj = {};
              obj.name = args.name;
              obj.code = args.code;
              cityArr.push(obj);
            });
          }
        });
        return cityArr;
      },
      //
     getCountyArr(province,city){
      
        let countyArr = [];
        Address.forEach(function(item){
          if (item.name === province){
            item.children.forEach(function (args) {
              if (args.name === city){
                args.children.forEach(function (param) {
                  let obj = {};
                  obj.name=param.name;
                  obj.code=param.code;
                  countyArr.push(obj);
                })
              }
            });
          }
        });
        // console.log(countyArr);
        return countyArr;
      },

    },
    created(){
    
      
    },
    mounted(){
//       
　　　　this.$nextTick(() => { //vue里面全部加载好了再执行的函数 （类似于setTimeout）
  
// 　　　　　this.myAddressSlots[0].defaultIndex = 1
　　　　});
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
        .edit-area
            color #000    
            // border-top 1px solid #dddddd
            border-bottom 1px solid #dddddd
            position relative
            font-size .26rem
            li 
              padding .2rem .2rem 
              display flex
              border-top 1px solid #dddddd
              label 
                color #333
                line-height .52rem
              .form-input 
                flex  1
                word-break break-all
                word-wrap break-word
                padding 0 .3rem 0 .2rem
                position relative
                .input-text 
                  width 100%
                  height 100%
                  vertical-align middle
                  border none 
                  outline none 
                  font-size .24rem
                .check
                  width .3rem
                  height .3rem
                  border 1px solid #ccc  
                  display inline-block
                  color #ccc
                  outline none
                  margin-top .1rem

                div
                  height 100%
                  line-height .52rem   
                  font-size .24rem
                &.area:after
                  content ''
                  display inline-block
                  width .2rem
                  height .2rem
                  position absolute
                  top 50%
                  right .2rem
                  margin-top -0.1rem
                  border-style solid
                  border-color #7D7D7D
                  border-width 1px 0 0 1px
                  transform rotateZ(135deg)
        .save-btn
            margin  .5rem .3rem
            padding 0 .2rem 
            line-height .6rem
            text-align center
            font-size .26rem
            background #e4393c
            color #fff

        .region-popup
          width 100%

</style>

