// Import built-in Node.js modules
const fs = require("fs");           // 'fs' lets read/write files (file system)
const path = require("path");       // 'path' helps build safe file paths

export default class BasketModel{

    async getBasket() {
        const db = JSON.parse(fs.readFileSync("../DB/"))
        return db[""]
    }
}

console.log(new BasketModel().getBasket())
    