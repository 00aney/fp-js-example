const log = console.log;

const curry = f =>
    (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
});

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

///////////////////////////////////////////////////////////

// range

var add = (a, b) => a + b;
const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};
var list = range(4);
log(list);
log(reduce(add, list));


// lazy range

const L = {};
L.range = function *(l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};
var list = L.range(4);
log(list);
log(reduce(add, list));


function test(name, time, f) {
  console.time(name);
  while (time--) f();
  console.timeEnd(name);
}
// test('range', 10, () => reduce(add, range(1000000)));
// test('L.range', 10, () => reduce(add, L.range(1000000)));
console.clear();
  

// take

const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length == l) return res;
  }
  return res;
});
console.time('');
go(
  range(10000),
  take(5),
  reduce(add),
  log);
console.timeEnd('');
console.time('');
go(
  L.range(10000),
  take(5),
  reduce(add),
  log);
console.timeEnd('');
