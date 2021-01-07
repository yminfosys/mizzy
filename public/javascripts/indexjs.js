function allProduct(){ 
    var out="";
   // out='<div  class="owl-carousel owl-theme">';
    $.post('/getAllProduct',{},function(pro){
       
       pro.forEach(function(val,key,ary){
       
         out+='<div class=" col-sm-6  col-lg-3">\
         <div class="item shadow">\
           <div class="card">\
           <img class="card-img-top" src="/images/'+val.proPic1+'" alt="Card image" style="width:100%">\
           <div class="card-body" style="margin-left: 10px; margin-bottom: 20px;">\
             <p class="card-text">'+val.title+'</p>\
             <h6 style="color: red; font-weight: bold;">In Stock '+val.qty+' pcs</h6>\
             <h6 style="margin-left: 80%; margin-top: -25px;">MOQ:1</h6>\
             <h5 style="margin-top: 50px;"> &#163; '+val.sRate+'</h5>\
             <div class="p-icon">\
             <i class="fas fa-search"></i>\
             <i class="fas fa-shopping-cart" style="margin-left: 90%; margin-bottom: 30px;"></i>\
             </div>\
             </div>\
           </div>\
         </div>\
        </div>';
       if(key===ary.length -1){
        //out+='</div>';
        $("#allproduct").html(out);
        console.log(val)
        
       }  
       });
       
    });

    

//     $("#allproduct").html('<div  class="owl-carousel owl-theme">\
//     <div class="item shadow">\
//   <div class="card">\
//     <img class="card-img-top" src="/images/product/p1.jpg" alt="Card image" style="width:100%">\
//     <div class="card-body">\
//       <p class="card-text">Car Swivel Air Frame Vent Holder + Phone In Car Windscreen Suction Mount Holder... </p>\
//       <h6 style="color: red; font-weight: bold;">200 pcs</h6>\
//       <h6 style="margin-left: 80%; margin-top: -25px;">MOQ:1</h6>\
//       <h5 style="margin-top: 50px;">Wholesale $1.99</h5>\
//       <div class="p-icon">\
//       <i class="fas fa-search"></i>\
//       <i class="fas fa-shopping-cart" style="margin-left: 90%;"></i>\
//       </div>\
//     </div>\
//   </div>\
// </div>\
// </div>')
}