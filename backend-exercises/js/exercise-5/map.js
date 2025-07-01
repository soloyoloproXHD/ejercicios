const myMap = new Map();

const user = {
    name: 'Mauricio',
    age: 30,
}

const user2 = {
    name: 'Elliot',
    age: 25,
}

function findAnimal() {
    return 'perro';
}

myMap.set('moroso', user);
myMap.set('agarrado', user);
myMap.set('generoso', user2);
myMap.set('function', findAnimal());
myMap.set('color', 'rojo');

console.log(myMap);
console.log(myMap.get('moroso'));
console.log(myMap.has('hola'));
console.log(myMap.size);

myMap.forEach((value, key) => {
    console.log(`${key}: ${value}`);
});

console.log(myMap.delete('agarrado'));
console.log(myMap.clear());