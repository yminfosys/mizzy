var express = require('express');
var router = express.Router();
var database=require('../module/database');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var multer  = require('multer')
const sharp = require('sharp');

var storage = multer.memoryStorage()
var upload = multer({storage})


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.adminID){
    database.admin.findOne({adminID:req.cookies.adminID},function(err,admin){
      if(admin){
        bcrypt.compare("admin", admin.password, function(err, pass) {
          if(pass){
            /////set New Password/////
            res.render('adminSetNewPassword', {admin:admin});
            
          }else{
            res.render('adminpannel', {admin:admin});
          }
        })
      }
      
    })
    
  }else{
    res.redirect('/admin/login');
  }


  
});

router.get('/login', function(req, res, next) {
  if(req.cookies.adminID){
    res.redirect('/admin');
  }else{
    res.render('adminLogin', { msg: '' });
  }

    
});

router.post('/login', function(req, res, next) {
  database.admin.findOne({email:req.body.email,adminType:"admin"},function(err,user){
    if(user){
    bcrypt.compare(req.body.password, user.password, function(err, pass) {
       console.log(pass)
         if(pass){
          res.cookie("adminID", user.adminID, {maxAge: 5*60*60*1000 }); 
          res.redirect('/admin');
         }else{
           //////Worng Password//////
           res.render('adminLogin', {msg:"Worng Password" });
         }
         });
        }else{
          ////////Register Admin///////
          if(req.body.email=="mizzy@mizzy.com"){
            res.render('adminReg', {msg:"" });
          }else{
            res.render('adminLogin', {msg:"Worng User Email" }); 
          }
          
        }
      });

});


router.post('/reg', function(req, res, next) {
  database.admin.findOne({email:req.body.email,adminType:"admin"},function(err,admin){
    if(!admin){
      bcrypt.hash("admin", saltRounds, function(err, hash) {
        database.admin({
          adminType:"admin",
          Name:req.body.name,
          password:hash,
          Address:req.body.address,
          mobile:req.body.mobile,
          email:req.body.email,
        }).save(function(err){
          res.redirect('/admin');
        })
      })
    }else{
      /////Admin exist////
      res.render('adminLogin', {msg:"Admin Allredy Register" });
    }
  });
});

//////Set Admin New Password//////
router.post('/newpsw', function(req, res, next) {
  database.admin.findOne({adminID:req.body.adminID,adminType:"admin"},function(err,admin){
    if(admin){
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        database.admin.findOneAndUpdate({adminID:req.body.adminID,adminType:"admin"},{$set:{password:hash}},function(er,data){
          res.clearCookie("adminID");
          res.redirect('/admin')
        })
      })
    }else{
      res.send("Unauthorise Call")
    }
  })
});

////////Logout /////////////
router.get('/logout', function(req, res, next) {
  res.clearCookie("adminID");
  res.redirect('/admin')
    
});


//////Add New Product///////
async function imgresizer(file,url,w,h){
  try{
    await sharp(file)
    .resize(Number(w), Number(h))
    .toFile(url, (err, info) => { 
      if(err){
        console.log(err)
      } 
      
    });
  }
  catch(err){
    console.log(err);
  }
}

var cpUpload = upload.fields([
      { name: 'file1', maxCount: 1 },
      { name: 'file2', maxCount: 1 },
      { name: 'file3', maxCount: 1 },
      { name: 'file4', maxCount: 1 },
     
      ])
router.post('/addNewProduct', cpUpload, async function(req, res, next) {
  var mainpic="";
  var subpic1="";
  var subpic2="";
  var subpic3="";
  var filemixunique=new Date().getTime();

  if(req.files.file1){
    mainpic='product/'+filemixunique+'main'+req.files.file1[0].originalname+'';
    var url='public/images/'+mainpic+'';   
    await imgresizer(req.files.file1[0].buffer,url,720,720);       
  }

  if(req.files.file2){
    subpic1='product/'+filemixunique+'subpic1'+req.files.file2[0].originalname+'';
    var url='public/images/'+subpic1+'';   
    await imgresizer(req.files.file2[0].buffer,url,720,720);  
  }
  if(req.files.file3){
    subpic2='product/'+filemixunique+'subpic2'+req.files.file3[0].originalname+'';
    var url='public/images/'+subpic2+'';   
    await imgresizer(req.files.file3[0].buffer,url,720,720);
  }

  if(req.files.file4){
    subpic3='product/'+filemixunique+'subpic3'+req.files.file4[0].originalname+'';
    var url='public/images/'+subpic3+'';   
    await imgresizer(req.files.file4[0].buffer,url,720,720);
  }
 
  database.product({
      title:req.body.ProductName,
      category:req.body.Category,
      subCategory:req.body.SubCategory,
      saleCategory:req.body.saleCategory,
      qty:req.body.qty,
      pRate:req.body.pRate,
      sRate:req.body.sRate,
      sDisc:req.body.sDisc,
      proDetails:req.body.proDetails,
      proPic1:mainpic,
      proPic2:subpic1,
      proPic3:subpic2,
      proPic4:subpic3
  }).save(function(err){
    res.redirect('/admin');
  })
  
});


//////getCategory///////////
router.post('/getCategory', function(req, res, next) {
  database.category.find({},function(err,categoty){
    res.send(categoty);
  })
})

///////getProduct////////
router.post('/getProduct', function(req, res, next) {
  database.product.find({},function(err,product){
    res.send(product);
  })
})

///////Add Category///////
// var categoty=[
//   {
//     category:"Electrical",
//     subCategory :"Motor",
//     sealCategory :"General"
// },{
//   category:"Electronics",
//   subCategory :"Mobile",
//   sealCategory :"Hot Sale"
// }
// ];
// categoty.forEach(function(val){
//   database.category({
//     category:val.category,
//     subCategory :val.subCategory,
//     sealCategory :val.sealCategory
//   }).save(function(err){
//     console.log("caregory update")
//   })
// })
////////jhdrthe


module.exports = router;
