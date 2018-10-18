
/*
  api 文件
  返回的是promise对象，就会有then方法
*/ 
import axios from 'axios';

axios.defaults.baseURL= 'http://www.scjksm.com/scjkSvn/Home/'

// 拦截器 同归返回数据
// axios.interceptors.response.use((res)=>{
//   return res.data;
// })


// 登录接口
export  let getLoginData = (data) => {
  return axios.post('Login/login',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 注册接口

// 验证码接口

// 会员页信息接口
export let getMemberData = (data) => {
  return axios.post('User/index',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 上传头像接口
export let getLoadPhotoData = (data) => {
  return axios.post('User/saveUser',data,{
    headers:{'Content-Type':'multipart/form-data'}
  })
}

// 会员修改密码
export let getUpdatePassword = (data) => {
  return axios.post('User/savePass',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 会员收藏数据
export let getMemberCollect = (data) => {
  return axios.post('Collect/index',data,{
    transformRequest:[function(data){
        let params = '';
        for(let key in data){
            params += key +'='+data[key]+'&'
        }
        return params
    }]
    
  })
}
// 会员收藏删除
export let delMemberCollect = (data) => {
  return axios.post('Collect/delCollect',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}


// 获取主页数据
export let getIndexData = (data) => {
  return axios.post('Goods/index',data,{
    transformRequest:[function(data){
        let params = '';
        for(let key in data){
            params += key +'='+data[key]+'&'
        }
        return params
    }]
    
  })
}
// 获取分类页数据
export let getGoodsTypeData = (data) => {
  return axios.post('Goods/typeGoodsList',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 获取商品详情数据

export let getGoodsDetailData = (data) => {
  return axios.post('Goods/goodsDetail',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 加入购物车

export let getAddCartData = (data) => {
  return axios.post('Cart/addCart',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 从商品详情页立即购买
export let getNowBuyData = (data) => {
  return axios.post('Order/orderPay',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 商品详情页收藏
export let getCollectData = (data) => {
  return axios.post('Collect/addCollect',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 店铺数据
export let getShopData = (data) => {
  return axios.post('shop/shopDetail',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}

// 购物车数据

export let getCartData = (data) => {
  return axios.post('Cart/index',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 购物车数量加减

export let getCartCount = (data) => {
  return axios.post('Cart/numberCart',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 购物车结算

export let getCartPay = (data) => {
  return axios.post('Cart/cartPay',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}
// 购物车删除 
export let getCartDelete = (data) => {
  return axios.post('Cart/delCart',data,{
    transformRequest:[function(data){
      let params = '';
      for(let key in data){
          params += key +'='+data[key]+'&'
      }
      return params
    }]
  })
}

