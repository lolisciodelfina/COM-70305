const fs = require ("fs")
let ruta = "products.json"
let product = [
    {id: 1,
        nombre: "Café negro",
        category:"Coffee",
        precio: 2200
    },

    {id: 2,
        nombre: "Cortado",
        category:"Coffee",
        precio: 2300
    },

    {id: 3,
        nombre: "Café con leche",
        category:"Coffee",
        precio: 2500
    },

    {id: 4,
        nombre: "Medialuna",
        category:"Acompañamientos",
        precio: 1400
    },





];
fs.writeFileSync(ruta,JSON.stringify(product,null,4))