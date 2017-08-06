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

var orderManager = require("../managers/orderManager");
var constants = require("../constants/constants");
var oauth2 = require("ulbora-oauth2");
var validationUrl = process.env.OAUTH2_VALIDATION_URI || constants.OAUTH2_VALIDATION_URI;

var db;

exports.init = function (database) {
    db = database;
    orderManager.init(db);
};

exports.add = function (req, res) {
    if (req.is('application/json')) {
        var me = {
            role: "admin",
            uri: "/rs/order/add",
            scope: "write"
        };
        oauth2.authorize(req, res, me, validationUrl, function () {
            var reqBody = req.body;
            reqBody.clientId = req.header("clientId");
            var bodyJson = JSON.stringify(reqBody);
            console.log("body: " + bodyJson);
            orderManager.addOrder(reqBody, function (result) {
                res.send(result);
            });
        });
    } else {
        res.status(415);
        res.send({success: false});
    }
};

exports.update = function (req, res) {
    if (req.is('application/json')) {
        var me = {
            role: "admin",
            uri: "/rs/order/update",
            scope: "write"
        };
        oauth2.authorize(req, res, me, validationUrl, function () {
            var reqBody = req.body;
            reqBody.clientId = req.header("clientId");
            var bodyJson = JSON.stringify(reqBody);
            console.log("body: " + bodyJson);
            orderManager.updateOrder(reqBody, function (result) {
                res.send(result);
            });

        });
    } else {
        res.status(415);
        res.send({success: false});
    }
};


exports.get = function (req, res) {
    console.log("in auth callback");
    var me = {
        role: "user",
        uri: "/rs/order/get",
        scope: "read"
    };
    oauth2.authorize(req, res, me, validationUrl, function () {
        var id = req.params.id;
        var clientId = req.header("clientId");
        if (id !== null && id !== undefined && clientId !== null && clientId !== undefined) {
            orderManager.getOrder(id, clientId, function (result) {
                res.send(result);
            });
        } else {
            res.send({});
        }
    });
};


exports.listByClient = function (req, res) {
    console.log("in auth callback");
    var me = {
        role: "user",
        uri: "/rs/order/list",
        scope: "read"
    };
    oauth2.authorize(req, res, me, validationUrl, function () {
        var clientId = req.header("clientId");
        if (clientId !== null && clientId !== undefined) {
            orderManager.getOrderListByClient(clientId, function (result) {
                res.send(result);
            });
        } else {
            res.send([]);
        }
    });
};


exports.listByCustomer = function (req, res) {
    console.log("in auth callback");
    var me = {
        role: "user",
        uri: "/rs/order/customer/list",
        scope: "read"
    };
    oauth2.authorize(req, res, me, validationUrl, function () {
        var clientId = req.header("clientId");
        var customerId = req.params.customerId;
        if (customerId !== null && customerId !== undefined && clientId !== null && clientId !== undefined) {
            orderManager.getOrderListByCustomer(clientId, customerId, function (result) {
                res.send(result);
            });
        } else {
            res.send([]);
        }
    });
};

exports.delete = function (req, res) {
    console.log("in auth callback");
    var me = {
        role: "admin",
        uri: "/rs/order/delete",
        scope: "write"
    };
    oauth2.authorize(req, res, me, validationUrl, function () {
        var id = req.params.id;
        var clientId = req.header("clientId");
        if (id !== null && id !== undefined && clientId !== null && clientId !== undefined) {
            orderManager.deleteOrder(id, clientId, function (result) {
                res.send(result);
            });
        } else {
            res.send({success: false});
        }
    });
};


