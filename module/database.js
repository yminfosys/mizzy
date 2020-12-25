var mongoose = require('mongoose');

//mongoose.set('useFindAndModify', false);
autoIncrement = require('mongoose-auto-increment');
const config = {
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  
};
var uri='mongodb://127.0.0.1:27017/mizzy';
function mongCon(){
    mongoose.connect(uri,config).
    catch(error => handleError(error));
    }
    mongCon();
    mongoose.connection.on('error', err => {
      //logError(err);
      console.log(err)
      setTimeout(mongCon,20000);
      
    });
    autoIncrement.initialize(mongoose.connection);


    //////Admin///////////////
    var adminSchema = new mongoose.Schema({
        name:  String,
        email :String,
        password: String,    
        address:String,
        mobileNumber:String,  
    });
    var adminmodul = mongoose.model('admincollections', adminSchema);

    //////////Cust Schema///////
    var custSchema = new mongoose.Schema({ 
        name:  String,
        email :String,
        address:String,
        cityName:String ,
        postcode:String,
        password: String,    
        mobileNumber:String, 
        isdCode:String,       
        CustID:String,
        status:String,
        walletBalance:String,
        BuyKM:String,   
        custRating:String,   
        userType:String,
        orderStage:String,
        bookingID:String,
        followupStatus:String,
        generalPriceperKm:[],
        generalMinimumprice:[],
        generalMinimumKm:[],
        generalBasePrice:[],
        preRidePriceperKm:[],
        preRideperMinutCharge:[],
        GenarelPerMinutCharge:[],
        driverPayout:[],
        shereRide:[],
        shereRideCapacity:[],
        regdate: { type: Date, default: Date.now },
        lastLogindate: { type: Date },
        date: { type: Date, default: Date.now }, 
        pickuplatlong:[],
        picuplocation:String,
        droplatlong:[],
        droplocation:String,
        loginCountry:String,
        loginLatLng:[],  
        location: [],
        refType:String,
        refBy:String,
        spacelDiscount:String
    });
    
    custSchema.plugin(autoIncrement.plugin, { model: 'incustcollections', field: 'CustID',startAt: 1000, incrementBy: 1 });
    
    var custmodul = mongoose.model('incustcollections', custSchema);

    ////Admin SubAdmin Schema
var adminSchema = new mongoose.Schema({ 
  adminID:String,
  adminType:String,
  Name:String,
  password:String,
  Address:String,
  mobile:String,
  email:String,
  subadmincitys:[],
  date: { type: Date, default: Date.now }
 
 
});
adminSchema.plugin(autoIncrement.plugin, { model: 'nadmincollections', field: 'adminID',startAt: 1, incrementBy: 1 });
var adminmodul = mongoose.model('inadmincollections', adminSchema);

////Product Schema
    var productSchema = new mongoose.Schema({ 
      productID:String,
      title:String,
      category:String,
      subCategory:String,
      saleCategory:String,
      qty:String,
      pRate:String,
      sRate:String,
      sDisc:String,
      proDetails:String,
      proPic1:String,
      proPic2:String,
      proPic3:String,
      proPic4:String,     
      date: { type: Date, default: Date.now}    
     
    });
    productSchema.plugin(autoIncrement.plugin, { model: 'productcollections', field: 'productID',startAt: 1, incrementBy: 1 });
    var productmodul = mongoose.model('productcollections', productSchema);

///Category Schema 
var categorySchema = new mongoose.Schema({  
  category:String,
  subCategory :String,
  sealCategory :String 
});

var categorymodul = mongoose.model('categorycollections', categorySchema);

///Counter Schema 
var counterSchema = new mongoose.Schema({  
  orderID:String   
});

var countermodul = mongoose.model('inrideCountcollections', counterSchema);



    // module.exports.admin=adminmodul;
    // module.exports.cust=custmodul;
    // module.exports.admin=adminmodul;
    module.exports={
      admin:adminmodul,
      cust:custmodul,
      product:productmodul,
      counter:countermodul,
      category:categorymodul
    }