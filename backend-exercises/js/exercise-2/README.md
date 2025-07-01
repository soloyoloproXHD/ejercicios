# Ejercicio 2, Hoisting

Que devuelve por consola cada uno de los siguientes `console.log`

---

```js
console.log(a);
var a = "hola"; // undefined
```

---

```js
console.log(b);
let b = "hola"; // ReferenceError
```

---

```js
console.log(c);
const c = "hola"; // ReferenceError
```

---

```js
sayHi(); // Hola desde sayHi!

function sayHi() {
  console.log("Hola desde sayHi!");
}
```

---

```js
function sayBye() {
  console.log("Adios desde sayBye!");
}

sayBye(); // Adios desde sayBye!
```
