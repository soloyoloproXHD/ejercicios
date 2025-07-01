
// Primer Codigo Refactorizado
{
    const usuario = {
        nombre: "Pedro",
        apellido: "Sánchez",
        edad: 45,
        profesion: "Barro man"
    }

    function nombreUsuario({ nombre, apellido }) {
        return `Me llamo ${nombre} ${apellido}`;
    }

    console.log(nombreUsuario(usuario));
}
// Segundo Codigo Refactorizado

{
    const user = {
        name: "Pedro",
        last: "Sánchez",
        age: 45,
        salary: 1000,
        profesion: "Barro man",
    };

    function nombreUsuario({ name, last }) {
        return `${name} ${last}`;
    }

    function salarioUsuario({ salary }) {
        const salarioAnual = salary * 12;
        return salarioAnual;
    }

    let nombre = nombreUsuario(user);
    let salarioAnual = salarioUsuario(user);

    console.log(`Me llamo ${nombre} y cobro ${salarioAnual}€ al año.`);
}

// Tercer Codigo Refactorizado

{
    const user = {
        name: "Álvaro",
        last: "Morón",
        age: 30,
        nationality: "Morocco",
    };

    function esExtranjero({ nationality, age }) {
        const noEspañol = nationality !== "España";
        const cumpleEdad = age === 30; 
        
        if (noEspañol && cumpleEdad) {
            return "Apto para la ayuda del gobierno."
        }

        return "No apto para la ayuda del gobierno.";
    }

    console.log(esExtranjero(user));
}