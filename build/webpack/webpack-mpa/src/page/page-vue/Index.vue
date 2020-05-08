<template>
 <div class="example">{{ msg }}

    <span class="name">姓名：</span><el-input v-model="name" size="mini" style="width:160px" clearable></el-input> 
    4565451111212
dasdasd
    <i class="el-icon-delete"></i>

    <code-info :value="name"></code-info>
  </div>
</template>

<script>

//import codeInfo from "@/components/HelloWord.vue";

export default {
  data () {
    return {
      msg: 'Hello world!122',
      name:"Jack"
    }
  },
  components:{
     
    //codeInfo 
    codeInfo:()=>import("@/components/HelloWord.vue")
  },
  methods:{

    // async queryList(){
 
       

    //    let name = await setTimeout(()=>{

    //      return "JACK"
    //    })

    //    console.log(name); 
 
    // } 


  },
  mounted(){

    //this.queryList();


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

    .abc{
        color:rgb(255,0,0)
    }
  }
</style>