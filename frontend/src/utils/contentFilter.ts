export class ContentFilter {
  private static sensitiveWords: Set<string> = new Set([
    // 从配置加载敏感词
  ]);

  static filter(content: string): string {
    // 实现敏感词过滤
    return content;
  }
} 