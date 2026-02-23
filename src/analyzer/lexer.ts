export enum TokenType {
  Keyword,
  Identifier,
  Literal,
  Operator,
  Punctuation,
  Comment
}

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  column: number;
}

const KEYWORDS = [
  'contract', 'circuit', 'fn', 'pub', 'private', 'state',
  'const', 'let', 'require', 'for', 'while', 'if', 'else',
  'return', 'this', 'import', 'include'
];

export function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  const lines = source.split('\n');

  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    const line = lines[lineNum];
    const words = line.split(/(\s+|[{}()\[\];:,.])/);

    let column = 0;
    for (const word of words) {
      if (word.trim()) {
        const type = KEYWORDS.includes(word)
          ? TokenType.Keyword
          : TokenType.Identifier;

        tokens.push({
          type,
          value: word,
          line: lineNum + 1,
          column
        });
      }
      column += word.length;
    }
  }

  return tokens;
}
