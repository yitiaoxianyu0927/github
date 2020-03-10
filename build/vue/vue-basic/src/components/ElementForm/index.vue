<template>
    <div class="ElementForm">
         
        <el-form 
        
            
            class="demo-form-inline form-container"  
            :label-width="ListForm.option.labelWidth + 'px'" 
            :label-position="ListForm.option.labelPosition" 
            size="small"
        
        >
            <el-row 
            
               v-for="(rowItem,rowIndex) in ListForm.row" 
               :key="rowIndex"

            >
                <el-col 

                   v-for="item in rowItem" 
                   :span="item.col"
                   :key="item.id"
                    
                >
                    
                    <el-form-item :label="item.name" v-if="item.elem != 'button'">
                        <!-- input 输入框 -->
                        <el-input 
                           
                           v-if="item.elem == 'input'"
                           :type="item.type||'text'"
                           v-model="item.value"
                           :disabled="item.disabled"
                           :placeholder="'请输入'+item.name"
                           clearable
                           @change="val => ChangeElem(item.id,val)" 

                        ></el-input>
                        <!-- input 输入框 -->

                        <!-- select 输入框 -->
                        <el-select 
                           
                           v-if="item.elem == 'select'"
                           v-model="item.value"
                           :disabled="item.disabled"
                           :placeholder="'请选择'+item.name"
                           @change="val => ChangeElem(item.id,val)" 

                        >
                            <el-option
                                
                                v-for="selectItem in item.option"
                                :key="selectItem.value"
                                :label="selectItem.name"
                                :value="selectItem.value"
                            
                            ></el-option>
                        </el-select>
                        <!-- select 输入框 -->

                        <!-- date-picker 输入框 -->
                        <el-date-picker
                           
                           v-if="item.elem == 'datePicker'"
                           :type="item.type||'date'"
                           v-model="item.value"
                           :disabled="item.disabled"
                           :placeholder="'请选择日期'"
                           clearable
                           @change="val => ChangeElem(item.id,val)" 

                        ></el-date-picker>
                        <!-- date-picker 输入框 -->
                           
                        <!-- switch 开关 -->
                        <el-switch
                           
                           v-if="item.elem == 'switch'"
                           v-model="item.value"
                           @change="val => ChangeElem(item.id,val)" 

                        ></el-switch>
                        <!-- switch 开关 --> 
                       
                        <!-- checkbox 选择框 -->
                        <el-checkbox-group 
                            
                            v-if="item.elem == 'checkbox'"
                            v-model="item.value"
                            @change="val => ChangeElem(item.id,val)" 
                        >
                            <el-checkbox 
                               
                               v-for="checkboxItem in item.option" 
                               :label="checkboxItem.name"
                               :key="checkboxItem.name"
                                     
                            ></el-checkbox>
                            
                        </el-checkbox-group>
                        <!-- checkbox 选择框 -->

                        <!-- radio 选择框 -->
                        <el-radio-group 
                          
                            v-if="item.elem == 'radio'"
                            v-model="item.value"
                            @change="val => ChangeElem(item.id,val)" 
                            
                        >
                            <el-radio 
                               
                               v-for="radioItem in item.option" 
                               :label="radioItem.name"
                               :key="radioItem.name"
                                     
                            ></el-radio>
                            
                        </el-radio-group>
                        <!-- radio 选择框 -->

                    </el-form-item>    

                    <div v-else class="buttonGroup" >
                        <el-button 
                            
                            v-for="buttonItem in item.option" 
                            :key="buttonItem.id" 
                            :type="buttonItem.type||'primary'" 
                            size="mini" 
                            @click="ButtonFunc(buttonItem.id)"
                            
                        >{{buttonItem.name}}</el-button>
                    </div>    
                    

                </el-col>    
            </el-row>    
        </el-form>
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
                    row:[],
                    rules:{}

                }


            }


        },
        model:{

            prop:"option",
            event:"ModelValue"

        },
        props:{

            option:{

                default:() => ({
                     
                    option:{

                        labelWidth:80,
                        labelPosition:"left"

                    },
                    row:[],
                    rules:{} 
                 
                })

            },
            value:""

        },
        methods:{

            formatOption(){

                this.ListForm = this.option;


            },
            ChangeElem(id,val){

                this.$emit("ChangeElem",id,val)

            },
            ButtonFunc(id){

                this.$emit("ButtonFunc",id)
            }

        },
        mounted(){

            this.formatOption();


        },
        watch:{

            option:{
　　　　　　　　
　　　　　　　　  handler(val,oldVal){
                    

                    this.formatOption();
    　　　　　　　　
                },
    　　　　　　 deep:true
　　　　　  }

        } 


    }

</script>


<style lang="less" scoped>
    
    .ElementForm{
       
        width: 100%;
        height: 100%;
        position: relative;

        .form-container{
            
            /deep/ .el-form-item__content{

                padding-right: 15px;
            }

            /deep/ .el-date-editor.el-input, .el-date-editor.el-input__inner{

                width: auto;
            }

            .buttonGroup{

                text-align:right
            }

        }



    }
    



</style>
