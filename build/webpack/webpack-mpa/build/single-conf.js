var chalk = require('chalk');
var glob = require('glob');


function filterQueryPagePaths(pagePaths){

    let pageNames = process.env.PAGES_ENV; 

    
    
    if(pageNames && pageNames!="undefined"){  /// 校验是否有页面


        pageNames = pageNames.match(/,/g) ? pageNames.split(",") : pageNames;

        pagePaths = pagePaths.filter(item => {

            let pageName = item.split("/")[item.split("/").length-2]


            return pageNames.indexOf(pageName) >= 0

        })
        
    }

    return pagePaths;

}


exports.filterQueryPagePaths = filterQueryPagePaths;