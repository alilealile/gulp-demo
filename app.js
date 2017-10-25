// 安装了 express

let http =require("http"),
	express = require("express"),
	path = require("path");
let app =express();

// 开发环境
app.use("/",express.static(__dirname+"/view"));
app.use("/public",express.static(__dirname+"/public"));///将url地址指向项目中静态文件路径
  
// 部署环境
// app.use("/",express.static(__dirname+"/dist/view"));
// app.use("/public",express.static(__dirname+"/dist/public"));///将url地址指向项目中静态文件路径



//启动一个服务 传入
/*http.createServer(app).listen("8090",function() {
	console.log( "server start at 8090" );
});//3000到60000随便*/

app.listen(8090, () => {
  console.log('server start at 8090')
})


module.exports = app