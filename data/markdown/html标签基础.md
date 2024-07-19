## html

### 标签：结构化文档

首先我们想一下网站的最基本功能是什么（可以看一下 web 的历史），显示文章。文章内容由标题、段落、图片组成，将文章的这些不同部分，命名成**标签**，例如一级标题用`<h1>`表示，段落用 `<p>` 表示，`<text>`、`<img>`。不同的标签不一样的显示效果，不一样的功能。

### 标签的语义性

很多标签不仅样式不一样，也有语义、accessibility 方面的不同和功能。主要用于盲人、搜索引擎

### 标签语法规则

标签闭合，自闭标签，标签嵌套

```html
<h1></h1>
<img />
<div>
  <h1></h1>
</div>
```

### 标签 attribute

```html
<input type="text" />
```

### class、id

- [html 标签介绍demo](/pages/frontendExample/html-basic-tag.html)

- html 是做什么的？
  - 与浏览器打交道 
    - head 包裹的 meta 标签
    - 告诉浏览器自己的编码格式
    - view-port：
    - http-equiv：ua兼容、cookie、跨域
- 指定网页自身内容
  - 有什么内容：文字、图片、视频
  - 怎么指定这些内容？
    - div
    - 语义标签：标题(h1~h6)、段落(p)、header、footer、aside、nav、section、article
    - 功能控件标签：canvas、video、img、video
- 规范协议 html5
  - 所有<!DOCTYPE html>头的 .html 文件，浏览器都会使用 HTML5 标准来解析
  - H5 是什么？你用过哪些 HTML 5 标签？
    - 2008 出现，2012 稳定
    - header、footer、aside、nav、section、article
    - 对表单功能进行了增强，input 标签可以输入各种类型从而渲染相应的表单内容
    - 音频/视频是 HTML5 提供的关键 API，因为在 HTML5 之前，浏览器支持音视频方案都是通过 Flash 来实现的
    - canvas
    - 存储分为 LocalStorage 和 SessionStorage，不再只有 cookie
    - Web Worker 是运行在后台的 JavaScript
    - contenteditable='true'
    - HTML5拥有更有效的服务器推送技术，Server-SentEvent和WebSockets就是其中的两个特性，这两个特性能够帮助实现服务器将数据“推送”到客户端的功能。更有效的连接工作效率，可以实现基于页面的实时聊天，更快速的网页游戏体验，更优化的在线交流。
    - css3
  - html5 与小游戏
  - html5 与活动页