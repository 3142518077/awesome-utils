# Awesome Utils

一个实用的JavaScript工具库集合，包含各种常用的工具函数和模块。

## 项目目录

```
awesome-utils/
├── src/                 # 源代码目录
│   ├── network/         # 网络相关工具
│   │   └── url_parser.js # URL解析器
│   └── ...              # 其他工具模块
├── examples/            # 使用示例
│   └── url-parser-example.js
└── README.md            # 项目文档
```

## URL解析器使用说明

### 直接使用

无需安装，直接引入文件即可使用：

```javascript
// 浏览器环境
<script src="path/to/url_parser.js"></script>
<script>
  console.log(URLParser.parse(window.location.href));
</script>

// Node.js环境
const URLParser = require('./src/network/url_parser');

```javascript
const URLParser = require('awesome-utils/src/network/url_parser');

// 解析URL
const parsed = URLParser.parse("https://example.com/path?q=test#section");
console.log(parsed);

// 规范化URL
const canonicalized = URLParser.canonicalize("https://example.com///path//");
console.log(canonicalized); // "https://example.com/path/"
```

### 示例代码

参考 [examples/url-parser-example.js](./examples/url-parser-example.js)

## 开源协议

MIT License

Copyright (c) 2025 superye

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 贡献指南

1. Fork本项目
2. 创建特性分支 (`git checkout -b feature/your-feature`)
3. 提交修改 (`git commit -am 'Add some feature'`)
4. 推送分支 (`git push origin feature/your-feature`)
5. 创建Pull Request

## 运行测试

```bash
# 直接运行示例测试
node examples/url-parser-example.js
```

## 联系方式

邮箱: superylc123@gmail.com
