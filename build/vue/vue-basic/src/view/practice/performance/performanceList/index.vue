<template>
    <div class="container">
        <div class="title">
            数据列表性能优化 (共 {{listData.length}} 条)
        </div>
      


        <TranListView :data="listData" @change="changeList" />

        
    </div>
</template>




<script>
    
    import moment from "moment";

    import TranListView from "./TranListView.vue";

    // import listView from "./listView.vue";
    

    export default {

        data(){

            return {

                listData:Array.from({length:5},v=>{

                    let arr = {};

                  
                    arr.value = this.uuid();

                

                    arr.checked = false;
                    
                    return arr;
                }),
                placeholderHeight:1000, //
                listShowData:[],
                showNum:0,
                translateY:0



            }



        },
        components:{

            // listView:listView,
            TranListView:TranListView
        },
        methods:{


           
            changeList(){




            },
            uuid(){

                var s = [];
                var hexDigits = "0123456789abcdef";
                for (var i = 0; i < 36; i++) {
                    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
                }
                s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
                s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
                s[8] = s[13] = s[18] = s[23] = "-";

                var uuid = s.join("");
                return uuid;
            
            }


        },
        mounted(){

            //this.renderItem();

        }  


    }

</script>

<style lang="less" scoped>

    .container{

        width:100%;
        height:100%;
        padding: 20px; 

    }

    .title{
       
        height:30px;
        line-height: 30px;


    }

    .list-container{
       
        width:1000px;
        height: 400px;
        margin-top:10px;
        border:1px solid #000;
        box-sizing:border-box;
        overflow: auto;
        position: relative;
        .list-placeholder{
            width:100%;
            position: absolute;
            top:0;
        }
        .list-item{
         
            display: flex;
            flex-direction: row;
            align-items: center;
            border:1px solid #ccc;
            box-sizing:border-box;
            height: 30px;
            .list-check{
                margin-left:10px;
            }
            .list-index{
                width:40px;
            }
            .list-objectid{
                width:400px;
            }
            .list-time{
                width:200px;
            }
        }

    } 

</style>


