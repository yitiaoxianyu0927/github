<template>
    <div class="ElementForm">
       
        <el-form 
        
            ref="ElementForm"
            class="demo-form-inline form-container"  
            :label-width="ListForm.option.labelWidth + 'px'" 
            :label-position="ListForm.option.labelPosition" 
            size="small"
            :model="ListModelForm"
            :rules="{...ListForm.rules}"
        
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
                    
                    <el-form-item 
                        
                        :label="item.name" 
                        v-if="item.elem != 'button' || !(item.elem == 'custom' && !item.labelhidden )" 
                        :label-width="(item.labelWidth||ListForm.option.labelWidth) + 'px'"
                        :prop="item.id"
                    >
                        
                        <!-- input 输入框 -->
                        <el-input 
                           
                           v-if="item.elem == 'input'"
                           :type="item.type||'text'"
                           v-model="item.value"
                           :disabled="item.disabled||ListForm.option.disabled"
                           :placeholder="item.placeholder||('请输入'+item.name)"
                           clearable
                           @change="val => ChangeElem(item.id,val)" 

                        ></el-input>
                        <!-- input 输入框 -->

                        <!-- select 输入框 -->
                        <el-select 
                           
                           v-if="item.elem == 'select'"
                           v-model="item.value"
                           :disabled="item.disabled||ListForm.option.disabled"
                           :filterable="item.filterable"
                           :placeholder="item.placeholder||('请输入'+item.name)"
                           @change="val => ChangeElem(item.id,val,item)" 

                        >
                        <!-- :filterable="item.filterable" -->
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
                           :disabled="item.disabled||ListForm.option.disabled"
                           :placeholder="item.placeholder||'请选择日期'"
                           :value-format="item.valueFormat||'yyyy-MM-dd'"
                           :start-placeholder="item.startPlaceholder"
                           :end-placeholder="item.endPlaceholder"
                           clearable
                           @change="val => ChangeElem(item.id,val,item)" 

                        ></el-date-picker>
                        <!-- date-picker 输入框 -->
                           
                        <!-- switch 开关 -->
                        <el-switch
                           
                           v-if="item.elem == 'switch'"
                           v-model="item.value"
                           :disabled="item.disabled||ListForm.option.disabled"
                           @change="val => ChangeElem(item.id,val,item)" 

                        ></el-switch>
                        <!-- switch 开关 --> 
                       
                        <!-- checkbox 选择框 -->
                        <el-checkbox-group 
                            
                            v-if="item.elem == 'checkbox'"
                            v-model="item.value"
                            :disabled="item.disabled||ListForm.option.disabled"
                            @change="val => ChangeElem(item.id,val,item)" 
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
                            :disabled="item.disabled||ListForm.option.disabled"
                            @change="val => ChangeElem(item.id,val,item)" 
                            
                        >
                            <el-radio 
                               
                               v-for="radioItem in item.option" 
                               :label="radioItem.name"
                               :key="radioItem.name"
                                     
                            ></el-radio>
                            
                        </el-radio-group>
                        <!-- radio 选择框 -->

                        <!-- 自定义插槽 --> 

                        <slot  :name="item.id"></slot>
              
                        <!-- 自定义插槽 --> 

                    </el-form-item>    

                    <div v-if="item.elem == 'button'" class="buttonGroup" >
                        <el-button 
                            
                            v-for="buttonItem in item.option" 
                            :key="buttonItem.id" 
                            :type="buttonItem.themeType||'primary'" 
                            size="mini" 
                            @click="ButtonFunc(buttonItem.id,buttonItem)"
                            
                        >{{buttonItem.name}}</el-button>
                    </div>    
                    
                    <div v-if="item.elem == 'custom' && item.labelhidden" >
                        <slot  :name="item.id"></slot>
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

                },
                ListModelForm:{

                },
             

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

                this.ListForm = {...this.option};

                this.renderFormModel();
 
                this.$emit("RenderEnd",true);

            },
            ChangeElem(id,val,elemOption){


                console.log(id,val,elemOption)

                this.$emit("ChangeElem",id,val);


            },
            ButtonFunc(id,buttonOption){


                // if(buttonOption.buttonType == "search"){

                //    this.QueryFormData();                                 
                    
                // }

                this.$emit("ButtonFunc",id)
            
            },
            QueryFormData(){

                let option = {};

                this.ListForm.row.forEach((row,index) => {

                    row.forEach((item,i) => {

                        let val = item.value;

                        if(item.elem == "date"&&item.type == "daterange"&&item.value == null){

                            val = ["",""];  

                        }

                        if(item.elem == "select"){

                            val = item.option.filter(v => v.value == item.value)[0];

                        }
                        
                        option[item.id] = val;

                    })

                })
                
                return option;
                
                //this.$emit("QueryFormData",option);

            },
            renderFormModel(){

                let model = {}
              
                this.ListForm.row.forEach((item,index) => {

                    item.forEach((v,i) => {

                        model[v.id] = v.value||"";

                    })
                
                });

                this.ListModelForm = {...model};

            },
            setFormOption(option){ ///[{id:id,value:value}] 异步

                console.log("渲染子组件",option)

                let opt = [...option];

                this.ListForm.row = this.ListForm.row.map((item,index) => {

                    item = item.map((v,i) => {

                        let filterObj = opt.filter((f)=>f.id == v.id);
                        
                        if(filterObj.length == 1){

                            v = Object.assign(v, filterObj[0]);
                        }


                        return v; 

                    })
                    
                    return item;

                })


           
            },
            validForm(check = true){  //check false 不检验

                if(check){

                    return new Promise((resolve,reject)=>{

                        this.$refs["ElementForm"].validate((valid) => {

                            if (valid) {
                        
                                resolve(true);
                            
                            } else {
                            
                                reject(false);
                                return false;
                            }
                        });

                    })

                }else{

                    return new Promise((resolve,reject)=>{resolve(true)});
                }                


                
            },
            resetForm(){

               this.$refs["ElementForm"].resetFields();

               this.ListForm.row = this.ListForm.row.map((item,index) => {

                    item = item.map((v,i) => {

                        if(v.elem == "date"&&v.type == "daterange"){
                         
                            v.value = [];

                        } else if( v.elem == "checkbox") {

                            v.value = [];
                            
                        } else if( v.elem == "radio") {

                            v.value = v.option[0].name;
                            
                        } else {

                            v.value = "";
                             
                        } 
                        
                            

                       return v; 

                    })
                    
                    return item;

                }) 

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
　　　　　  },
//            ListForm:{

//             　　 handler(val,oldVal){
                    
//                     this.renderFormModel();
               
//                 },
//     　　　　　　 deep:true
// 　　　　　     
//            }

        } 


    }

</script>


<style lang="scss" scoped>
    
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
