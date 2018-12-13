<template>
  <div class="cart-control">
     <div class="cart-control-wrapper">
                               
      <div class="cart-decrease icon-circle" >
          <i class="iconfont icon-jian"></i>
          </div>
      <div class="cart-count" >0</div> 
      <div class="cart-add icon-circle" >
        <i class="iconfont icon-jiaru"></i>
      </div>
  
</div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$emit('cart-add', event.target)
      },
      decreaseCart () {
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style>
  .cart-control {
    font-size: 0;
  }

  .cart-decrease, .cart-add {
    display: inline-block;
    vertical-align: top;
    padding: 6px;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0, 160, 220);
  }

  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding: 6px 0 0 0;
    color: rgb(147, 153, 159);
    font-size: 10px;
    line-height: 24px;
    text-align: center;
  }

  .move-enter-active {
    transition: all 0.4s linear;
  }

  .move-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .move-enter, .move-leave-to {
    opacity: 0;
    transform: translate3D(24px, 0, 0);
  }

  .cart-add {

  }
</style>
