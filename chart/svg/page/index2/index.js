let point_center = [123.429096,41.796767];

let maxlng = 0,minlng = 0,maxlat = 0,minlat = 0;


let pathX = liaoning_json.features[0].geometry.coordinates[9].map((item,index) =>item[0]);

let pathY = liaoning_json.features[0].geometry.coordinates[9].map((item,index) =>item[1]);

let cw = 600,ch = 400;

let tx = 0,ty = -16;

maxlng = Math.max(...pathX);
minlng = Math.min(...pathX);
maxlat = Math.max(...pathY);
minlat = Math.min(...pathY);




////底部/////

let bottom_map_html = "";

for(let [index,item] of liaoningfull_json.features.entries()){



    for(let [i,v] of liaoningfull_json.features[index].geometry.coordinates.entries()){

        let points = v[0].map((item,index) =>{

            let percentX =  cw * 0.2 + ( item[0] - minlng ) * 1.0 /( maxlng - minlng ) * cw * 0.6 ;
            let percentY =  ch * 0.1 + ( 1 - ( item[1] - minlat ) * 1.0 /( maxlat - minlat ) ) * ch * 0.8;
        
            return ` ${percentX},${percentY} `


        }).join(" ");

        bottom_map_html+=`<polygon  class="mapborder_bottom"  points="${points}" stroke="#51b1ca" fill="#0f7996" />`
    } 


}

$("#bottom_map_area").html(bottom_map_html);


////顶部/////

let top_map_border_html = "";
let top_map_shadow_html = "";

// let path = liaoning_json.features[0].geometry.coordinates[9].map((item,index) =>{

    

//     let percentX =  cw * 0.2 + ( item[0] - minlng ) * 1.0 /( maxlng - minlng ) * cw * 0.6 - 6;
//     let percentY =  ch * 0.1 + ( 1 - ( item[1] - minlat ) * 1.0 /( maxlat - minlat ) ) * ch * 0.8 - 6;

//     return ` ${percentX},${percentY} `
// }).join(" ");

// $("#top_map_border").attr("points",path)

// console.log("path",liaoning_json)

for(let [i,v] of liaoning_json.features[0].geometry.coordinates.entries()){

    let points = v.map((item,index) =>{

        let percentX =  cw * 0.2 + ( item[0] - minlng ) * 1.0 /( maxlng - minlng ) * cw * 0.6 + tx;
        let percentY =  ch * 0.1 + ( 1 - ( item[1] - minlat ) * 1.0 /( maxlat - minlat ) ) * ch * 0.8 + ty;
    
        return ` ${percentX},${percentY} `

    }).join(" ");

    top_map_border_html+=`<polygon  class="map-border-top"  points="${points}" stroke="#fff" fill="rgba(0,0,0,0)" />`
   
    if(i == 9){

        top_map_shadow_html=`<polygon  class="map-shadow-top"  points="${points}" stroke="#9cd6dc" stroke-width="5" fill="rgba(0,0,0,0)" filter="url(#filter)"/>`
    }
}

$("#top_map_border").html(top_map_border_html);

$("#top_map_shadow").html(top_map_shadow_html);

let top_map_html = "";

for(let [index,item] of liaoningfull_json.features.entries()){



    for(let [i,v] of liaoningfull_json.features[index].geometry.coordinates.entries()){

        let points = v[0].map((item,index) =>{

            let percentX =  cw * 0.2 + ( item[0] - minlng ) * 1.0 /( maxlng - minlng ) * cw * 0.6 + tx;
            let percentY =  ch * 0.1 + ( 1 - ( item[1] - minlat ) * 1.0 /( maxlat - minlat ) ) * ch * 0.8 + ty;
        
            return ` ${percentX},${percentY} `


        }).join(" ");

        top_map_html+=`<polygon  class="map-area-top"  points="${points}" stroke="rgba(0,0,0,0)" fill="rgba(0,0,0,0)" />`
    } 


}


$("#top_map_area").html(top_map_html)
