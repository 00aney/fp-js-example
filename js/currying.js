// _curry, _curryr
function _curry(fn) {
  return function(a, b) {
    return arguments.length === 2 ? fn(a, b) : function(b) { return fn(a, b); };
  }
}

function _curryr(fn) {
  return function(a, b) {
    return arguments.length == 2 ? fn(a, b) : function(b) { return fn(b, a); };
  }
}

let add = _curry((a, b) => {
  return a + b;
});

let add10 = add(10);
console.log( add10(5) );
console.log( add(5)(3) );

console.log( add(3, 5) );


let sub = _curryr((a,b) => {
  return a - b;
})

console.log( sub(10, 5) );

let sub10 = sub(10);
console.log( sub10(5) );


// _get
//function _get(obj, key) {
//  return obj === null ? undefined : obj[key];
//}

let _get = _curryr((obj, key) => {
  return obj === null ? undefined: obj[key];
});

let get_name = _get('name');
