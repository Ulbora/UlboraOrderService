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
var orderItemQueries = require("../queries/orderItemQueries");
var crud;
exports.init = function (c) {
    crud = c;
};
exports.addOrderItem = function (con, json, callback) {
    var args = {
        product: json.product,
        sku: json.sku,
        ordered_qty: json.orderedQty,
        cancel_qty: json.cancelQty,
        returned_qty: json.returnedQty,
        back_ordered_qty: json.backOrderedQty,
        retail_price: json.retailPrice,
        status: json.status,
        order_type: json.orderType,
        comment: json.comment,
        order_id: json.orderId,
        client_id: json.clientId
    };
    crud.insert(con, orderItemQueries.ORDER_ITEM_INSERT_QUERY, args, function (result) {
        var rtn = {
            id: result.id,
            clientId: json.clientId,
            success: result.success,
            message: result.message
        };
        callback(rtn);
    });
};


exports.updateOrderItem = function (con, json, callback) {
    var args = [
        json.orderedQty,
        json.cancelQty,
        json.returnedQty,
        json.backOrderedQty,
        json.retailPrice,
        json.status,
        json.orderType,
        json.comment,
        json.id,
        json.clientId
    ];
    crud.update(con, orderItemQueries.ORDER_ITEM_UPDATE_QUERY, args, callback);
};


exports.getOrderItem = function (id, clientId, callback) {
    var queryId = [id, clientId];
    crud.get(orderItemQueries.ORDER_ITEM_GET_BY_ID_QUERY, queryId, function (result) {
        if (result.success && result.data.length > 0) {
            var rtn = {
                id: result.data[0].id,
                product: result.data[0].product,
                sku: result.data[0].sku,
                orderedQty: result.data[0].ordered_qty,
                cancelQty: result.data[0].cancel_qty,
                returnedQty: result.data[0].returned_qty,
                backOrderedQty: result.data[0].back_ordered_qty,
                retailPrice: result.data[0].retail_price,
                status: result.data[0].status,
                orderType: result.data[0].order_type,
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


exports.getOrderItemListByOrder = function (json, callback) {
    var queryId = [
        json.orderId,
        json.clientId
    ];
    crud.get(orderItemQueries.ORDER_ITEM_LIST_BY_ORDER_QUERY, queryId, function (result) {
        var rtnList = [];
        if (result.success && result.data.length > 0) {
            for (var cnt = 0; cnt < result.data.length; cnt++) {
                var rtn = {
                    id: result.data[cnt].id,
                    product: result.data[cnt].product,
                    sku: result.data[cnt].sku,
                    orderedQty: result.data[cnt].ordered_qty,
                    cancelQty: result.data[cnt].cancel_qty,
                    returnedQty: result.data[cnt].returned_qty,
                    backOrderedQty: result.data[cnt].back_ordered_qty,
                    retailPrice: result.data[cnt].retail_price,
                    status: result.data[cnt].status,
                    orderType: result.data[cnt].order_type,
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




exports.deleteOrderItem = function (con, id, clientId, callback) {
    var queryId = [id, clientId];
    crud.delete(con, orderItemQueries.ORDER_ITEM_DELETE_QUERY, queryId, callback);
};

