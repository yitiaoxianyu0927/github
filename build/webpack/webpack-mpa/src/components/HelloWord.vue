<template>
    <div class="font">这个是公共组件 props:{{value}}</div>
</template>



<script>
    
    export default {
        
        data(){

           return {

           }

        },
        props:["value"]
    
    
    }
</script>

<style lang="less" scoped>
    
    .font{

        color:chocolate;
    }


</style>
