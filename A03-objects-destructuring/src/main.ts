// ===== 1) サンプルデータ =====
type User = {
  id: string;
  name: string;
  age: number;
  address: {
    city: string;
    zip: string;
  };
};

const user: User = {
  id: 'u1',
  name: 'Takumi',
  age: 25,
  address: { city: 'Tokyo', zip: '100-0001' },
};

// 表示用
const rows = document.querySelector<HTMLTableSectionElement>('#rows');
if (!rows) throw new Error('#rows not found');

function addRow(label: string, value: unknown) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${label}</td>
    <td><code class="kbd">${escapeHtml(JSON.stringify(value))}</code></td>
  `;
  rows?.appendChild(tr);
}
function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]!));
}

// ===== 2) 参照（reference）を体験 =====
const ref = user; // 同じ参照を指す（コピーではない）
ref.name = 'Changed via ref';

addRow('original user after ref.name change', user);

// ===== 3) 浅いコピー（shallow copy）を体験 =====
const shallow = { ...user }; // top-level はコピーされる（しかしネストは参照のまま）
shallow.name = 'Shallow name changed';
shallow.address.city = 'Osaka (changed via shallow)';

addRow('user after shallow.name change', user);
addRow('user after shallow.address.city change', user);

// ===== 4) 深いコピー（deep copy）を体験 =====
// 学習用として JSON で deep copy（制限あり：Date/関数/undefined 等が壊れる）
const deep: User = structuredClone
  ? structuredClone(user)
  : (JSON.parse(JSON.stringify(user)) as User);

deep.name = 'Deep name changed';
deep.address.city = 'Fukuoka (deep)';

addRow('user after deep changes', user);
addRow('deep copy snapshot', deep);

// ===== 5) 分割代入（destructuring） =====
const {
  id,
  name,
  address: { city },
} = user;

addRow('destructuring: {id, name, address.city}', { id, name, city });

// ===== 6) keyof と Pick（入口） =====
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const out = {} as Pick<T, K>;
  for (const k of keys) {
    out[k] = obj[k];
  }
  return out;
}

const publicUser = pick(user, ['id', 'name']);
addRow('pick(user, ["id","name"])', publicUser);

// NG例（わざと型エラーを体験したい場合）
// const bad = pick(user, ['id', 'unknownKey']); // ← unknownKey は keyof User にないのでエラー

// ===== 7) 参照とコピーのまとめ情報 =====
addRow('note', {
  reference: 'ref === user は true',
  shallow: 'shallow.address === user.address は true（ネストは参照共有）',
  deep: 'deep.address === user.address は false（ネストまで分離）',
});

addRow('comparisons', {
  refEquals: ref === user,
  shallowAddrEquals: shallow.address === user.address,
  deepAddrEquals: deep.address === user.address,
});
