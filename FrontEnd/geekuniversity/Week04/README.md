# 结构化编程    [返回](../../README.md)

JS 执行粒度
- 宏任务
- 微任务
- 函数调用
- 语句/声明
- 表达式
- 直接量/变量/this

JavaScript执行一段脚本的时候，V8会为其创建一个全局执行上下文，在创建全局执行上下文的同时，V8引擎也会在内部创建一个微任务队列。  

那就是当循环系统在执行一个任务的时候，都要为这个任务维护一个系统调用栈。这个系统调用栈类似于JavaScript的调用栈
Parse HTML任务在执行过程中会遇到一系列的子过程，比如在解析页面的过程中遇到了JavaScript脚本，那么就暂停解析过程去执行该脚本，等执行完成之后，再恢复解析过程。然后又遇到了样式表，这时候又开始解析样式表……直到整个任务执行完成。  
每个任务在执行过程中都有自己的调用栈，那么同步回调就是在当前主函数的上下文中执行回调函数，这个没有太多可讲的。下面我们主要来看看异步回调过程，异步回调是指回调函数在主函数之外执行，一般有两种方式：  

第一种是把异步函数做成一个任务，添加到信息队列尾部；  
第二种是把异步函数添加到微任务队列中，这样就可以在当前任务的末尾处执行微任务了。  
## 宏任务与微任务
当拿到一段 JavaScript 代码时，浏览器或者 Node 环境首先要做的就是；传递给 JavaScript 引擎，并且要求它去执行。  
我们首先应该形成一个感性的认知：一个 JavaScript 引擎会常驻于内存中，它等待着我们（宿主）把 JavaScript 代码或者函数传递给它执行。  
我们把宿主发起的任务称为宏观任务，把 JavaScript 引擎发起的任务称为微观任务。  
JavaScript 引擎等待宿主环境分配宏观任务，在操作系统中，通常等待的行为都是一个事件循环，所以在 Node 术语中，也会把这个部分称为事件循环。  
- 渲染事件（如解析DOM、计算布局、绘制）；
- 用户交互事件（如鼠标点击、滚动页面、放大缩小等）；
- JavaScript脚本执行事件；
- 网络请求完成、文件读写完成事件。

同步代码也是微任务， 一切JS代码都是在微任务中执行的，JS代码都是一个微任务，只是哪些微任务构成了一个宏任务；执行在JS引擎里的就是微任务，执行在JS引擎之外的就是宏任务，循环宏任务的工作就是事件循环。


一个宏任务中，只存在一个微任务队列，一个宏任务里的同步代码也可以理解为微任务  只不过比宏任务里异步代码微任务先入队根据入队时间决定个微任务执行顺序吗，当前宏任务内微任务执行完之后才会执行下个宏任务。  

**微任务可以在实时性和效率之间做一个有效的权衡。** 基于微任务的技术有MutationObserver、Promise以及以Promise为基础开发出来的很多其他的技术。  
微任务就是一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前。

在现代浏览器里面，产生微任务有两种方式。  

第一种方式是使用MutationObserver监控某个DOM节点，然后再通过JavaScript来修改这个节点，或者为这个节点添加、删除部分子节点，当DOM节点发生变化时，就会产生DOM变化记录的微任务。  

第二种方式是使用Promise，当调用Promise.resolve()或者Promise.reject()的时候，也会产生微任务。  

**在当前宏任务中的JavaScript快执行完成时，也就在JavaScript引擎准备退出全局执行上下文并清空调用栈的时候，JavaScript引擎会检查全局执行上下文中的微任务队列，然后按照顺序执行队列中的微任务。WHATWG把执行微任务的时间点称为检查点。**  

## WebApi
setTimeout是直接将延迟任务添加到延迟队列中，而XMLHttpRequest发起请求，是由浏览器的其他进程或者线程去执行，然后再将执行结果利用IPC的方式通知渲染进程，之后渲染进程再将对应的消息添加到消息队列中。如果你搞懂了setTimeout和XMLHttpRequest的工作机制后，再来理解其他WebAPI就会轻松很多了

## Promise
Pomise已经帮助我们解决了这两个问题。那么接下来我们就来看看Promise是怎么消灭嵌套调用和合并多个任务的错误处理的。
产生嵌套函数的一个主要原因是在发起任务请求时会带上回调函数，这样当任务处理结束之后，下个任务就只能在回调函数中来处理了。
**首先，Promise实现了回调函数的延时绑定**，由于Promise采用了回调函数延迟绑定技术，所以在执行resolve函数的时候，回调函数还没有绑定，那么只能推迟回调函数的执行。
**其次，需要将回调函数onResolve的返回值穿透到最外层。**

思考题  
- Promise中为什么要引入微任务？  
- Promise中是如何实现回调函数返回值穿透的？  
- Promise出错后，是怎么通过“冒泡”传递给最后那个捕获异常的函数？  


## async/await

Promise的编程模型依然充斥着大量的then方法，虽然解决了回调地狱的问题，但是在语义方面依然存在缺陷，代码中充斥着大量的then函数，这就是async/await出现的原因。  

使用async/await可以实现用同步代码的风格来编写异步代码，这是因为async/await的基础技术使用了生成器和Promise，生成器是协程的实现，利用生成器能实现生成器函数的暂停和恢复。  

另外，V8引擎还为async/await做了大量的语法层面包装，所以了解隐藏在背后的代码有助于加深你对async/await的理解。