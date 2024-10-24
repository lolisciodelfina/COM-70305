    import fs from "fs"; 
    import path from "path"; 

    export class ProdManager {
        #path = "";

        constructor(rutaArchivo = "") {
            this.#path = path.resolve(process.cwd(), rutaArchivo);
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
    }