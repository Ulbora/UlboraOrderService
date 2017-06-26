/*     
 Copyright (C) 2016 Ulbora Labs Inc. (www.ulboralabs.com)
 All rights reserved.
 
 Copyright (C) 2016 Ken Williamson
 All rights reserved.
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published
 by the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */



var productService = require("../services/productService");
var detailsService = require("../services/detailsService");
var optionsService = require("../services/optionsService");
var barCodeService = require("../services/barCodeService");

exports.init = function(app, db){
    //init
    productService.init(db);
    detailsService.init(db);
    optionsService.init(db);
    barCodeService.init(db);
    
    // product validation
    app.post('/rs/product/add', productService.add);
    app.put('/rs/product/update', productService.update);
    app.get('/rs/product/get/:id/:clientId', productService.get);    
    app.delete('/rs/product/delete/:id/:clientId', productService.delete);
    
    //details services
    app.post('/rs/details/add', detailsService.add);      
    app.put('/rs/details/update', detailsService.update);
    app.get('/rs/details/get/:id/:clientId', detailsService.get);
    app.post('/rs/details/getByProduct', detailsService.getByProduct);  
    app.post('/rs/details/getBySku', detailsService.getBySku);  
    app.post('/rs/details/getByBarCode', detailsService.getByBarCode);  
    app.delete('/rs/details/delete/:id/:clientId', detailsService.delete);
    
    //options services
    app.post('/rs/options/add', optionsService.add);      
    app.put('/rs/options/update', optionsService.update);
    app.get('/rs/options/get/:id/:clientId', optionsService.get);
    app.post('/rs/options/getByDetails', optionsService.getByDetails);  
    app.post('/rs/options/searchByOption', optionsService.searchByOption);      
    app.delete('/rs/options/delete/:id/:clientId', optionsService.delete);
    
    //barcode services
    app.post('/rs/barCode/add', barCodeService.add);      
    app.put('/rs/barCode/update', barCodeService.update);
    app.get('/rs/barCode/get/:id/:clientId', barCodeService.get);
    app.post('/rs/barCode/getByDetails', barCodeService.getByDetails);        
    app.delete('/rs/barCode/delete/:id/:clientId', barCodeService.delete);
};
