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

var crud = require("./crud/mysqlCrud");
var ordersProcessor = require("./processors/ordersProcessor");
var orderItemProcessor = require("./processors/orderItemProcessor");
var packageProcessor = require("./processors/packageProcessor");
var packageItemsProcessor = require("./processors/packageItemsProcessor");

exports.connect = function (host, user, pw, db, cpnum) {
    crud.connect(host, user, pw, db, cpnum);
    ordersProcessor.init(crud);
    orderItemProcessor.init(crud);
    packageProcessor.init(crud);
    packageItemsProcessor.init(crud);
};
// for testing only
exports.testConnection = function (callback) {
    crud.testConnection(callback);
};

// for testing only
exports.getConnection = function (callback) {
    crud.getConnection(callback);
};

exports.addOrder = function (json, callback) {
    var rtn = {
        success: false,
        message: null
    };
    if (json.clientId && json.customerId && json.orderItems && json.orderItems.length > 0) {
        crud.getConnection(function (err, con) {
            if (!err && con) {
                con.beginTransaction(function (err) {
                    if (!err) {
                        var orderItems = json.orderItems;
                        delete json.orderItems;
                        json.orderDate = new Date();
                        ordersProcessor.addOrder(con, json, function (orderRes) {
                            if (orderRes.success) {
                                var len = orderItems.length;
                                var itemsAdded = 0;
                                for (var cnt = 0; cnt < orderItems.length; cnt++) {
                                    var item = orderItems[cnt];
                                    item.orderId = orderRes.id;
                                    item.clientId = json.clientId;
                                    orderItemProcessor.addOrderItem(con, item, function (itemRes) {
                                        if (itemRes.success) {
                                            itemsAdded++;
                                            if (len === itemsAdded) {
                                                con.commit(function (err) {
                                                    if (err) {
                                                        con.rollback();
                                                    } else {
                                                        rtn.success = true;
                                                        rtn.clientId = json.clientId;
                                                        rtn.id = orderRes.id;
                                                    }
                                                    con.release();
                                                    callback(rtn);
                                                });
                                            }
                                        } else {
                                            con.rollback();
                                            con.release();
                                            rtn.message = "failed to add order item";
                                            callback(rtn);
                                        }
                                    });
                                }
                            } else {
                                con.rollback();
                                con.release();
                                rtn.message = "failed to add order";
                                callback(rtn);
                            }
                        });
                    } else {
                        con.release();
                        callback(rtn);
                    }
                });
            } else {
                if (con) {
                    con.release();
                }
                callback(rtn);
            }
        });
    } else {
        rtn.message = "No items added";
        callback(rtn);
    }
};

exports.getOrder = function (id, clientId, callback) {
    ordersProcessor.getOrder(id, clientId, function (orderRes) {
        if (orderRes && orderRes.id) {
            var json = {
                orderId: id,
                clientId: clientId
            };
            orderItemProcessor.getOrderItemListByOrder(json, function (itemsRes) {
                if (itemsRes) {
                    orderRes.orderItems = itemsRes;
                    callback(orderRes);
                } else {
                    callback({});
                }
            });
        } else {
            callback({});
        }
    });
};


exports.getOrderListByClient = function (clientId, callback) {
    ordersProcessor.getOrderListByClient(clientId, callback);
};

exports.getOrderListByCustomer = function (clientId, customerId, callback) {
    ordersProcessor.getOrderListByCustomer(clientId, customerId, callback);
};


exports.updateOrder = function (json, callback) {
    ordersProcessor.updateOrder(null, json, callback);
};

exports.deleteOrder = function (orderId, clientId, callback) {
    ordersProcessor.deleteOrder(null, orderId, clientId, callback);
};

exports.addOrderItem = function (json, callback) {
    orderItemProcessor.addOrderItem(null, json, callback);
};

exports.updateOrderItem = function (json, callback) {
    orderItemProcessor.updateOrderItem(null, json, callback);
};

exports.deleteOrderItem = function (id, clientId, callback) {
    orderItemProcessor.deleteOrderItem(null, id, clientId, callback);
};

exports.addPackage = function (json, callback) {
    var rtn = {
        success: false,
        message: null
    };
    if (json.clientId && json.orderId && json.packageItems && json.packageItems.length > 0) {
        crud.getConnection(function (err, con) {
            if (!err && con) {
                con.beginTransaction(function (err) {
                    if (!err) {
                        var packageItems = json.packageItems;
                        delete json.packageItems;
                        json.orderDate = new Date();
                        var packageCount = 0;
                        packageProcessor.getPackageCountByOrder(json.orderId, json.clientId, function (cntRes) {
                            if (cntRes.packageCount !== undefined && cntRes.packageCount !== null) {
                                packageCount = cntRes.packageCount;
                            }
                            packageCount++;
                            json.packageNumber = packageCount;
                            json.shippedDate = new Date();
                            packageProcessor.addPackage(con, json, function (pkgRes) {
                                if (pkgRes.success) {
                                    var len = packageItems.length;
                                    var itemsAdded = 0;
                                    for (var cnt = 0; cnt < packageItems.length; cnt++) {
                                        var item = packageItems[cnt];                                        
                                        item.packageId = pkgRes.id;
                                        packageItemsProcessor.addPackageItems(con, item, function (itemRes) {
                                            if (itemRes.success) {
                                                itemsAdded++;
                                                if (len === itemsAdded) {
                                                    con.commit(function (err) {
                                                        if (err) {
                                                            con.rollback();
                                                        } else {
                                                            rtn.success = true;
                                                            rtn.clientId = json.clientId;
                                                            rtn.id = pkgRes.id;
                                                        }
                                                        con.release();
                                                        callback(rtn);
                                                    });
                                                }
                                            } else {
                                                con.rollback();
                                                con.release();
                                                rtn.message = "failed to add package item";
                                                callback(rtn);
                                            }
                                        });
                                    }
                                } else {
                                    con.rollback();
                                    con.release();
                                    rtn.message = "failed to add package";
                                    callback(rtn);
                                }
                            });
                        });
                    } else {
                        con.release();
                        callback(rtn);
                    }
                });
            } else {
                if (con) {
                    con.release();
                }
                callback(rtn);
            }
        });
    } else {
        rtn.message = "No package added";
        callback(rtn);
    }
};
exports.updatePackage = function (json, callback) {
    packageProcessor.updatePackage(null, json, callback);
};

exports.getPackageOrderDetails = function (json, callback) {
    packageProcessor.getPackageOrderDetails(json, callback);
};

exports.deletePackage = function (id, clientId,  callback) {
    packageProcessor.deletePackage(null, id, clientId,  callback);
};