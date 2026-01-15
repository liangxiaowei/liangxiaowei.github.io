> day3: 继续看《Grokking Simplicity》第 7 章。竟然在 b 站找到了上次提到的视频， 是 Rafal Dittwald 的 [Solving Problems the Clojure Way](https://b23.tv/kYbX27R)，有兴趣的可以看一下。针对 cljs 进入了一堆兔子洞，差点出不来。cljs 社区基本上都是 react 生态，有很多个 react wrapper，penpot 用的 rumext，logseq 用的 rum，nubank 用的 uix，与 uix 类似的有 helix，老牌的还有 reagent。还发现一些比较简单轻量的库，让你可以摆脱 cljs 复杂的工具链，例如 scittle 可以直接在浏览器实时解析 cljs 代码，还有 squint 使用的原生 js 数据，这俩都是同一个大神出品。 | 2026.01.15

> day2: 继续看《Grokking Simplicity》第 6 章。| 2026.01.14

> day1: 想把学习函数式编程重新捡起来，因为一来编码已经不重要了，这可能可以更好地当个 AI 指挥家？emmm，whatever，nobody care about the code quality. But I care. 就当作一个个人兴趣，了
> 却一桩心事吧（另一桩：smalltalk）。前几次试过 Clojure(script)、Elm、purescript、javascript，有一次是卡在了一本范畴论的书，有一次是看了几本 js 函数式的书，有一次是看完 Elm 作者的视频，想 all in Elm，但都没有坚持下来。这次想从 clojure(script) 入门，因为语法简单，目的实用，还有想体验 repl live coding。首先看的一本书是 eric normand 的《Grokking Simplicity》，他也同时教 clojure（买不起），这本书出乎意料的好懂，有人嫌太啰嗦，这倒无妨，可以看快点。书里是用 js 举例子，非常具体细节，一步步地教你怎么重构代码，逐步分离出无副作用的函数，因为无副作的函数是心智负担最少的，尽量减少带状态或者和外部系统打交道的函数。这让我想起上一次看过的一个视频，也是教你一步步把状态的改变限制在某几个函数里，但是在 youtube 搜了好几次都没搜出来。| 2026.01.13
