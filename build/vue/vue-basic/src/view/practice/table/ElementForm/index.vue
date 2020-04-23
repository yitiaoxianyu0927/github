<template>
    <div class="box-100 pad-20">

        <ElementForm
           
           :option="ListForm"
           @ChangeElem="ChangeElem"
           @ButtonFunc="ButtonFunc"
           @QueryFormData="QueryFormData"
        >
 
            <template slot="custom">
               <div class="custom">这个是自定义区域</div>
            </template>     

        </ElementForm>
        
    </div>
</template>



<script>

    import axios from "axios";


    export default {
        
        data(){

            return {
                
                ListForm:{

                    option:{

                        labelWidth:80,
                        labelPosition:"left"

                    },
                    row:[
                      
                        [
                            {
                                id:"name",
                                name:"活动名称",
                                elem:"input",
                                col:6,
                                value:""
                            },
                            {
                                id:"region",
                                name:"活动区域",
                                elem:"select",
                                col:6,
                                value:"",
                                option:[{
                                    name:"全部",value:""
                                },{
                                    name:"沈阳",value:"shenyang"
                                },{
                                    name:"上海",value:"shanghai"
                                }]
                            },
                            {
                                id:"date",
                                name:"活动区域",
                                elem:"datePicker",
                                type:"date",
                                col:6,
                                value:""
                            },
                            {
                                id:"buttonGroup",
                                elem:"button",
                                col:6,
                                option:[{
                                    id:"reset",
                                    buttonType:"reset",
                                    name:"重置",
                                    themeType:"default"
                                },{
                                    id:"search",
                                    buttonType:"search",
                                    name:"查询"
                                }]
                            }

                        ],
                        [
                            {
                                id:"delivery",
                                name:"即时配送",
                                elem:"switch",
                                col:6,
                                value:true
                            },
                        ],
                        [
                            {
                                id:"checkboxGroup",
                                name:"活动性质",
                                elem:"checkbox",
                                col:8,
                                value:[],
                                option:[{
                                    name:"活动性质1"
                                },{
                                    name:"活动性质2"
                                }]
                            },
                        ],
                        [
                            {
                                id:"radioGroup",
                                name:"特殊资源",
                                elem:"radio",
                                col:8,
                                value:"",
                                option:[{
                                    name:"单选框1"
                                },{
                                    name:"单选框2"
                                }]
                            },
                        ],
                        [
                            {
                                id:"dateRange",
                                name:"时间段",
                                elem:"datePicker",
                                type:"daterange",
                                startPlaceholder:"开始时间",
                                endPlaceholder:"截止时间",
                                col:8,
                                value:""
                            },
                            {
                                id:"custom",
                                name:"自定义",
                                col:8,
                                elem:"custom",
                            },
                        ]

                       
                    ],
                    rules:{} 



                }

            }

        },
        components:{
            ElementForm:()=>import("@/components/ElementForm")
        },
        methods:{
         
            ChangeElem(id,val){

                console.log(id,val)

            },
            ButtonFunc(id){

                console.log(id)
            },
            QueryFormData(formData){

                console.log("formData",formData); 

            }

        },
        mounted(){


        }
          

    }

</script>

<style lang="less" scoped>
    
    .custom{

       width: 100%;
       height: 100%;
       border:1px solid #000;

    }



</style>
