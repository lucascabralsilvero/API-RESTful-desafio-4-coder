const fs = require('fs');
  

class Container {
    constructor(){
    }
    saveProduct(product , file){
        console.log('Guardando...', product);
        let nextId = this.getNextId(file);
        product.id = nextId;
        const allProductsArray = this.read(file);
        allProductsArray.push(product);
        this.write(allProductsArray, file);
    }
    
    updateProduct(id, product, file){
        console.log('Actualizando...', product);
       const allProductsArray = this.read(file);
         let index = allProductsArray.findIndex(product => product.id == id);
            if(index >= 0){
                allProductsArray[index] = product;
                this.write(allProductsArray, file);
                console.log('Actualizado');
            }else{
                console.log('No se encontro el producto');
            }
    }
      


    getNextId(file){
        let lastId = 0;
        let allProductsArray = this.read(file);
        if(allProductsArray.length > 0){
            lastId = allProductsArray[allProductsArray.length - 1].id;
        }
        return lastId + 1;
    }

    read(file){
        let allProductsArray = [];
        try{
            allProductsArray = fs.readFileSync(file, 'utf8');
            allProductsArray.length > 0 ? allProductsArray = JSON.parse(allProductsArray): allProductsArray = [];
        }catch(err){
            console.log('Error en la lectura del archivo', err);
        }
        return allProductsArray;
    }

     write(allProductsArray, file){
        let json = JSON.stringify(allProductsArray);
        try{
            fs.writeFileSync(file, json);
        }catch(err){
            console.log('Error en la escritura', err);
        }
    }


    getById(id, file){
        let allProductsArray = this.read(file);
        let product = allProductsArray.find(product => product.id == id);
        return product ? product : null;
    }

    getAll(file){
        let allProductsArray = this.read(file);
        return allProductsArray;
    }

    deleteById(id, file){
        let allProductsArray = this.read(file);
        let index = allProductsArray.findIndex(product => product.id == id);
        if(index >= 0){
            allProductsArray.splice(index, 1);
            let json = JSON.stringify(allProductsArray);
            try{
                fs.writeFileSync(file, json);
                return id
            }
            catch(err){
                console.log('Error en la escritura', err);
            }
        }
    }
  
    deleteAll(file){
        let allProductsArray = [];
        let json = JSON.stringify(allProductsArray);
        try{
            fs.writeFileSync(file, json);
        }
        catch(err){
            console.log('Error en la escritura', err);
        }
    }

    

}



module.exports = Container;