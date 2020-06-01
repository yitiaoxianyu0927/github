
//--------------------------系统核心配置文件，常量,部署时配置----------------------------

//var WEB_SERVER_BASE_URL = 'http://localhost:8080'; //本地测试地址
const WEB_SERVER_BASE_URL = 'http://188.103.142.161:8082';  //现场地址

var CORE_CONFIG = { 
  //公共配置项
  PROVINCE:'zjyd',//枚举值：jlyd lnyd sdyd hnyd zjyd scyd
  IS_ALWAYS_SERVER:true,  //是否始终从server端上读取数据，如果为true，始终从BASE_API的地址上读取测试数据
  IS_ALWAYS_MOCK:false,  //是否始终从mock上读取数据，如果为true，始终从MOCK_API的地址上读取测试数据 匹配优先级最高
  MOCK_API: 'http://59.46.22.93:47300/mock/5bdea2d98107910879608b77/tcoamp',//easy-mock 沈阳公网地址 http://59.46.22.93:47300/ 私网地址：http://10.4.2.8:7300/mock/
  BASE_API: WEB_SERVER_BASE_URL + '/tcoamp-web-bdm',//web后台服务URL
  
  WS_WEB_SERVER_BASE_API: 'ws://188.103.142.161:9090',//websocket地址
  WEB_RES_BASE_URL: WEB_SERVER_BASE_URL + '/tcoamp-web-res',//静态资源服务器
  GIS_MAP_URL:"/map",  //地图地址
  OTHER_MODULE:'http://188.103.142.161:8085/topo-web-ui', //其他模块地址
  PUBLIC_EXP_MAX_NUM:50000,//导出全部数据量上限常量
  PUBLIC_VERSION_ID:'1.0.0.20170101'

}

function geturl(name) {

  name = name || "x_token"

  var reg = new RegExp("[^\?&]?" + encodeURI(name) + "=[^&]+");
  var arr = window.location.href.match(reg);
  if (arr != null) {
    return decodeURI(arr[0].substring(arr[0].search("=") + 1));
  }
  return "";
}

var token = geturl();
if(!token){
  token = 'eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTAwNDMzNDEsInN1YiI6IntcImF2YWlsX2JlZ2luX2RhdGVcIjpcIjIwMTctMDYtMDEgMDA6MDA6MDBcIixcImF2YWlsX2VuZF9kYXRlXCI6XCIyMDIwLTEyLTAxIDAwOjAwOjAwXCIsXCJjcmVhdGVfZGF0ZVwiOlwiMjAxOS0wMy0yMCAyMDoyMTo1M1wiLFwiZGVsX2ZsYWdcIjpcIjBcIixcImRlcHRfaWRcIjpcIjEwMDBcIixcImRpc3RyaWN0X2xpc3RcIjpbXSxcImdyb3VwX2xpc3RcIjpbXSxcImllcnJvcnRpbWVcIjpcIjEyXCIsXCJtYW5hZ2VfZG9tYWluX2xpc3RcIjpbXSxcIm1vYmlsZVwiOlwiMTU5OTAwNTA3NDVcIixcIm9wZXJhdGVfbGlzdFwiOltdLFwicGFzc3dvcmRcIjpcImQ0ZWMzODhkMDBlOWU2MDZiN2I2ZjI3MjYzYzA4NzU5XCIsXCJyaWdodF9saXN0XCI6W10sXCJyb2xlX2xpc3RcIjpbXSxcInNhbHRcIjpcIk9SSkFVUXFBV2NcIixcInNleFwiOlwiMFwiLFwic3B3ZGFuc3dlclwiOlwiMlwiLFwic3B3ZHF1ZXN0aW9uXCI6XCIyKzE9P1wiLFwic3RhZmZfYWNjb3VudFwiOlwiYWRtaW5pc3RyYXRvclwiLFwic3RhZmZfaWRcIjpcIjEwMDBcIixcInN0YWZmX25hbWVcIjpcIui2hee6p-euoeeQhuWRmFwiLFwic3RhZmZfbm9cIjpcIjEwMDBcIixcInRlbHBob25lXCI6XCIxNTkxMTExMTExMVwiLFwidXBkYXRlX3Bhc3NfdGltZVwiOlwiMjAxOS0wMy0yMCAyMDoyMTo1M1wifSIsImV4cCI6MTYwMDA0MzM0MX0.eJKQU0ED_uuAWKELOZboIBXXwrUkim58syixiAyNpMw';
}

sessionStorage.setItem('Admin-Token',token);
