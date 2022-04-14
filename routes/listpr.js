var express = require('express');
var router = express.Router();
const Product = require("../modul/product")
router.get('/list',function (req,res) {
    let datas
    Product.find(async (err, result)=>{
        datas=Array.from(result)
        res.render('listpr',{datas:datas,deleteDoc:deleteDoc});
    })
});

const deleteDoc = (id)=>{
console.log("hi there")
Product.deleteOne({id},function (err) {
    if(err){
console.log(err)
    }else{
        console.log("deleted")
    }
})
}

router.get('/list1',function (req,res) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:19006');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    let datas
    Product.find(async (err, result)=>{
        datas=Array.from(result)
        res.send(result)
    })
});
module.exports = router;