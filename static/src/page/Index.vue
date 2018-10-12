<template>
    <div class="index">
         <Header></Header>
         <Classify></Classify>   
         <GoodsList></GoodsList>
         <Footer></Footer>
    </div>
</template>
<script>
    import Header from 'components/Index/Header'
    import Classify from 'components/Index/Classify'
    import GoodsList from 'components/Index/GoodsList'
    import Footer from 'components/common/Footer'
    export default {
        components: {
            Header,
            Classify,
            GoodsList,
            Footer
        }
    }
    
</script>
<style lang="stylus" scoped>
    .index 
       background #fff
</style>

