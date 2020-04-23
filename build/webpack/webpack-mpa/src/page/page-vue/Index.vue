<template>
  <div class="example">{{ msg }}

    <span class="name">姓名：</span><el-input v-model="name" size="mini" style="width:160px" clearable></el-input> 
    4565451111212
dasdasd
    <i class="el-icon-delete"></i>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!122',
      name:"Jack"
    }
  }
}
</script>

<style lang="less" scoped>

  .example {
    color: red;
    .name{

       color:#fcaf41;
       font-size: 10px;
    }
  }
</style>