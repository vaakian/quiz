<template>
    <div id="home">
        <!-- 当前抽题模式：题库模式 -->
        <quizbody></quizbody>
        <!-- <van-button></van-button> -->
        
    </div>
</template>
<script>
import quizbody from './quizbody'
// import navBar from './navBar'
export default {
    name: 'home',
    components: {
        // navBar:navBar
        quizbody: quizbody
    },
    created: function(){
        this.$emit("updataTitle",0)
    }
}
</script>

