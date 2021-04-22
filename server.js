var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

 
    response.statusCode = 200
    //当路lujin为根目录时，默认首页为index.html
    const lujin = path === '/' ? '/index.html' : path
    const index = lujin.lastIndexOf('.') //获取lujin附近最后一个点，如：localhost:8888/index.html,'.'就是index后面的那个
    const houzhui = lujin.substring(index)//获取lujin中index(即：‘.’)后面的后缀,这样我们就取得了一个文件的后缀
    const fileType = {
        '.html':'text/html',
        '.css':'text/css',
        '.javascript':'text/javascript',
    }//文件后缀是什么，我们就让text变成什么
    response.setHeader('Content-Type', `${fileType[houzhui] || 'text/html'};charset=utf-8`)
    // ||后面是用来兜底的，如果后缀不是以上三个，那就默认使用html
    console.log(houzhui)
    let content 
    try{
      content = fs.readFileSync(`./public${lujin}`)
    }catch(error){
      content = '文件不存在'
      response.statusCode = 404
    }
    response.write(content)
    response.end()

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)