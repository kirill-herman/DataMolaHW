function add(...args) {
  if (args.length === 2) {
    return args[0] + args[1];
  }
  if (args.length === 1) {
    return (arg) => arg + args[0];
  }
  return 'не можна';
}

// const a = add(1, 2);
// console.log(a);
// const inc = add(1);
// const b = inc(5);
// console.log(b);
// const c = add(add(1, 1))(6);
// console.log(c);

function sub(...args) {
  if (args.length === 2) {
    return args[0] - args[1];
  }
  if (args.length === 1) {
    return (arg) => arg - args[0];
  }
  return 'не можна';
}

function mul(...args) {
  if (args.length === 2) {
    return args[0] * args[1];
  }
  if (args.length === 1) {
    return (arg) => arg * args[0];
  }
  return 'не можна';
}

// eslint-disable-next-line no-unused-vars
function div(...args) {
  if (args.length === 2) {
    return args[0] / args[1];
  }
  if (args.length === 1) {
    return (arg) => arg / args[0];
  }
  return 'не можна';
}

const a = add(1, 2); // 3

const b = mul(a, 10); // 30

const sub1 = sub(1); // sub1 отнимает от любого числа единицу
const c = sub1(b); // 29

const d = mul(sub(a, 1))(c); // 58

console.log(a, b, c, d);

function pipe(...args) {
  return (arg) => args.reduce((accumulator, currentValue) => currentValue(accumulator), arg);
}

const doSmth = pipe(add(d), sub(c), mul(b), div(a));
const result = doSmth(0);
const x = pipe(add(1), mul(2))(3);

console.log(result, x);
