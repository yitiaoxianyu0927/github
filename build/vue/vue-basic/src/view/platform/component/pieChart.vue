<template>
    <div class="container pad-20 box-100">
        <div class="title">访问人数</div>
        <div class="chart" ref="chart"></div>    
    </div>
</template>


<script>

import echarts from "echarts";


export default {

    data(){

        let data = {

            chart:null


        }

        return data;
    },
    methods:{

        renderChart(){

            let option = {


                angleAxis: {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    z: 10,
                    startAngle:180,
                    axisTick:{show:false},
                    axisLine:{show:false},
                    
                },
                radiusAxis: {

                    axisLabel:{show:false},
                    axisTick:{show:false},
                    axisLine:{show:false},
                    splitArea:{show:false},
                    max:10,

                },
                polar: {
                    startAngle:180
                },
                tooltip:{},
                series: [{
                    type: 'bar',
                    color: "#3398DB",
                    data: [8, 4, 6, 8, 6, 9, 6],
                    coordinateSystem: 'polar',
                    name: '访问人数',
                    stack: 'a',
                    label:{
                        show:true
                    }
                }
                ]
            };

            this.chart.setOption(option);

        }


    },
    mounted(){


        this.chart = echarts.init(this.$refs["chart"]);  
  

        this.renderChart();

    },
    beforeDestroy() {
       
        if (!this.chart) {
        return
        }
        this.chart.setOption({});
        this.chart.dispose()
        this.chart = null
    },

    
}
</script>


<style lang="less" scoped>

   .container{

       height: 300px;
       background: #fff;
       border-radius:3px;
       box-shadow:1px 1px 10px #ccc;
       padding: 5px 15px;
       .title{

           padding: 5px;
           height:36px;
           width: 100%;
       }
       .chart{
            width: 100%;
            height:calc(100% - 36px);

       }

   }



</style>



