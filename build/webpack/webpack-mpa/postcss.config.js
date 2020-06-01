module.exports = {
    plugins: {
        // 这个工具可以实现自动添加CSS3前缀
        "autoprefixer": {},
        // 如果你使用rem来实现移动端多设备适配，这个工具可以把px转换为rem
        /* "postcss-pxtorem": {
        	rootValue: 37.5, // 指定转换倍率，我现在设置这个表示1rem=37.5px;
        	propList: ['*'], // 属性列表，表示你要把哪些css属性的px转换成rem，这个*表示所有
        	minPixelValue: 1, // 需要转换的最小值，一般1px像素不转换，以上才转换
        	unitPrecision: 6, // 转换成rem单位的小数点后的保留位数
        	selectorBalckList: ['van'], // 匹配不被转换为rem的选择器
        	replace: true, // 替换包含rem的规则，而不是添加回退
        	mediaQuery: false // 允许在媒体查询中转换px
        }, */
        // 如果你使用vw来实现移动端多设备适配，这个工具可以把px转换为vw
        "postcss-px-to-viewport": {
        	unitToConvert: 'px', // 把什么单位转换成vw
        	viewportWidth: 750, // 这个可以按照你的设计稿来设置，是750就设置750，375就设置成375
        	unitPrecision: 6, // 转换成vw单位的小数点后的保留位数
        	propList: ['*'], // 属性列表，表示你要把哪些css属性的px转换成vw，这个*表示所有
        	viewportUnit: 'vw', // 使用的单位，目前可选单位有vw,vh。一般我们都有vw
        	fontViewportUnit: 'vw', // 字体使用的单位
        	selectorBlackList: [], // 匹配不被转换为vw的选择器
        	minPixelValue: 1, // 需要转换的最小值，一般1px像素不转换，以上才转换
        	mediaQuery: false, // 允许在媒体查询中转换px
        	replace: true, // 替换包含vw的规则，而不是添加回退
        	exclude: [], // 忽略一些文件，比如“node_modules”，可以是正则表达式
        	landscape: false,  // ......
        	landscapeUnit: 'vw', // ......
        	landscapeWidth: 568 // ......
        }
    }
}

