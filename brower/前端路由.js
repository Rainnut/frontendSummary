功能：
1、记录、分享当前页面状态。
2、使用浏览器的前进后退功能。

条件：
1、改变url时，浏览器不向服务器发送请求
2、监测url变化
3、根据url解析信息匹配路由规则

---------hash方式---------
原理：
1、hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。
2、hash 改变会触发hashchange事件，浏览器的进、后退也能对其进行控制。

劣势：
1、只能设置与当前 URL 同文档的 URL
2、hash 只可添加短字符串

api：
window.location.hash = 'abb'；  
var hash = window.location.hash； //'#abb'
window.addEventListener('hashchange',function(){
	// 监听hash变化，点击浏览器的前进后退会触发
});

---------history方式---------
原理：利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。（需要特定浏览器支持）
这两个方法应用于浏览器的历史记录栈，在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。

优势：
1、设置的新 URL 可以是与当前 URL 同源的任意 URL
2、pushState() 通过 stateObject 参数可以添加任意类型的数据到记录中
3、pushState() 设置的新 URL 可以与当前 URL 一模一样，这样也会把记录添加到栈中；
   而 hash设置的新值必须与原来不一样才会触发动作将记录添加到栈中

劣势：
1、需要后台配置支持，在服务端增加一个覆盖所有情况的候选资源。

api：
window.history.pushState(state,title,url)
	// state：需要保存的数据，这个数据在触发popstate事件时，可以在event.state里获取
	// title：标题，基本没用，一般传 null
	// url：设定新的历史记录的 url。新的 url 与当前 url 的 origin 必须是一樣的，否则会抛出错误。url可以是绝对路径，也可以是相对路径。
	//当前url是 https://www.baidu.com/a/,执行history.pushState(null, null, './qq/')，则变成 https://www.baidu.com/a/qq/
	//执行history.pushState(null, null, '/qq/')，则变成 https://www.baidu.com/qq/

window.history.replaceState(state,title,url)
window.addEventListener(popstate,function(){
	// 监听浏览器前进后退事件，pushState 与 replaceState 方法不会触发
})
window.history.forward()
window.history.back()
window.history.go(-2)