var express = require('express');
var router = express.Router();

var multer=require('multer');
var storage=multer.diskStorage({
destination: function (req,file,cb) {
  cb(null, '/images');
},
  filename:function (req,file,cb) {
    cb(null,file.originalname);
  }
})
var upload=multer({storage:storage});

var fs = require('fs');



var db ='mongodb+srv://admin8386:toanpho1111@cluster0.9lwgy.mongodb.net/mydata?retryWrites=true&w=majority'
const mongoose = require('mongoose');
mongoose.connect(db).catch(error=>{
  console.log("co loi xay ra")
});
var datas=[0,1,2,3,4,5,6,7];
var student={name:'Quan',sinhnhat:'2022'}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', name:'toan',mang: datas,sinhvien:student});
});

router.get('/allsupport',function (req,res) {
  Students.find({},function (err,data) {
    res.render('allsupport',{data:data});
  })

});

router.get('/asia',function (req,res){
  console.log('asia')
  res.render('category',{title:'Asia'});
});



router.get('/euro', function (req,res){
  console.log('euro')
  res.render('category',{title:'Euro'});
});

router.get('/america', function (req,res){
  console.log('america')
  res.render('category',{title:'America'});
});

router.get('/about', function (req,res){
  fs.readFile('data.txt',function (err,data) {
    if(err){
      res.render('about',{message:err});
    }else {
      var dulieu= JSON.parse(data);
      res.render('about',{data: dulieu})
    }

  });
});

router.get('/upload',function (req,res) {
  res.render('upload');
});

router.post('/upload',upload.single("avatar"),function (req,res) {
console.log(req.file);
res.send('thanh cong')
});

router.get('/hotview',function (req,res){
  console.log('hotview')
  res.render('hotview',{title:'Hotview', message:''});
});

// dinh nghia thuoc tinh
const studentSchema = new mongoose.Schema({
  email: 'string',
  content: 'string'
});
const Students = mongoose.model('students', studentSchema);
router.post('/test',async function (request
    , response) {

  var email = request.body.email;
  var content = request.body.content;

//   fs.writeFile('myFile/' + email + '.txt',content,function (error) {
//     if(error){
// response.render('hotview',{message:error})
//     }else

  // })

// goi cau lenh save vao database
  const data = new Students({
    email: email,
    content: content,
  });

  data.save(function (err) {
    if (err) return handleError(err);
    response.render('hotview', {message: 'chung toi da nhan duoc phan hoi'})
    console.log(email)
    console.log(content)
  });

  // update file
  // const filte = {email: email};
  // const updater = {content: content};
  // let ketqua = await Students.findOneAndUpdate(filte, updater, {
  //   new: true
  //
  // });

  // delete file
  // let xoa = await Students.findOneAndDelete(filte,updater,function (err) {
  //   console.log(err)
  // })

});






module.exports = router;
