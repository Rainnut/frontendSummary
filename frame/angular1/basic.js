--------脏检测-----------
angular对常用的dom事件，xhr事件等做了封装，在里面触发进入angular的digest流程。
AngularJS会遍历DOM模板, 来生成相应的NG指令,所有的指令都负责针对
ng-model来设置数据绑定，因此, NG框架是在DOM加载完成之后, 才开始起作用的。
简单来说就是给每个需要绑定的元素加个watcher，缓存下oldValue，dirty check
比较newValue和oldValue，如果变化了做更新操作。

同一时间只允许一个$digest运行，而ng-click这种内置指令已经触发了$digest

