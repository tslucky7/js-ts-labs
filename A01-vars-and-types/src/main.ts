import '../../style.css';
import '../../styles.css';

// ===== 変数と型 =====

// 明示的な型注釈
const a: number = 2;
const b: number = 3;

// 型推論（TypeScriptが自動で number と判断）
const c = 10;


// 文字列
const message: string = 'Hello TypeScript';

// 真偽値
const isActive: boolean = true;

// ===== 関数 =====

// 戻り値の型を明示
export function sum(x: number, y: number): number {
  return x + y;
}

// boolean を返す関数
export function isEven(n: number): boolean {
  return n % 2 === 0;
}

// JavaScriptの挙動も確認する関数
export function toSlug(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

// ===== DOM 出力 =====

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) {
  throw new Error('#app not found');
}

const dangerous: any = '123';
dangerous.toFixed(); // 実行時に落ちる


app.innerHTML = `
  <span class="badge">a + b = ${sum(a, b)}</span>
  <span class="badge">c = ${c}</span>
  <span class="badge">isEven(4) = ${isEven(4)}</span>
  <span class="badge">isEven(5) = ${isEven(5)}</span>
  <span class="badge">toSlug("Hello World!") = ${toSlug('Hello World!')}</span>
`;
