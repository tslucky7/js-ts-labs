import '../../style.css';
import '../../styles.css';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('#app not found');

// ===== 1) スコープ =====
const globalValue = 'GLOBAL';

function scopeTest() {
  const localValue = 'LOCAL';
  return `${globalValue} / ${localValue}`;
}

app.innerHTML += `<span class="badge">scopeTest(): ${scopeTest()}</span>`;

// localValue はここでは見えない
console.log(globalValue);
// console.log(localValue); // ❌ エラー

// ===== 2) 関数が変数を「覚える」 =====
function createCounter() {
  let count = 0; // ← この変数が「閉じ込められる」

  return function () {
    count++;
    return count;
  };
}

const counterA = createCounter();
const counterB = createCounter();

app.innerHTML += `
  <span class="badge">counterA(): ${counterA()}</span>
  <span class="badge">counterA(): ${counterA()}</span>
  <span class="badge">counterB(): ${counterB()}</span>
`;

// ===== 3) なぜ状態が保持されるのか =====
// createCounter の実行は終わっているが、
// 内側の関数が count を参照しているため GC されない

// ===== 4) クロージャの実用例①：設定の固定 =====
function createLogger(prefix: string) {
  return (message: string) => {
    return `[${prefix}] ${message}`;
  };
}

const infoLogger = createLogger('INFO');
const errorLogger = createLogger('ERROR');

app.innerHTML += `
  <span class="badge">${infoLogger('loaded')}</span>
  <span class="badge">${errorLogger('something failed')}</span>
`;

// ===== 5) クロージャの実用例②：外部から隠蔽 =====
function createSecret() {
  const secret = 'top-secret';

  return {
    reveal() {
      return secret;
    },
    change(newSecret: string) {
      // secret はこの関数群からしか触れない
      // 外部からは直接アクセス不可
      return `changed to ${newSecret}`;
    },
  };
}

const secretBox = createSecret();
app.innerHTML += `<span class="badge">secret: ${secretBox.reveal()}</span>`;

// console.log(secret); // ❌ 見えない
