# circle-ball.github.io
circle-ball的主页

## task 16
* use the template string in ES6
* delegate event listener
* the regex application
* dom operation: removeChild parentNode
* careful: the table tag will appendChild the tbody tag even if you don't write the tbody tag in your code.But I should test it in the other browsers.

## task 17
* the dom about select, we can use the `selectbox.options[selectbox.selectedIndex].value` to get the selected value 
* string to Date
* get the day of week
* 对象所有可枚举的实例属性,返回一个数组 Object.keys(obj)

## task 18
* 如果在 HTML 表单中使用 button 元素，不同的浏览器会提交不同的按钮值。请使用 input 元素在 HTML 表单中创建按钮。
* insertBefore appendChild 
* removeChild
* childNodes
* classList.add classList.remove
* 外面的函数声明了一个变量a，里面的函数想要复用变量a，不能用var a = a，因为这两个都表示里面函数的布局变量，等号后面的a不是外面函数的变量，js函数有提前声明的原则

## task19
* 怎样展现动画效果，尝试了好几种办法，就不得行，目测由于浏览器考虑性能的原因，只重绘最后一次，不停地设置style.height，就最后一次生效
* 中间模拟一个sleep，也不会马上重绘
* setTimeout，间隔时间每执行一次就加一次，然后利用闭包特性暂存当时的高度，如果不暂存则取到的是最后的值
* todo
    * 优化代码
    * 多种排序方式
    * 查找有关浏览器渲染，重排，重绘的问题
    
## task20

## task21
* chilidNodes 可能包含注释节点
* splice 删除数组指定项并且可插入项
* 还缺第一次输入超过十个的时候的处理