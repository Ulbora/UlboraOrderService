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
var packageQueries = require("../queries/packageQueries");
var crud;
exports.init = function (c) {
    crud = c;
};
exports.addPackage = function (con, json, callback) {
    var args = {
        shipped_date: json.shippedDate,
        tracking: json.tracking,
        shipping_address_id: json.shippingAddressId,
        package_number: json.packageNumber,
        shipping_cost: json.shippingCost,
        comment: json.comment,
        order_id: json.orderId,
        client_id: json.clientId
    };
    crud.insert(con, packageQueries.PACKAGE_INSERT_QUERY, args, function (result) {
        var rtn = {
            id: result.id,
            success: result.success,
            message: result.message
        };
        callback(rtn);
    });
};


exports.updatePackage = function (con, json, callback) {
    var args = [
        json.shippedDate,
        json.tracking,
        json.shippingAddressId,
        json.shippingCost,
        json.comment,
        json.id,
        json.clientId
    ];
    crud.update(con, packageQueries.PACKAGE_UPDATE_QUERY, args, callback);
};


exports.getPackage = function (id, clientId, callback) {
    var queryId = [id, clientId];
    crud.get(packageQueries.PACKAGE_GET_BY_ID_QUERY, queryId, function (result) {
        if (result.success && result.data.length > 0) {
            var rtn = {
                id: result.data[0].id,
                shippedDate: result.data[0].shipped_date,
                tracking: result.data[0].tracking,
                shippingAddressId: result.data[0].shipping_address_id,
                packageNumber: result.data[0].package_number,
                shippingCost: result.data[0].shipping_cost,
                comment: result.data[0].comment,
                orderId: result.data[0].order_id,
                clientId: result.data[0].client_id
            };
            callback(rtn);
        } else {
            callback(null);
        }
    });
};


exports.getPackageCountByOrder = function (orderId, clientId, callback) {
    var queryId = [orderId, clientId];
    crud.get(packageQueries.PACKAGE_COUNT_BY_ORDER_QUERY, queryId, function (result) {
        if (result.success && result.data.length > 0) {
            var rtn = {
                packageCount: result.data[0].packageCount
            };
            callback(rtn);
        } else {
            callback(null);
        }
    });
};



exports.getPackageListByOrder = function (json, callback) {
    var queryId = [
        json.orderId,
        json.clientId
    ];
    crud.get(packageQueries.PACKAGE_LIST_BY_ORDER_QUERY, queryId, function (result) {
        if (result.success && result.data.length > 0) {
            var rtnList = [];
            for (var cnt = 0; cnt < result.data.length; cnt++) {
                var rtn = {
                    id: result.data[cnt].id,
                    shippedDate: result.data[cnt].shipped_date,
                    tracking: result.data[cnt].tracking,
                    shippingAddressId: result.data[cnt].shipping_address_id,
                    packageNumber: result.data[cnt].package_number,
                    shippingCost: result.data[cnt].shipping_cost,
                    comment: result.data[cnt].comment,
                    orderId: result.data[cnt].order_id,
                    clientId: result.data[cnt].client_id
                };
                rtnList.push(rtn);
            }
            callback(rtnList);
        } else {
            callback(rtnList);
        }
    });
};


exports.getPackageOrderDetails = function (json, callback) {
    var queryId = [
        json.orderId,
        json.clientId
    ];
    crud.get(packageQueries.PACKAGE_ORDER_DETAILS_GET_BY_BAR_CODE, queryId, function (result) {
        if (result.success && result.data.length > 0) {
            var rtnList = [];
            for (var cnt = 0; cnt < result.data.length; cnt++) {
                var rtn = {
                    packageId: result.data[cnt].package_id,
                    shippedDate: result.data[cnt].shipped_date,
                    tracking: result.data[cnt].tracking,
                    shippingAddressId: result.data[cnt].shipping_address_id,
                    packageNumber: result.data[cnt].package_number,
                    shippingCost: result.data[cnt].shipping_cost,
                    packageComments: result.data[cnt].package_comments,
                    orderItemId: result.data[cnt].order_item_id,
                    product: result.data[cnt].product,
                    sku: result.data[cnt].sku,
                    orderedQty: result.data[cnt].ordered_qty,
                    cancelQty: result.data[cnt].cancel_qty,
                    returnedQty: result.data[cnt].returned_qty,
                    backOrderedQty: result.data[cnt].back_ordered_qty,
                    retailPrice: result.data[cnt].retail_price,
                    orderItemStatus: result.data[cnt].order_item_status,
                    orderType: result.data[cnt].order_type,
                    itemComments: result.data[cnt].item_comments,
                    orderId: result.data[cnt].order_id,                    
                    clientId: result.data[cnt].client_id,
                    customerId: result.data[cnt].customer_id,
                    billingAddressId: result.data[cnt].billing_address_id,
                    orderDate: result.data[cnt].order_date,
                    orderComments: result.data[cnt].order_comments,
                    payment: result.data[cnt].payment
                    
                };
                rtnList.push(rtn);
            }
            callback(rtnList);
        } else {
            callback(rtnList);
        }
    });
};




exports.deletePackage = function (con, id, clientId, callback) {
    var queryId = [id, clientId];
    crud.delete(con, packageQueries.PACKAGE_DELETE_QUERY, queryId, callback);
};

