const config = [{

    firstMenuId:"platform",
    siderMenu:[{

         id:"platformfirst",
         title:"首页",
         icon:"icon-office"
    },{

        id:"icon",
        title:"图标库",
        icon:"icon-gift"
   },{

        id:"custom",
        title:"自定义配置",
        icon:"icon-cogs"
   }]
   
 
},{

    firstMenuId:"practice",
    siderMenu:[{

        id:"table",
        title:"表格",
        icon:"icon-table2",
        children:[{

            id:"ElementTable",
            title:"表格封装",
            icon:"icon-stack"
         
        },{

            id:"ElementForm",
            title:"表单封装",
            icon:"icon-file-text"
         
        },{

            id:"word",
            title:"Word报告",
            icon:"icon-file-word"
         
        },{

            id:"node",
            title:"Node",
            icon:"icon-books"
         
        }]

    },{
        
        id:"chart",
        title:"图形",
        icon:"icon-stats-dots",
        children:[{

           id:"timemap",
           title:"时间轴地图",
           icon:"icon-map"
        },{

            id:"drillmap",
            title:"钻取地图",
            icon:"icon-map"
        },{

            id:"dynamicchart",
            title:"动态图形",
            icon:"icon-map"
        }]
    },{
        
        id:"map",
        title:"地图",
        icon:"icon-map",
        children:[{

           id:"maptalks",
           title:"maptalks",
           icon:"icon-map"

        }]
    },{
        
        id:"Integrate",
        title:"集成",
        icon:"icon-clipboard",
        children:[{

           id:"kettle",
           title:"kettle",
           icon:"icon-google-drive"

        }]
    },{
        
        id:"origin",
        title:"原生练习",
        icon:"icon-spinner10",
        children:[{

           id:"browerApi",
           title:"浏览器Api",
           icon:"icon-chrome"

        }]
    },{
        
        id:"performance",
        title:"性能",
        icon:"icon-whatsapp",
        children:[{

           id:"performanceList",
           title:"数据列表",
           icon:"icon-spotify"

        }]
    }]
    
},{

    firstMenuId:"module",
    siderMenu:[{

        id:"moduleIndex",
        title:"模块首页",
        icon:"icon-quill",
      
    }]
    
}]


export default config;