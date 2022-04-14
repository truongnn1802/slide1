const mongoose =require('mongoose')
const Schema =mongoose.Schema

const Product = new Schema({
    productName: String,
    productDescription: String,
    productImageLink:String,
})

module.exports=mongoose.model("product",Product)
