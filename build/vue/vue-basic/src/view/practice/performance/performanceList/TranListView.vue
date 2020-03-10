<template>

  <div class="list-view-container trans-list-view">
    <div class="list-view left-list-view">
      <div class="list-title">
        <el-checkbox  v-model="leftCheckAll" @change="checkAll(1)"> 待选列表 </el-checkbox>
      </div>  
      <div class="list-search">
        <el-input v-model="leftSearch" placeholder="请输入" size="small" @change="FilterList(1)"/>
      </div>  
      
      <div 
        class="list-main" 
        ref="left-list-view-main"
        @scroll="handleScroll(1)">
        <div
          class="list-view-phantom"       
          :style="{height: leftcontentHeight}"
        ></div>
        <div
          ref="leftcontent"
          class="list-view-content">
          <div
              class="list-view-item"
              :style="{height: itemHeight + 'px'}"
              v-for="item in leftVisibleData"
              :key="item.value"
          >
            <el-checkbox  v-model="item.checked" > {{ item.value }} </el-checkbox>
          </div>
        </div>
      </div>

    </div>

    <div class="center-list-view">
        <div @click="changeData(1)">
          <i class="el-icon-arrow-right"/>
        </div>
        <div @click="changeData(2)">
          <i class="el-icon-arrow-left"/>
        </div>     
    </div>

    <div class="list-view right-list-view">
      <div class="list-title">
        <el-checkbox  v-model="rightCheckAll" @change="checkAll(2)"> 已选列表 </el-checkbox>
      </div>  
      <div class="list-search">
        <el-input v-model="rightSearch" placeholder="请输入" size="small" @change="FilterList(2)"/>
      </div>  
      
      <div 
        class="list-main" 
        ref="right-list-view-main"
        @scroll="handleScroll(2)">
        <div
          class="list-view-phantom"       
          :style="{height: rightcontentHeight}"
        ></div>
        <div
          ref="rightcontent"
          class="list-view-content">
          <div
              class="list-view-item"
              :style="{height: itemHeight + 'px'}"
              v-for="item in rightVisibleData"
              :key="item.value"
          >
            <el-checkbox  v-model="item.checked" > {{ item.value }} </el-checkbox>
          </div>
        </div>
      </div>

    </div>

  </div> 

</template>


<script>

export default {
    name: 'ListView',
 
    props: {
    data: {
        type: Array,
      required: true
    },
 
    itemHeight: {
      type: Number,
      default: 30
    }
  },
 
  computed: {
    leftcontentHeight() {
        return this.leftFilterData.length * this.itemHeight + 'px';
    },
    rightcontentHeight() {
        return this.rightFilterData.length * this.itemHeight + 'px';
    },
  },
 
  
 
  data() {
    return {

      leftListData: [],
      leftFilterData:[],
      rightListData:[],
      rightFilterData:[],
      leftCheckAll:false,
      leftSearch:"",
      rightCheckAll:false,
      rightSearch:"",
      leftscrollTop:0,
      rightscrollTop:0,
      leftVisibleData:[],
      rightVisibleData:[]

    };
  },
 
  methods: {

    checkAll(type){
          
        if(type == 1){
            
          this.leftFilterData = this.leftFilterData.map(item => {

              item.checked = this.leftCheckAll;

              return item; 
          })


        }else if(type == 2){
            
          this.rightListData = this.rightListData.map(item => {

              item.checked = this.rightCheckAll;

              return item; 
          })


        }


    },
    FilterList(type){
          
        if(type == 1){
            
          this.leftFilterData = this.leftListData.filter(item => item.value.indexOf(this.leftSearch)>-1)
          this.handleScroll(1); 

        }else if(type == 2){
            
          this.rightFilterData = this.rightListData.filter(item => item.value.indexOf(this.rightSearch)>-1)
          this.handleScroll(2);

        }   
        
        
        


    },
    changeData(type){

        if(type == 1){

          this.rightSearch = "";
            
          this.rightListData =  this.rightListData.concat(this.leftFilterData.filter(item => item.checked));

          this.rightFilterData = this.rightListData.filter(item => item.value.indexOf(this.rightSearch)>-1)

          this.leftListData = this.leftListData.filter(item => this.leftFilterData.filter(v => v.checked && v.value == item.value).length==0);
          
          this.leftFilterData = this.leftListData.filter(item => item.value.indexOf(this.leftSearch)>-1)
           

        }else if(type == 2){

          console.log(this.leftListData,this.leftFilterData,this.rightListData,this.rightFilterData)

            
          this.leftListData =  this.leftListData.concat(this.rightFilterData.filter(item => item.checked));

          this.leftFilterData = this.leftListData.filter(item => item.value.indexOf(this.leftSearch)>-1)

          this.rightListData = this.rightListData.filter(item => this.rightFilterData.filter(v => v.checked && v.value == item.value).length==0);
          
          this.rightFilterData = this.rightListData.filter(item => item.value.indexOf(this.rightSearch)>-1)
         
          console.log(this.leftListData,this.leftFilterData,this.rightListData,this.rightFilterData)
 

        }

        this.handleScroll(1); 

        this.handleScroll(2); 
       
        this.$emit("change",this.rightListData);

        

    },
    updateVisibleData(scrollTop,clientHeight,type) {

        scrollTop = scrollTop || 0;
        const visibleCount = Math.ceil(clientHeight / this.itemHeight); // 取得可见区域的可见列表项数量
        const start = Math.floor(scrollTop / this.itemHeight); // 取得可见区域的起始数据索引
        const end = start + visibleCount; // 取得可见区域的结束数据索引
        
        if(type == 1)
        
          this.leftVisibleData = this.leftFilterData.slice(start, end); // 计算出可见区域对应的数据，让 Vue.js 更新
        
        else if(type == 2)

          this.rightVisibleData = this.rightFilterData.slice(start, end);

        if(type == 1)

          this.$refs.leftcontent.style.webkitTransform = `translate3d(0, ${ start * this.itemHeight }px, 0)`; // 把可见区域的 top 设置为起始元素在整个列表中的位置（使用 transform 是为了更好的性能）

        else

          this.$refs.rightcontent.style.webkitTransform = `translate3d(0, ${ start * this.itemHeight }px, 0)`; // 把可见区域的 top 设置为起始元素在整个列表中的位置（使用 transform 是为了更好的性能）


    },
 
    handleScroll(type) {

      
      
      const scrollTop = type == 1?this.$refs["left-list-view-main"].scrollTop:this.$refs["right-list-view-main"].scrollTop;
      const clientHeight =  type == 1?this.$refs["left-list-view-main"].clientHeight:this.$refs["right-list-view-main"].clientHeight;
      

      this.updateVisibleData(scrollTop,clientHeight,type);
    }
  },
  created(){

      this.leftListData = this.data;
      this.leftFilterData = this.data;
       

  },
  mounted() {
    //this.updateVisibleData();
    this.handleScroll(1); 
  
  },
}  

</script>

<style lang="less" scoped>

.list-view-container{

    width:870px;
    height:400px;
    .list-view{

        height: 100%;
        width: 400px;
        position: relative;
        border: 1px solid #aaa;
        float: left;
        .list-title{
             
          height:40px;
          line-height: 40px;
          padding:0 20px; 
          background: #f5f7fa;
          border-bottom: 1px solid #ebeef5;
          .el-checkbox__input{
            margin-top:-4px !important;
          }
          .el-checkbox__label{
            font-size:16px !important;
          }

        }

        .list-search{

          height:30px;
          padding:0 20px;
          margin:15px 0;

        }

        .list-main{

            height: calc(100% - 110px);
            overflow: auto;
            position:relative;

            .list-view-phantom {

                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                z-index: -1;
            
            }
            
            .list-view-content {
              left: 0;
              right: 0;
              top: 0;
              width:100%;
              position: absolute;

              .list-view-item {
                padding: 0 20px;
                color: #666;
                line-height: 30px;
                box-sizing: border-box;
              }

            }


        }
        
        
       


    }
    .center-list-view{

        width:60px;
        height:100%;
        float: left;
        padding:10px;
        box-sizing: border-box;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items:center;
        &>div{
          
          width:40px;
          height:40px;
          border-radius: 50%;
          background: #f5f7fa;
          border:1px solid #dcdfe6;
          text-align: center;
          height: 40px;
          line-height:40px;
          margin-bottom: 10px;
          cursor: pointer;

        }

    }
  


}







 


</style>


<style>

  .trans-list-view .list-title .el-checkbox__input{

      margin-top:-4px !important;
    
  }

  .trans-list-view .list-title .el-checkbox__input{

      font-size:16px !important;
    
  }

</style>

