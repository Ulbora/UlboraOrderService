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

var db = require("./mysql/db");

exports.connectDb = function (conf) {
    var host;
    if(process.env.MYSQL_PORT_3306_TCP_ADDR){
        host = process.env.MYSQL_PORT_3306_TCP_ADDR;
    }else{
        host = process.env.DATABASE_HOST || conf.DATABASE_HOST;
    }            
    var user = process.env.DATABASE_USER_NAME || conf.DATABASE_USER_NAME;
    var pw = process.env.DATABASE_USER_PASSWORD || conf.DATABASE_USER_PASSWORD;
    var database = process.env.DATABASE_NAME || conf.DATABASE_NAME;
    var conPoolSize = process.env.DATABASE_POOL_SIZE || conf.DATABASE_POOL_SIZE;
    db.connect(host, user, pw, database, conPoolSize);
};

exports.connect = function (host, user, pw, database, cpnum) {
    db.connect(host, user, pw, database, cpnum);
};


exports.addOrder = function (json, callback) {
    db.addOrder(json, callback);
};

exports.getOrder = function (id, clientId, callback) {
    db.getOrder(id, clientId, callback);
};


exports.getOrderListByClient = function (clientId, callback) {
    db.getOrderListByClient(clientId, callback);
};

exports.getOrderListByCustomer = function (clientId, customerId, callback) {
    db.getOrderListByCustomer(clientId, customerId, callback);
};


exports.updateOrder = function (json, callback) {
    db.updateOrder(json, callback);
};

exports.deleteOrder = function (orderId, clientId, callback) {
    db.deleteOrder(orderId, clientId, callback);
};

exports.addOrderItem = function (json, callback) {
    db.addOrderItem(json, callback);
};

exports.updateOrderItem = function (json, callback) {
    db.updateOrderItem(json, callback);
};

exports.deleteOrderItem = function (id, clientId, callback) {
    db.deleteOrderItem(id, clientId, callback);
};

exports.addPackage = function (json, callback) {
    db.addPackage(json, callback);
};
exports.updatePackage = function (json, callback) {
    db.updatePackage(json, callback);
};

exports.getPackageOrderDetails = function (json, callback) {
    db.getPackageOrderDetails(json, callback);
};

exports.deletePackage = function (id, clientId,  callback) {
    db.deletePackage(id, clientId,  callback);
};