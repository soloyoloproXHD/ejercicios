type Animal = {
    name: string;
    canEat: boolean;
    canDrink: boolean;
    canSleep: boolean;
    canFly: boolean;
}

type Dog = Animal & {
    race: "Husky" | "Labrador" | "Chucho";
    age: number;
}

const bird: Animal = {
    name: "Periquito",
    canEat: true,
    canDrink: true,
    canSleep: true,
    canFly: true
}

const dog: Dog = {
    name: "Pelucha",
    canEat: true,
    canDrink: true,
    canSleep: true,
    canFly: false,
    race: "Labrador",
    age: 7
}

const cat: Pick<Animal, "name" | "canSleep"> & {color: string}= {
    name: "Gatito",
    canSleep: true,
    color: "Black"
}

const snake: Omit<Animal, "name" | "canFly"> = {
    canEat: true,
    canDrink: true,
    canSleep: true
}
