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
'use strict';
//client operations---------------------------------------
var packageItemsQueries = require("../queries/packageItemsQueries");
var crud;
exports.init = function (c) {
    crud = c;
};
exports.addPackageItems = function (con, json, callback) {
    var args = {
        order_item_id: json.orderItemId,
        package_id: json.packageId
    };    
    crud.insertNoId(con, packageItemsQueries.PACKAGE_ITEMS_INSERT_QUERY, args, function (result) {        
        var rtn = {            
            success: result.success,
            message: result.message
        };
        callback(rtn);
    });
};


exports.deletePackageItems = function (con, orderItemId, packageId, callback) {
    var queryId = [orderItemId, packageId];
    crud.delete(con, packageItemsQueries.PACKAGE_DELETE_QUERY, queryId, callback);
};

