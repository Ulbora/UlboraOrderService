/*     
 Copyright (C) 2016 Ulbora Labs LLC. (www.ulboralabs.com)
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


exports.addPackage = function (json, callback) {
    var returnVal = {
        success: false,
        id: null,
        clientId: null,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    if (isOk) {
        db.addPackage(json, function (result) {
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


exports.updatePackage = function (json, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var isOk = manager.securityCheck(json);
    if (isOk) {
        console.log("update package req in manager: " + JSON.stringify(json));
        if (json.id !== undefined && json.id !== null &&
                json.clientId !== undefined && json.clientId !== null &&
                json.shippedDate !== undefined && json.shippedDate !== null ) {
            db.updatePackage(json, function (result) {
                if (result && result.success) {
                    returnVal.success = result.success;
                    callback(returnVal);
                } else {
                    returnVal.message = "Error updating order package";
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


exports.getPackageOrderDetails = function (json, callback) {
    var jsonOk = manager.securityCheck(json);   
    if (jsonOk) {
        db.getPackageOrderDetails(json, function (result) {
            if (result) {
                callback(result);
            } else {
                callback([]);
            }
        });
    } else {
        callback([]);
    }
};

exports.deletePackage = function (id, clientId, callback) {
    var returnVal = {
        success: false,
        message: ""
    };
    var idOk = manager.securityCheck(id);
    var clientIdOk = manager.securityCheck(clientId);
    if (idOk && clientIdOk) {
        db.deletePackage(id, clientId, function (result) {
            if (result && result.success) {
                returnVal.success = result.success;
                callback(returnVal);
            } else {
                returnVal.message = "Error deleting package";
                callback(returnVal);
            }
        });
    } else {
        callback({});
    }
};
