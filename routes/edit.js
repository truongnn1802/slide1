var express = require('express');
var router = express.Router();
const Product = require("../modul/product");


router.get('/edit/',function (req,res) {
return Product.findById(req.params.id,function (err,product) {
    if(err){
     throw err
    }else {
       return  res.render('edit',{datas:product})
    }
})
});

router.post('/edit/:id',(req,res)=>{
    const productName = req.body.productName
    const productDescription = req.body.productDescription
    const productImageLink = req.body.productImageLink

    const update = async () => await Product.findOneAndUpdate(req.params.id, {
        productName: productName,
        productDescription: productDescription,
        productImageLink: productImageLink
    }, {new: false})
    update().then(r => {
        console.log("edit successful")
    })
    let datas;
    Product.find(async (error, result) => {
        if (error) {
            console.log(error)
        } else {
            datas = Array.from(result)
            res.render('listpr', {datas: datas});
        }
    })
})
module.exports = router;