- javascript 里对象就是一个无序集合，属性名和对应的 value，value 可以是基本对象、引用对象、函数。
- 如何复用代码？
- 需不需要，以及如何抽象到不同 class？
- 原型链 和 this 是一家的，假如不用 this、new、prototype：this 允许使用对象直接调用函数，否则对象需要作为函数的参数，或者对象属性作为闭包
- constructor 属性是否需要保留？

- 创建对象 new 机制：new + 普通函数。普通函数里接收参数，编写 this.xxx = xxx。当用 new 调用函数，函数开始前会自动创建一个对象，然后复制给函数里的 this，执行函数，默认返回这个函数。new 出来的对象，有一个内部属性 __proto__ 指向函数对象的 prototype 对象。
- 函数对象的 prototype 对象：声明函数后，函数对象自动有个 prototype 对象，prototype 对象有个 constructor 属性指回函数对象 ，可以在这个 prototype 对象挂载属性、方法。如果对prototype 对象整个进行重写，注意 constructor 属性。
- 原形链机制：访问一个对象的属性，先从当前对象开始查找，如果没有，则从内部属性 __proto__ 指向的对象查找，一直往上找。
- 问题：对象类型的识别。相关：`person1 instanceof Person`、`person1.constructor == Person`、`Person.prototype.isPrototyeof(person1)`
- 问题：属性、方法的重用、封装。共用方法挂载到函数对象的 prototype 对象
- 问题：属性是在当前对象上还是原型链上。`person1.hasOwnProperty(name)`，`'name' in person1`
- 问题：Object.extend 与 Object.prototype.extend 区别
- 原型与继承：使用原型链实现继承，sub.prototype = Object.extend(new parent(), {})；如果 parent 函数需要初始化函数就会遇到问题；例如在 prototype.js_1.2.1 中 Ajax.Updater 直接继承了 Ajax.Base: `Ajax.Updater.prototype = (new Ajax.Base()).extend({})`，在 prototype.js_1.3.0 至 prototype.js_1.5.0 中 Ajax.Updater 继承 Ajax.Request，Ajax.Request 继承 Ajax.Base，由于 Ajax.Request 的初始化函数需要参数，所以不能 `new Ajax.Request()`，只能用 `Object.extend(Object.extend(Ajax.Updater.prototype, Ajax.Request.prototype), {})`，但是这样就把原型链破坏了，Ajax.Updater 的原型与 Ajax.Request 无关了。在 prototype.js_1.6.0 中，对象继承的实现就发生了变化，使用了 Alex Arnell 的实现，[Updated OO Library](https://typicalnoise.com/post/updated-oo-library)，这时候原型链就是对的。



- 《JavaScript 权威指南》第6章 对象；第9章 类
- 《JavaScript 忍者秘籍》第7章 面向对象与原型
- 《JavaScript 王者归来》第7章 对象；第21章 面向对象
- 《你所不知道的 JavaScript》上 第二部分 this与原型
- 《现代 JavaScript 教程》4 Object 基础知识；8 原型、继承；9 类
- 《javascript 悟道》8 对象；16 this；17 非类实例对象；
- 阅读《JavaScript 高级程序设计》，关于对象的章节；第8章 对象、类与面向对象编程
    - 2005 第一版(中文 2006)，
    - 2009 第二版(中文 2010)，第二版这块写的比较详细，介绍了好几种对象创建的方法，画了原型链的图。
    - 2012 第三版，第三版增加了对象属性的几种属性
    - 2020 第四版，第四版增加 es2015 的新语法
- 阅读 `prototypejs` 框架源码
- 2002 [Classical Inheritance in JavaScript](https://www.crockford.com/javascript/inheritance.html)
- 2006 [Prototypal Inheritance in JavaScript](https://www.crockford.com/javascript/prototypal.html)
- 2009 [Inheritance Patterns in JavaScript](http://bolinfest.com/javascript/inheritance.php)
- 2008 [Simple JavaScript Inheritance](https://johnresig.com/blog/simple-javascript-inheritance/)
- [Using Prototypical Objects to Implement Shared Behavior in Object Oriented Systems](https://web.media.mit.edu/~lieber/Lieberary/OOP/Delegation/Delegation.html)
- [Object-Oriented javascript](https://unidel.edu.ng/focelibrary/books/Object-Oriented%20JavaScript%202nd%20Ed.pdf)
- 2018 Eric Elliott [The Forgotten History of OOP](https://medium.com/javascript-scene/the-forgotten-history-of-oop-88d71b9b2d9f)