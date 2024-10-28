import fs from "fs"; 
import path from "path"; 

export class ProdManager {
    #path = "";
    
    constructor(rutaArchivo = "") {
        this.#path = path.resolve(process.cwd(), rutaArchivo);
    }
    
    setPath(nuevaRuta) {
        this.#path = path.resolve(process.cwd(), nuevaRuta);
        console.log(`Ruta configurada a: ${this.#path}`);
    }
    
    async getProductos() {
        if (fs.existsSync(this.#path)) {
            console.log(`Leyendo archivo desde: ${this.#path}`);
            const data = await fs.promises.readFile(this.#path, { encoding: "utf-8" });
            const productos = JSON.parse(data);
            console.log(`Productos leídos: ${JSON.stringify(productos)}`);
            return productos;
        } else {
            console.error(`El archivo no existe en la ruta: ${this.#path}`);
            return [];
        }
    }
    
    async #grabaArchivo(data = "") {
        if (typeof data !== "string") {
            throw new Error("Error: el parámetro debe ser un string");
        }
        await fs.promises.writeFile(this.#path, data);
    }
    
    async addProductos(productos = {}) {
        let producto = await this.getProductos();
        let id = 1;
        if (producto.length > 0) {
            id = Math.max(...producto.map(d => d.id)) + 1;
        }
        let NuevoProducto = {
            id,
            ...productos
        };
        producto.push(NuevoProducto); 
        await this.#grabaArchivo(JSON.stringify(producto, null, 5));
        return NuevoProducto;
    }
}
