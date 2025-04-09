/**
 * URL解析器使用示例
 * 演示如何解析和规范化URL
 */

// 引入URL解析器
const URLParser = require('../src/network/url_parser');

// 示例1: 基本URL解析
const url1 = "https://example.com:8080/path/to/page?q=test#section";
console.log('解析示例1:', URLParser.parse(url1));
console.log('规范化结果:', URLParser.canonicalize(url1));

// 示例2: 带认证信息的URL
const url2 = "user:pass@sub.domain.com/path";
console.log('\n解析示例2:', URLParser.parse(url2));

// 示例3: 相对路径处理
const url3 = "example.com/path/../to";
console.log('\n解析示例3:', URLParser.parse(url3));

// 示例4: 边缘案例测试
const url4 = "https://example.com///path//";
console.log('\n解析示例4:', URLParser.parse(url4));
console.log('规范化结果:', URLParser.canonicalize(url4));

// 示例5: 国际化域名
const url5 = "https://例子.测试/path";
console.log('\n解析示例5:', URLParser.parse(url5));
