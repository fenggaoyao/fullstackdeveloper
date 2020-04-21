
# 编程语言通识与词法类型   [首页](../../README.md)
 
## 1、[编程语言通识](Language.md)

- 语言分类：
  * 0型（无限制文法） ::= "c"
  * 1型（上下文有关） "a""c"::="a""x""c"
  * 2型（上下文无关）
  * 3型（正则文法）
- 产生式（BNF） ::=  numer  () * + | 非终结符 
- 图灵完备性
- 类型系统


### 2、Atom 词

| Grammer | Runtime |
| --- | --- | 
|   Whitespace  | Types   |
|   Comment  |  Excecution Context     |
|   Line Termiator  |     |
|     Punctuator    |     |
|    IdentifierName   |     |
|   Keywords   |     |
|   Literal     |     |



#### InputElement

- whiteSpace

  可查阅 unicode [space列表](https://www.fileformat.info/info/unicode/category/Zs/list.htm)

  - Tab：制表符（打字机时代：制表时隔开数字很方便）
  - VT：纵向制表符
  - FF: FormFeed
  - SP: Space （推荐）
  - NBSP: NO-BREAK SPACE（和 SP 的区别在于不会断开、不会合并）
  - ...


- LineTerminator 换行符

  - LF: Line Feed `\n`
  - CR: Carriage Return `\r`
  - ...

- Comment 注释

- Token 记号：一切有效的东西

  - Punctuator: 符号 用于构成代码结构 比如 `> = < }`
  - Keywords：比如 `await`、`break`... 不能用作变量名，但像 getter 里的 `get`就是个例外
    - Future reserved Keywords: `eum`
  - IdentifierName：标识符，可以以字母、_ 或者 $ 开头，代码中用来标识**[变量](https://developer.mozilla.org/en-US/docs/Glossary/variable)、[函数](https://developer.mozilla.org/en-US/docs/Glossary/function)、或[属性](https://developer.mozilla.org/en-US/docs/Glossary/property)**的字符序列
    - 变量名：不能用 Keywords
    - 属性：可以用 Keywords
  - Literal: 直接量
      * NumericLiteral
      * StringLiteral
      * Template `` 

  * Type
    - Number  ***参考匹配[正则表达式](number.js),[测试用例](number.test.js) ***
      - DecimalLiteral
        - 0
        - 0.
        - .2
        - 1e3
      - BinaryIntegerLiteral
        - 0b111
      - OctalIntergerLiteral
        - 0o10
      - HexIntergerLiteral
        - 0xFF

    - 存储 Uint8Array、Float64Array
     
    - 实践
      - 关于浮点数表示[计算例子](Decial.md)
      - Number.MAX_SAFE_INTEGER.toString(16) "1fffffffffffff"
      - 比较浮点是否相等：Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON
      - 如何快捷查看一个数字的二进制：(97).toString(2)
      - Sign(1)  Exponent(11)  Fraction(52)
      

    - String *** 参考匹配[正则表达式](string.js),[测试用例](string.test.js) ***
      - Character 字符
      - Code Point 码点
      - Encoding  
        - unicode编码 - utf
          - utf-8 可变长度 （控制位的用处）
      - Grammar
        - `''`、`""`、``` `
    - Boolean
    - Null
    - Undefind

## Unicode
 - [UniCode知识及UTF转码](UniCode.md)

小作业

- 写一个正则 匹配所有Number直接量
- 写一个正则表达式来匹配字符串


- 讲师提供：
    - <https://home.unicode.org/>
    - <https://www.fileformat.info/info/unicode/>
  - 学员提供：
    - 计算浮点数的一个工具：[ https://github.com/camsong/blog/issues/9](https://github.com/camsong/blog/issues/9)
  - 有助于你理解的知识：
    - 正则表达式：[ https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)
    - 揭秘 0.1 + 0.2 != 0.3 <https://www.barretlee.com/blog/2016/09/28/ieee754-operation-in-js/>
    - ASCII，Unicode 和 UTF-8 ：[ http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)

  ## 参考名词：

  - [字符集](https://zh.wikipedia.org/zh/%E5%AD%97%E7%AC%A6%E7%BC%96%E7%A0%81)：字符编码（英语：Character encoding）、字集码是把字符集中的字符编码为指定集合中某一对象（例如：比特模式、自然数序列、8 位组或者电脉冲），以便文本在计算机中存储和通过通信网络的传递。常见的例子包括将拉丁字母表编码成摩斯电码和 ASCII。其中，ASCII 将字母、数字和其它符号编号，并用 7 比特的二进制来表示这个整数。通常会额外使用一个扩充的比特，以便于以 1 个字节的方式存储。在计算机技术发展的早期，如 ASCII（1963 年）和 EBCDIC（1964 年）这样的字符集逐渐成为标准。但这些字符集的局限很快就变得明显，于是人们开发了许多方法来扩展它们。对于支持包括东亚 CJK 字符家族在内的写作系统的要求能支持更大量的字符，并且需要一种系统而不是临时的方法实现这些字符的编码。
  - [Unicode ](https://zh.wikipedia.org/zh-hans/Unicode)：中文：万国码、国际码、统一码、单一码。是计算机科学领域里的一项业界标准。它对世界上大部分的文字系统进行了整理、编码，使得电脑可以用更为简单的方式来呈现和处理文字。
  - [ASCII ](https://zh.wikipedia.org/wiki/ASCII)：（American Standard Code for Information Interchange，美国信息交换标准代码）是基于拉丁字母的一套电脑编码系统。它主要用于显示现代英语，而其扩展版本延伸美国标准信息交换码则可以部分支持其他西欧语言，并等同于国际标准 ISO/IEC 646。美国信息交换标准代码是这套编码系统的传统命名，互联网号码分配局现在更倾向于使用它的新名字 US-ASCII[2]。美国信息交换标准代码是美国电气和电子工程师协会里程碑之一。
  - Token：记号、标记。JS 里有效的输入元素都可以叫 Token。
  - [NBSP ](https://zh.wikipedia.org/wiki/%E4%B8%8D%E6%8D%A2%E8%A1%8C%E7%A9%BA%E6%A0%BC)：不换行空格（英语：no-break space，NBSP）是空格字符，用途是禁止自动换行。HTML 页面显示时会自动合并多个连续的空白字符（whitespace character），但该字符是禁止合并的，因此该字符也称作“硬空格”（hard space、fixed space）。Unicode 码点为：U+00A0 no-break space。
  - [零宽空格](https://zh.wikipedia.org/zh-hans/%E9%9B%B6%E5%AE%BD%E7%A9%BA%E6%A0%BC)：（zero-width space, ZWSP）是一种不可打印的 Unicode 字符，用于可能需要换行处。在 HTML 页面中，零宽空格可以替代。但是在一些网页浏览器（例如 Internet Explorer 的版本 6 或以下）不支持零宽空格的功能。