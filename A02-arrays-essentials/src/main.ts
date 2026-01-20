// ===== 元データ =====
const numbers: number[] = [1, 2, 3, 4, 5];

// rows 出力用
const rows = document.querySelector<HTMLTableSectionElement>('#rows');
if (!rows) {
  throw new Error('#rows not found');
}

// ===== map =====
// 要素を「変換」する
const doubled = numbers.map((n) => n * 2);

// ===== filter =====
// 条件に合う要素だけ残す
const evens = numbers.filter((n) => n % 2 === 0);

// ===== reduce =====
// 配列を 1 つの値にまとめる
const sum = numbers.reduce((acc, cur) => acc + cur, 0);

// ===== 非破壊で要素を追加 =====
const added = [...numbers, 6];

// ===== 表示 =====
type Row = {
  label: string;
  value: unknown;
};

const data: Row[] = [
  { label: 'original', value: numbers },
  { label: 'map (x2)', value: doubled },
  { label: 'filter (even)', value: evens },
  { label: 'reduce (sum)', value: sum },
  { label: 'add (non-mutation)', value: added },
];

rows.innerHTML = data
  .map(
    (d) => `
      <tr>
        <td>${d.label}</td>
        <td><code class="kbd">${JSON.stringify(d.value)}</code></td>
      </tr>
    `
  )
  .join('');


// ===== ジェネリクスを使用した関数 =====
function firstSafe<T>(arr: T[]): T | undefined {
  return arr[0];
}

const n = firstSafe(numbers); // number | undefined
console.log(n);

