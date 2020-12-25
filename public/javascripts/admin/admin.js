function addProduct(){
    var category='<option value="">-- Select One --</option>';
    var subCategory='<option value="">-- Select One --</option>';
    var saleCategory='<option value="">-- Select One --</option>';
    var output="";
    $.post('/admin/getCategory',{},function(data){
        
        data.forEach(function(val,key,ary){
           if(val.category){
            category+='<option value="'+val.category+'">'+val.category+'</option>'  
           } 
           if(val.subCategory){
            subCategory+='<option value="'+val.subCategory+'">'+val.subCategory+'</option>'  
           }
           if(val.sealCategory){
            saleCategory+='<option value="'+val.sealCategory+'">'+val.sealCategory+'</option>'  
           }
           if(key===ary.length -1){
               output+='<form  action="/admin/addNewProduct" method="POST" enctype="multipart/form-data" class="form-horizontal" role="form">\
               <div class="form-group">\
                 <div class="col-sm-10 col-sm-offset-2">\
                   <legend>Add a New Product</legend>\
                 </div>\
               </div>\
               <div class="form-group">\
               <label for="inputProductName" class="col-sm-2 control-label">Product Name:</label>\
               <div class="col-sm-10">\
                 <input type="text" name="ProductName" id="inputProductName" class="form-control" value="" required="required" >\
               </div>\
             </div>\
             <div class="form-group">\
               <label for="inputCategory" class="col-sm-2 control-label">Category:</label>\
               <div class="col-sm-2">\
                 <select name="Category" id="inputCategory" class="form-control">\
                   '+category+'\
                 </select>\
               </div>\
               <label for="inputCategory" class="col-sm-2 control-label">Sub Category:</label>\
               <div class="col-sm-2">\
                 <select name="SubCategory" id="inputsubCategory" class="form-control">\
                   '+subCategory+'\
                 </select>\
               </div>\
               <label for="inputCategory" class="col-sm-2 control-label">Sale Category:</label>\
               <div class="col-sm-2">\
                 <select name="saleCategory" id="inputsaleCategory" class="form-control">\
                   '+saleCategory+'\
                 </select>\
               </div>\
             </div>\
             <div class="form-group">\
               <label for="inputqty" class="col-sm-2 control-label">Quentity:</label>\
               <div class="col-sm-1">\
                 <input type="text" name="qty" id="qty" class="form-control" value="" required="required">\
               </div>\
               <label for="inputqty" class="col-sm-2 control-label">Purchesh Rate &#163;:</label>\
               <div class="col-sm-1">\
                 <input type="text" name="pRate" id="pRate" class="form-control" value="" required="required" >\
               </div>\
               <label for="inputqty" class="col-sm-2 control-label">Sale Rare &#163;:</label>\
               <div class="col-sm-1">\
                 <input type="text" name="sRate" id="sRate" class="form-control" value="" required="required" >\
               </div>\
               <label for="inputqty" class="col-sm-2 control-label">Sale Discount:</label>\
               <div class="col-sm-1">\
                 <input type="text" name="sDisc" id="sDisc" class="form-control" value="" required="required">\
               </div>\
             </div>\
             <div class="form-group">\
               <label for="textareaproDetails" class="col-sm-2 control-label">Product details:</label>\
               <div class="col-sm-10">\
                 <textarea name="proDetails" id="proDetails" class="form-control" rows="6" required="required"></textarea>\
               </div>\
             </div>\
             <div class="form-group">\
               <label for="textareaproDetails" class="col-sm-2 control-label">Product Picture:</label>\
               <div class="col-sm-2">\
                 <label class="btn btn-default col-xs-12 col-sm-12">Main Pic &nbsp;<span id="img1" class="document"><i class="fa fa-camera" aria-hidden="true"></i></span>\
                   <input name="file1" type="file" accept="image/*;capture=camera" style="display: none;" class="file">\
               </label>\
               </div>\
               <div class="col-sm-2">\
                 <label class="btn btn-default col-xs-12 col-sm-12">Sub Pic &nbsp;<span id="img1" class="document"><i class="fa fa-camera" aria-hidden="true"></i></span>\
                   <input name="file2" type="file" accept="image/*;capture=camera" style="display: none;" class="file">\
               </label>\
               </div>\
               <div class="col-sm-2">\
                 <label class="btn btn-default col-xs-12 col-sm-12">Sub Pic &nbsp;<span id="img1" class="document"><i class="fa fa-camera" aria-hidden="true"></i></span>\
                   <input name="file3" type="file" accept="image/*;capture=camera" style="display: none;" class="file">\
               </label>\
               </div>\
               <div class="col-sm-2">\
                 <label class="btn btn-default col-xs-12 col-sm-12">Sub Pic &nbsp;<span id="img1" class="document"><i class="fa fa-camera" aria-hidden="true"></i></span>\
                   <input name="file4" type="file" accept="image/*;capture=camera" style="display: none;" class="file">\
               </label>\
               </div>\
             </div>\
               <div class="form-group">\
                 <div class="col-sm-10 col-sm-offset-2">\
                   <button type="submit" class="btn btn-primary">Submit</button>\
                 </div>\
               </div>\
           </form>';
           $("#list-product").css({"display":"none"});
           $("#add-product").css({"display":"block"});
           $("#add-product").html(output);
           }
        });

        
    })
}


function getProduct(){
    $.post('/admin/getProduct',{},function(data){
        var output="";
        
        data.forEach(function(val,key,ary){
          output+='<ul class="list-group">\
          <li class="list-group-item active">\
            <span style="font-size:small; " class="badge">Detete </span>\
            <span style="font-size:small; " class="badge">Edit </span>\
            <span style="font-size:small; " class="badge">Discount: '+Number(val.sDisc)+'%</span>\
            <span style="font-size:small; " class="badge">S Rate:&#163; '+Number(val.sRate).toFixed(2)+'</span>\
            <span style="font-size:small; " class="badge">P Rate:&#163; '+Number(val.pRate).toFixed(2)+'</span>\
            <span style="font-size:small; " class="badge">Qty: '+Number(val.qty)+'</span>\
            <strong>'+val.title+'</strong>\
          </li>\
          <li class="list-group-item list-group-item-info">\
            <span style="font-size:small; " class="badge">Sale Category : '+val.saleCategory+'</span>\
            <span style="font-size:small; " class="badge">Sub Category: '+val.subCategory+'</span>\
            <span style="font-size:small; " class="badge">Category: '+val.category+'</span>\
            <span style="font-size:small; " class="badge">View Details </span>\
            <img style="width: 100px; border-radius: 10px; height: 100px; border: 1px solid rgb(25, 85, 134);" src="/images/'+val.proPic1+'">\
\
            <p style="margin-left: 110px; margin-top: -50px; height: 50px; overflow-y: auto;">\
            <strong>Details:</strong> '+val.proDetails+'\
            </p>\
          </li> \
      </ul>';
           if(key===ary.length -1){
            $("#list-product").css({"display":"block"});
            $("#add-product").css({"display":"none"});
            $("#list-product").html(output);
           }
        });
    });

}