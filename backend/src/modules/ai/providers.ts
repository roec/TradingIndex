export interface AIAnalysisProvider {
  analyze(symbol: string, context: string): Promise<string>;
}

export class OpenAIProvider implements AIAnalysisProvider {
  async analyze(symbol: string): Promise<string> {
    // TODO: integrate OpenAI API.
    return `[OpenAI TODO] Analysis placeholder for ${symbol}`;
  }
}

export class DeepSeekProvider implements AIAnalysisProvider {
  async analyze(symbol: string): Promise<string> {
    // TODO: integrate DeepSeek API.
    return `[DeepSeek TODO] Analysis placeholder for ${symbol}`;
  }
}

export class MockAIProvider implements AIAnalysisProvider {
  async analyze(symbol: string): Promise<string> {
    return `Mock AI analysis: ${symbol} has neutral risk/reward under current synthetic market.`;
  }
}
