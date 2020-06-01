const http = require("http");
const fs = require("fs");
const cp = require('child_process');
const path = require("path");
const glob = require('glob');
const cheerio = require('cheerio');
const mime = require("mime");
const portfinder = require('portfinder');
const config = require("../../config");


const host = "localhost";
const port = 4000;



//__dirname当前文件所在文件夹

const buildPackageName = config.buildPackageName; 

const projectUrl = "../..";

const packetUrl = `${projectUrl}/${buildPackageName}`;

const pageUrl = `${packetUrl}/page`;   ///找到页面路径


const pathList = glob.sync(path.join(__dirname, pageUrl + '/**/index.html'))

const baseUrl = path.join(__dirname, projectUrl);

//const urlList = pathList.map(item => item.substring(baseUrl.length))

//console.log(urlList)

const titleList = pathList.map(item => {  //获取标题
   
    let html = fs.readFileSync(item);
    let $ = cheerio.load(html);
    let title = $('title').text();
    
    return {

       name:title,
       url:  item.substring(baseUrl.length)

    }

})

//console.log(titleList)

fs.writeFile(path.join(__dirname,'index.html'), `

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>调试页面</title>
        <style>
        
            body,html,.container{

                margin:0;
                padding:0;
                width:100%;
                height:100%;    
            }

            .left-container,.right-container{

                box-sizing:border-box;
                height:100%;
                border:1px solid #3c454c;
                float:left;
            }

            .left-container{

                width:200px;
                padding:10px;
            }

            .right-container{

                width:calc(100% - 200px);
            }

            iframe{

                width:100%;
                height:100%;
                border:none;
            }

        </style>

    </head>
    <body>

        <div class="container">
            <div class="left-container">
                ${titleList.map(item => `
                  <a href="${item.url}" target="iframe">${item.name}</a>
                `).join("<br/>")}
            </div>
            <div class="right-container">
              <iframe src="${titleList.length > 0 ? titleList[0].url : ""}" name="iframe" ></iframe>
            </div>
        </div>    
        
        
    </body>
    </html> 

` , function(err) { //数据写入txt文本
    if (err) {
        throw err;
    }
});


const server = http.createServer(function(req,res){

    //设置响应头
    //设置访问的url路径
    
    


    if( req.url == "/index.html" || req.url == "/" || req.url == ""){

        

        fs.readFile(path.join(__dirname,'index.html') ,function(err,data){
        
            res.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"});
            res.end(data);
    
        })

    }else{

        let url = req.url; 

        let _url = (req.url.indexOf("?") >=0 ? req.url.split("?")[0] : req.url)  ///去掉参数的路径
        
        //console.log(_url)

        fs.readFile(path.join(__dirname,projectUrl,_url) ,function(err,data){

          
            res.writeHead(200, {
                "Content-Type": mime.getType(path.basename(_url))    // 转换成mime类型
             });
            
            res.end(data);
    
        })

    }      

   

});

portfinder.basePort = port;

portfinder.getPort((err, port) => {

    server.listen(port,function(){
        
        console.log(`running at ${port}......`);
        
        cp.exec(`start http://${host}:${port}/`);

    })

})

