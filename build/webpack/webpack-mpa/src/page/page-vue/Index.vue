<template>
 <div class="example">{{ msg }}

    <span class="name">姓名：</span><el-input v-model="name" size="mini" style="width:160px" clearable></el-input> 
    v12312
vvkk
    <i class="el-icon-delete"></i>1

    <h4>这是个标题</h4>
    <h4>这个是标题2</h4>
    <h4>这个是标题2</h4>

    <code-info :value="name"></code-info>

    {{listData}}
  </div>
</template>

<script>

//import codeInfo from "@/components/HelloWord.vue";

import axios from "axios"

export default {
  data () {
    return {
      msg: 'Hello world!122',
      name:"Jack",
      listData:""
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

    async queryList(){

        await axios.post("http://localhost:5000/test/test1").then(res => {

            this.listData = res;

             console.log(res)
        })   

        console.log(12)


    },
    queryList2(){
      
        axios.post("http://localhost:5000/test/test2").then(res => {

            this.listData = res;

             console.log(res)
        })   

    },
    queryList3(){
      
        axios.post("http://localhost:5000/test/test3").then(res => {

            this.listData = res;

             console.log(res)
        })   

    }


  },
  mounted(){

    this.queryList();

    this.queryList2();
    
    this.queryList3();

  }
}
</script>

<style lang="less" scoped>

  .example {
    color: blue;
    .name{

       color:#fcaf41;
       font-size: 12px;
    }

    .abc{
        color:rgb(255,0,0)
    }
  }
</style>