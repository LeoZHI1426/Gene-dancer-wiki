/**
 * 语法高亮（深色背景、注释绿、关键字蓝、字符串橙）
 * 用于 Python / Matlab 在技术页的展示
 */

// 深色背景配色（与原来代码块一致）
const PDF_THEME = {
  background: "#111827", // gray-900
  plain: "#e5e7eb",     // gray-200
  comment: "#6A9955",   // 注释绿
  keyword: "#569CD6",   // 关键字蓝
  string: "#CE9178",    // 字符串橙
  number: "#B5CEA8",    // 数字绿
  operator: "#e5e7eb",
};

const PYTHON_KEYWORDS = new Set([
  "def", "class", "if", "else", "elif", "for", "while", "return", "import", "from", "as",
  "and", "or", "not", "in", "is", "None", "True", "False", "with", "try", "except",
  "finally", "raise", "yield", "lambda", "pass", "break", "continue", "global", "assert",
]);

const MATLAB_KEYWORDS = new Set([
  "function", "end", "if", "else", "elseif", "for", "while", "return", "switch", "case",
  "otherwise", "try", "catch", "break", "continue", "global", "persistent", "true", "false",
]);

function tokenizePython(line) {
  const parts = [];
  let i = 0;
  const len = line.length;

  while (i < len) {
    // 注释 # 到行尾
    if (line[i] === "#") {
      parts.push({ type: "comment", text: line.slice(i) });
      i = len;
      continue;
    }
    // 双引号字符串
    if (line[i] === '"') {
      const start = i;
      i++;
      while (i < len && line[i] !== '"') {
        if (line[i] === "\\") i++;
        i++;
      }
      if (i < len) i++;
      parts.push({ type: "string", text: line.slice(start, i) });
      continue;
    }
    // 单引号字符串
    if (line[i] === "'") {
      const start = i;
      i++;
      while (i < len && line[i] !== "'") {
        if (line[i] === "\\") i++;
        i++;
      }
      if (i < len) i++;
      parts.push({ type: "string", text: line.slice(start, i) });
      continue;
    }
    // 三引号暂不处理，当作普通
    // 单词（关键字或普通）
    if (/[a-zA-Z_][a-zA-Z0-9_]*/.test(line[i])) {
      const m = line.slice(i).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
      const word = m[0];
      parts.push({
        type: PYTHON_KEYWORDS.has(word) ? "keyword" : "plain",
        text: word,
      });
      i += word.length;
      continue;
    }
    // 数字
    if (/[0-9.]/.test(line[i])) {
      const m = line.slice(i).match(/^[0-9.eE+-]+/);
      const num = m ? m[0] : line[i];
      parts.push({ type: "number", text: num });
      i += num.length;
      continue;
    }
    // 单字符
    parts.push({ type: "plain", text: line[i] });
    i++;
  }
  return parts;
}

function tokenizeMatlab(line) {
  const parts = [];
  let i = 0;
  const len = line.length;

  while (i < len) {
    // 注释 % 到行尾
    if (line[i] === "%") {
      parts.push({ type: "comment", text: line.slice(i) });
      i = len;
      continue;
    }
    // 单引号字符串（Matlab 用单引号）
    if (line[i] === "'") {
      const start = i;
      i++;
      while (i < len && line[i] !== "'") {
        if (line[i] === "\\") i++;
        i++;
      }
      if (i < len) i++;
      parts.push({ type: "string", text: line.slice(start, i) });
      continue;
    }
    // 双引号字符串（R2017+）
    if (line[i] === '"') {
      const start = i;
      i++;
      while (i < len && line[i] !== '"') {
        if (line[i] === "\\") i++;
        i++;
      }
      if (i < len) i++;
      parts.push({ type: "string", text: line.slice(start, i) });
      continue;
    }
    // 单词
    if (/[a-zA-Z_][a-zA-Z0-9_]*/.test(line[i])) {
      const m = line.slice(i).match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
      const word = m[0];
      parts.push({
        type: MATLAB_KEYWORDS.has(word) ? "keyword" : "plain",
        text: word,
      });
      i += word.length;
      continue;
    }
    // 数字
    if (/[0-9.]/.test(line[i])) {
      const m = line.slice(i).match(/^[0-9.eE+-]+/);
      const num = m ? m[0] : line[i];
      parts.push({ type: "number", text: num });
      i += num.length;
      continue;
    }
    parts.push({ type: "plain", text: line[i] });
    i++;
  }
  return parts;
}

function styleFor(type) {
  switch (type) {
    case "comment":
      return { color: PDF_THEME.comment };
    case "keyword":
      return { color: PDF_THEME.keyword };
    case "string":
      return { color: PDF_THEME.string };
    case "number":
      return { color: PDF_THEME.number };
    default:
      return { color: PDF_THEME.plain };
  }
}

/** 将代码按行高亮，返回 React 节点（需在组件内调用） */
export function highlightCode(code, language) {
  const lines = code.split("\n");
  const tokenize = language.toLowerCase() === "matlab" ? tokenizeMatlab : tokenizePython;

  return lines.map((line, lineIdx) => {
    const tokens = tokenize(line);
    return (
      <div key={lineIdx}>
        {tokens.map((t, i) => (
          <span key={i} style={styleFor(t.type)}>
            {t.text}
          </span>
        ))}
      </div>
    );
  });
}

export { PDF_THEME };
