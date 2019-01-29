ECMAScript 3.1发布 后来改名 ECMAScript 5
ECMAScript 和 JavaScript的关系？
前者是后者的规范，后者是前者的一种实现

let、const 
1、声明的变量值再所在的代码块内有效，不存在变量提升。
2、不可重复定义
3、const声明的值和对象地址不可改变。

-----------作用域----------------
js中的作用域是以函数为边界
function foo(){
	var x = 1;
	if(x){
		var x = 2;
	}
	console.log(x);  // 2
}
function foo(){
	var x = 1;
	if(x){
		(function(){
			var x = 2;
		}());
	}
	console.log(x);  // 1
}
function foo(){
	var x = 1;
	if(x){
		(function(){
			x = 2;
		}());
	}
	console.log(x);  // 2
}

-----------函数提升--------------
function functionName(){}     // 函数声明
var functionName = function(){}     // 函数表达式
1、对于函数声明，js解析器会优先读取，确保在所有代码执行之前声明已经被解析
2、函数表达式，如同定义其它基本类型的变量一样，只在执行到某一句时也会对其进行解析
当使用函数声明的形式来定义函数时，可将调用语句写在函数声明之前，而后者，这样做的话会报错。

暂时性死区，只要块级作用域内存在let命令，它所声明的变量就“绑定”这个区域，不再受外部的影响。使用let命令声明变量之前，该变量都是不可用的。
var tmp = 123;
if(true){
	tmp = 'abc';  //referenceError
	let tmp;
}

-----------解构赋值--------------
let [head, ... tail] = [1,2,3,4];
head // 1
tail // [2,3,4]

let [a,b,...z] = ['1'];
a // '1'
b // undefined
z // []

let { foo : baz } = {foo:'123',bar:'222'};
baz // '123'

let {x:y = 3} = {}
y  // 3

const [a,b,c] = 'hello';
a //'h'
b //'e'
c //'l'

[[1,2],[3,4]].map(([a,b])=> a+ b )  // [3,7]

-----------Map对象--------------
let map = new Map();
map.set('first','hello');
map.set('second','hi');
for(let [key,value] of map){}
for(let [key] of map){}
for(let [,value] of map){}
	

	