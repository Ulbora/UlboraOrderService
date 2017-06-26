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

//client operations---------------------------------------
var ordersQueries = require("../queries/ordersQueries");
var crud;
exports.init = function (c) {
    crud = c;
};
exports.addOrder = function (con, json, callback) {
    var args = {
        client_id: json.clientId,
        customer_id: json.customerId,
        billing_address_id: json.billingAddressId,
        order_date: json.orderDate,
        comment: json.comment,
        payment: json.payment

    };
    crud.insert(con, ordersQueries.ORDERS_INSERT_QUERY, args, function (result) {
        var rtn = {
            id: result.id,
            clientId: json.clientId,
            success: result.success,
            message: result.message
        };
        callback(rtn);
    });
};

exports.updateOrder = function (con, json, callback) {
    var args = [
        json.billingAddressId,
        json.comment,
        json.payment,
        json.id,
        json.clientId
    ];
    // console.log("json: " + JSON.stringify(json));
    crud.update(con, ordersQueries.ORDERS_UPDATE_QUERY, args, callback);
};


exports.getOrder = function (id, clientId, callback) {
    var queryId = [id, clientId];
    crud.get(ordersQueries.ORDERS_GET_BY_ID_QUERY, queryId, function (result) {
        if (result.success && result.data.length > 0) {
            var rtn = {
                id: result.data[0].id,
                customerId: result.data[0].customer_id,
                billingAddressId: result.data[0].billing_address_id,
                orderDate: result.data[0].order_date,
                comment: result.data[0].comment,
                payment: result.data[0].payment,
                clientId: result.data[0].client_id
            };
            callback(rtn);
        } else {
            callback(null);
        }
    });
};



exports.getOrderListByClient = function (clientId, callback) {
    var queryId = [
        clientId
    ];
    crud.get(ordersQueries.ORDERS_LIST_BY_CLIENT_QUERY, queryId, function (result) {
        var rtnList = [];
        if (result.success && result.data.length > 0) {
            for (var cnt = 0; cnt < result.data.length; cnt++) {
                var rtn = {
                    id: result.data[cnt].id,
                    customerId: result.data[cnt].customer_id,
                    billingAddressId: result.data[cnt].billing_address_id,
                    orderDate: result.data[cnt].order_date,
                    comment: result.data[cnt].comment,
                    payment: result.data[cnt].payment,
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


exports.getOrderListByCustomer = function (clientId, customerId, callback) {
    var queryId = [
        clientId,
        customerId
    ];
    crud.get(ordersQueries.ORDERS_LIST_BY_CUSTOMER_QUERY, queryId, function (result) {
        var rtnList = [];
        if (result.success && result.data.length > 0) {
            for (var cnt = 0; cnt < result.data.length; cnt++) {
                var rtn = {
                    id: result.data[cnt].id,
                    customerId: result.data[cnt].customer_id,
                    billingAddressId: result.data[cnt].billing_address_id,
                    orderDate: result.data[cnt].order_date,
                    comment: result.data[cnt].comment,
                    payment: result.data[cnt].payment,
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


exports.deleteOrder = function (con, id, clientId, callback) {
    var queryId = [id, clientId];
    crud.delete(con, ordersQueries.ORDERS_DELETE_QUERY, queryId, callback);
};
