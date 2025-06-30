class ValidateData extends Error {
  constructor(message) {
    super(message);
    this.name("ValidateData");
  }
}

async function getData() {
  console.log("Start service");
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
    if (!response.ok) {
      throw new ValidateData(
        `Error: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    console.log(data);
    console.log("End service");
  } catch (e) {
    if (e instanceof ValidateData) {
      // Envio de información al log
    }
  }
}

getData();
