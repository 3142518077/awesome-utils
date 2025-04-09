/**
 * 浏览器URL解析器实现 (参考Chromium源码)
 * 模拟blink::KURL和third_party/url的实现逻辑
 */
/**
 * RFC 3986标准URL解析器
 * 支持CommonJS和ES Module两种导出方式
 */
class URLParser {
  /**
   * 解析URL各组件 (类似URL::Parse函数)
   * @param {string} url 
   * @returns {{
   *   protocol: string,
   *   host: string,
   *   port: number,
   *   path: string,
   *   query: string,
   *   fragment: string
   * }}
   */
  static parse(url) {
    // 1. 协议处理 (参考URL::ParseStandardURL)
    let protocol = 'http:';
    let rest = url;
    
    // 检测协议前缀 (参考url_parse::ExtractScheme)
    const protocolEnd = url.indexOf('://');
    if (protocolEnd > 0) {
      protocol = url.substring(0, protocolEnd + 1).toLowerCase();
      rest = url.substring(protocolEnd + 3);
    }

    // 2. 解析主机和端口 (参考url_parse::ParseAuthority)
    let host = '';
    let port = protocol.startsWith('https') ? 443 : 80;
    
    // 正确分离authority和path部分
    const authorityEnd = rest.indexOf('/');
    const authority = authorityEnd === -1 ? rest : rest.substring(0, authorityEnd);
    const pathAndQuery = authorityEnd === -1 ? '/' : rest.substring(authorityEnd);
    
    if (authority.includes('@')) {
      // 处理认证信息 (如user:pass@host)
      host = authority.split('@')[1];
    } else {
      host = authority;
    }

    // 提取端口号 (参考url_parse::ParsePort)
    if (host.includes(':')) {
      const parts = host.split(':');
      host = parts[0];
      port = parseInt(parts[1]) || port;
    }

    // 3. 路径和查询解析 (参考url_parse::ParsePath)
    // 先分离片段(#frag)
    const [pathQueryStr, fragment] = pathAndQuery.split('#', 2);
    // 再分离查询参数(?query)
    const [path, query] = pathQueryStr.split('?', 2);

    // 根据RFC 3986规范返回完整URL组件
    return {
      scheme: protocol.replace(':', ''),  // RFC规范中的scheme不带冒号
      authority: `${host}${port !== (protocol.startsWith('https') ? 443 : 80) ? ':' + port : ''}`,
      userinfo: authority.includes('@') ? authority.split('@')[0] : '',
      host: host,
      port: port,
      path: path || '/',
      query: query || '',  // 空字符串表示无query
      fragment: fragment || ''  // 空字符串表示无fragment
    };
  }

  /**
   * URL规范化 (参考url_util::Canonicalize)
   * @param {string} url 
   * @returns {string}
   */
  static canonicalize(url) {
    const parsed = this.parse(url);
    
    // 主机名小写化 (参考NetUtil::CanonicalizeHost)
    const host = parsed.host.toLowerCase();
    
    // 路径标准化 (参考url_canon::CanonicalizePath)
    const path = parsed.path.replace(/\/+/g, '/');
    
    // 重建URL (遵循RFC 3986规范)
    let result = `${parsed.scheme}://`;
    if (parsed.userinfo) result += `${parsed.userinfo}@`;
    result += host;
    if ((parsed.scheme === 'http' && parsed.port !== 80) || 
        (parsed.scheme === 'https' && parsed.port !== 443)) {
      result += `:${parsed.port}`;
    }
    result += path;
    if (parsed.query) result += `?${parsed.query}`;
    if (parsed.fragment) result += `#${parsed.fragment}`;
    
    return result;
  }
}

// 模块导出
if (typeof module !== 'undefined' && module.exports) {
  // CommonJS导出
  module.exports = URLParser;
} else if (typeof define === 'function' && define.amd) {
  // AMD导出
  define([], () => URLParser);
} else {
  // 全局导出
  window.URLParser = URLParser;
}
