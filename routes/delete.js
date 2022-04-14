var express = require('express');
var router = express.Router();
const Product = require("../modul/product");


router.post('/delete/:id',function (req,res) {
    console.log(req)
    Product.deleteOne({id: req.params.id},function (err) {
        if(err){
          console.log(err)
        }
        console.log("deleted")
        res.redirect('/list')
    })
})


module.exports = router;