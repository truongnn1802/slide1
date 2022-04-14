var express = require('express');
var router = express.Router();
var expressHbs = require("express-handlebars");
const Product = require("../modul/product");





router.get('/addproduct',function (req,res) {
    res.render('addproduct',{message:''})
});


router.post('/addnew', (req ,res)=> {
    const productName = req.body.productName
    const productDescription = req.body.productDescription
    const productImageLink = req.body.productImageLink

    const data = new Product({
        productName: productName,
        productDescription: productDescription,
        productImageLink: productImageLink
    })
    data.save();
    console.log(data)
    res.render("addproduct", {message: "Add successful"})
})
module.exports = router;