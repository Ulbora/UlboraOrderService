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

var manager = require("./manager");

var db;

exports.init = function (database) {
    db = database;
};


exports.addOrder = function (json, callback) {
    var returnVal = {
        success: false,
        id: null,
        clientId: null,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    if (isOk) {
        db.addOrder(json, function (result) {
            if (result && result.success) {
                returnVal.success = result.success;
                returnVal.id = result.id;
                returnVal.clientId = result.clientId;
                callback(returnVal);
            } else {
                returnVal.message = result.message;
                callback(returnVal);
            }
        });
    } else {
        callback(returnVal);
    }
};


exports.updateOrder = function (json, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    if (isOk) {
        console.log("updateOrder req in manager: " + JSON.stringify(json));
        if (json.id !== undefined && json.id !== null &&
                json.clientId !== undefined && json.clientId !== null) {
            db.updateOrder(json, function (result) {
                if (result && result.success) {
                    returnVal.success = result.success;
                    callback(returnVal);
                } else {
                    returnVal.message = "Error updating customer";
                    callback(returnVal);
                }
            });
        } else {
            returnVal.message = "Missing parameters";
            callback(returnVal);
        }
    } else {
        callback(returnVal);
    }
};



exports.getOrder = function (id, clientId, callback) {
    var idOk = manager.securityCheck(id);
    var clientIdOk = manager.securityCheck(clientId);
    if (idOk && clientIdOk) {
        db.getOrder(id, clientId, function (result) {
            if (result) {
                callback(result);
            } else {
                callback({});
            }
        });
    } else {
        callback({});
    }
};

exports.getOrderListByClient = function (clientId, callback) {
    var clientIdOk = manager.securityCheck(clientId);
    if (clientIdOk) {
        db.getOrderListByClient(clientId, callback);
    } else {
        callback([]);
    }

};


exports.getOrderListByCustomer = function (clientId, customerId, callback) {
    var clientIdOk = manager.securityCheck(clientId);
    var customerIdIdOk = manager.securityCheck(customerId);
    if (clientIdOk && customerIdIdOk) {
        db.getOrderListByCustomer(clientId, customerId, callback);
    } else {
        callback([]);
    }
};


exports.deleteOrder = function (orderId, clientId, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var orderIdOk = manager.securityCheck(orderId);
    var clientIdOk = manager.securityCheck(clientId);
    if (orderIdOk && clientIdOk) {
        db.deleteOrder(orderId, clientId, function (result) {
            if (result && result.success) {
                returnVal.success = result.success;
                callback(returnVal);
            } else {
                returnVal.message = "Error deleting customer";
                callback(returnVal);
            }
        });
    } else {
        callback({});
    }
};
