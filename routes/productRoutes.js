const {Router} = require('express');
const router = Router();
const Container = require('../container')
const file = './products.txt';
const containerProducts = new Container();
const multer = require('multer');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + '/public/files/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
router.use(multer({storage}).single('photo'));

router.get('/', (req, res) => {
    res.json(containerProducts.getAll(file));
}
);

router.get('/:id', (req, res) => {  
    const { id } = req.params;
    const product = containerProducts.getById(parseInt(id), file);
    product ? res.json({product_id: id, producto: product}) 
            : res.json({message: 'Producto no encontrado. Id: '+ id});
});

router.post('/', (req, res) => {
    const  body  = req.body;
    const photo = req.file;
    body.thumbnail = photo.filename;
    containerProducts.saveProduct(body, file);
    res.json({message: 'Producto guardado', producto: body});
}
);

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const product = containerProducts.getById(parseInt(id), file);
    product ? containerProducts.updateProduct(id,body, file) : res.json({message: 'Producto no encontrado. Id: '+ id});
    res.json({message: 'Producto actualizado', producto: body});
}
);

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const product = containerProducts.deleteById(parseInt(id), file);
    product ? res.json({message: 'Producto eliminado', id: id}) : res.json({message: 'Producto no encontrado. Id: '+ id});
}
);


module.exports = router;