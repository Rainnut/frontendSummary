详细讲解参考
https://juejin.im/post/59b9ffa8f265da06710d8e89  
--------版本变化----------------
babel 5 包含各种package、plugins，是一个全家桶。
babel 6 做了以下更新：
1、拆分成几个核心包，babel-core，babel-node，babel-cli...
2、没有默认的转换，需要手动添加plugin，即插件化。
3、添加preset，预设条件。
4、增加.babelrc文件，方便自定义的配置。
--------babel-cli---------------
npm install -g babel-cli
使用：babel 文件名.js  --out-file 转译成es5的文件名.js

--------babel-core--------------
babel的核心api都在里面，比如transform，都是处理转码的，把js代码抽象成AST（abstract syntax tree）。
eg:
var babel = require('babel-core');
var transform = babel.transform;
transform('code',option)    // =>{code,map,ast}

--------babel-external-helpers------------
用来生成一段代码，用于直接引用，避免各个模块各自定义一份，代码冗余。包含babel所有的helper函数（辅助函数。例如toArray函数，jsx转化函数。）这些函数都是babel transform
过程中需要使用的。

===> helper函数定义eg
(function(module, exports, __webpack_require__) {
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
Object.values = __webpack_require__(11).default;
console.log(Object.values({ 1: 2 }));

var a = (() => {
  var _ref = _asyncToGenerator(function* () {
    console.log('begin');
    yield new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, 1000);
    });
    console.log('done');
  });

  function a() {
    return _ref.apply(this, arguments);
  }

  return a;
})();
a();
})
===> 配置步骤
在.babelrc中添加'external-helpers'配置项
    {
      "plugins": [
        "transform-async-to-generator",
        "external-helpers"    // 使得webpack生成的代码为直接引用变成了 babelHelpers.asyncToGenerator 
      ]
    }
然后用node_modules/.bin/babel-external-helpers > helpers.js指定输出的路径和文件名，生成辅助函数。
windows环境使用：
node_modules\.bin\babel-external-helpers （使用反斜杠，输出文件默认根路径）
最后在入口文件中引用helpers.js文件。

--------babel-node--------------
node环境不支持jsx、解构赋值等语法，babel-node则具备这个能力，能够正常执行脚本和命令行写代码。
1、用node_modules/.bin/babel-node --presets env    替换   node 命令，可在命令行直接写代码运行。
2、用node_modules/.bin/babel-node --presets react test.js 替换  node test.js，可正常执行使用了jsx的脚本。
--presets react 等同于
{
    presets:["react"]
}

--------babel-register-----------
通过改写node本身的require，添加钩子，然后在require其他模块的时候，触发babel编译。
babel-register的特点是实时编译，不需要输出文件，执行的时候再编译。通常可搭配mocha做测试使用。
这个包最初在babel-core下，所以也可通过require('babel-core/register')引入。但是后续会从中废除，
最好使用require('babel-register');

eg:
===> normal方式
把有jsx的代码文件 a.js 编译后输出到 b.js 再执行node b.js
===> 实时编译
require('babel-register')({presets:['react']});
require('./test')  // 当执行到这句时，会触发钩子，直接触发babel编译。

--------babel-polyfill----------
babel默认只转换新的JavaScript语法，而不转换新的API。例如：Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、
Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转译。如果要使用这些新对象和方法，必须使用
babel-polyfill，为当前环境提供一个垫片。

--------babel-runtime----------
babel转译后的代码要实现原代码同样的功能，可能需要借助一些帮助函数，例如，{[name]:'javascript'}转译后的代码如下：
'use strict';
function _defineProperty(obj,key,value){
    if(key in obj){
        Object.defineProperty(obj,key,{
            value:value,
            enumerable:true,
            configurable:true,
            writable:true
        });
    }else{
        obj[key] = value;
    }
    return obj;
}
var obj = _defineProperty({},'name','javascript');

上面的帮助函数_defineProperty可能会重复出现在多个模块里，导致编译后的代码体积变大。
babel为了解决这个问题，提供了单独的包babel-runtime供编译模块复用工具函数。