
const jsonServer = require('json-server')
const db = require('./db')
const cp = require('child_process');
const portfinder = require('portfinder');
const routes = require('./router')
const port = 5000;
const host = "localhost";

const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()
const rewriter = jsonServer.rewriter(routes)

server.use(middlewares)
// 将 POST 请求转为 GET
server.use((request, res, next) => {
  //  将所有的请求 都变为post形式
  delete require.cache[require.resolve("./db")]
  request.method = 'GET'
  next();

})

server.use(rewriter) // 注意：rewriter 的设置一定要在 router 设置之前
server.use(router)

portfinder.basePort = port;

portfinder.getPort((err, port) => {

  server.listen(port, () => {

    console.log('mock服务已启动 localhost:' + port)

    //cp.exec(`start http://${host}:${port}/`);

 
  })

})