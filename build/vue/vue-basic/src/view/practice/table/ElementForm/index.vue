<template>
    <div class="box-100 pad-20">

        <ElementForm
           
           :option="ListForm"
           @ChangeElem="ChangeElem"
           @ButtonFunc="ButtonFunc"
        
        >
        </ElementForm>
        
    </div>
</template>



<script>


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
                                    name:"重置",
                                    type:"default"
                                },{
                                    id:"search",
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
            }

        },
        mounted(){


        }
          

    }

</script>

