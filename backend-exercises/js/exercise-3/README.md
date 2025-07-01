# Ejercicio 3, Acierta los console.log

¿Qué salida tendrán los siguientes `console.log`?

```js
// Comparaciones con booleanos
console.log(false + false); // 0
console.log(false + true); // 1
console.log(true + true); // 2

// Comparaciones con arrays
console.log([] === []); // false
console.log([] + []); // 
console.log([1, 2] + [3, 4]); // [1,23,4]
console.log([1] + 1); // 11
console.log([1] - 1); // 0

// Comparaciones con objetos
console.log({} + {}); // [Object][Object]
console.log({} === {}); // false
console.log([] === {}); // false

// Comparaciones especiales
console.log(null + 1); // 1
console.log(undefined + 1); // NaN
console.log(null == 0); // false
console.log(null <= 0); // true
console.log(undefined == null); //true

// Operaciones con NaN
console.log(NaN + 1); // NaN
console.log(NaN == NaN); // false
console.log(NaN === NaN); // false
```
