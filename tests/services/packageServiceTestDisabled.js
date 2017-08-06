var assert = require('assert');
var db = require("../../database/db");
var orderService = require("../../services/orderService");
var packageService = require("../../services/packageService");
var tokenFile = require("./token");
// for this tests to pass, the tokenFile needs to be updated with a new token 
var token = tokenFile.token;
var orderId;
var item1;
var item2;
var item3;
var packageId1;
var packageId2;
var clientId = "645432164543";
describe('packageService', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_order_service", 5);
            setTimeout(function () {
                orderService.init(db);
                packageService.init(db);
                done();
            }, 1000);
        });
    });


    describe('#add()', function () {
        it('should add a order', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                var json = {
                    clientId: clientId,
                    customerId: 45
                };
                var itemJson1 = {
                    product: 1,
                    sku: "0010021455",
                    orderedQty: 1,
                    cancelQty: 0,
                    returnedQty: 0,
                    backOrderedQty: 0,
                    retailPrice: 19.95,
                    status: "ordered",
                    orderType: "online",
                    comment: "Big item"
                };
                var itemJson2 = {
                    product: 2,
                    sku: "0010021456",
                    orderedQty: 1,
                    cancelQty: 0,
                    returnedQty: 0,
                    backOrderedQty: 0,
                    retailPrice: 1.95,
                    status: "ordered",
                    orderType: "online",
                    comment: ""
                };
                var itemJson3 = {
                    product: 2,
                    sku: "0010021457",
                    orderedQty: 1,
                    cancelQty: 0,
                    returnedQty: 0,
                    backOrderedQty: 0,
                    retailPrice: 6.95,
                    status: "ordered",
                    orderType: "online",
                    comment: ""
                };
                var items = [];
                items.push(itemJson1);
                items.push(itemJson2);
                items.push(itemJson3);
                json.orderItems = items;
                req.body = json;
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.id) {
                        orderId = val.id;
                        console.log("add order response: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                orderService.add(req, res);
            }, 1000);
        });
    });



    describe('#get()', function () {
        it('should get a order', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;

                req.params = {};
                req.params.id = orderId;
                req.params.clientId = clientId;
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.orderItems && val.orderItems.length === 3) {
                        item1 = val.orderItems[0].id;
                        item2 = val.orderItems[1].id;
                        item3 = val.orderItems[2].id;
                        console.log("get order res: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                orderService.get(req, res);
            }, 1000);
        });
    });



    describe('#add()', function () {
        it('should add a order package', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                var json = {
                    tracking: "",
                    shippingAddressId: 10,
                    shippingCost: 9.95,
                    comment: "",
                    orderId: orderId,
                    clientId: clientId
                };
                var pkgItems = [];
                var item1Json = {
                    orderItemId: item1
                };
                pkgItems.push(item1Json);

                json.packageItems = pkgItems;
                req.body = json;
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.id) {
                        packageId1 = val.id;
                        console.log("add order package response: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                packageService.add(req, res);
            }, 1000);
        });
    });




    describe('#update()', function () {
        it('should update a order package', function (done) {
            setTimeout(function () {

                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.protocol = "https";
                req.hostname = "abc.com";
                var d = new Date();
                req.body = {
                    shippedDate: d,
                    tracking: "12355555",
                    shippingAddressId: 10,
                    shippingCost: 15.95,
                    comment: "added tracking",
                    id: packageId1,
                    clientId: clientId
                };
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.success) {
                        console.log("update order package response: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                packageService.update(req, res);
            }, 1000);
        });
    });



    describe('#add()', function () {
        it('should add a order package', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                var json = {
                    tracking: "",
                    shippingAddressId: 10,
                    shippingCost: 4.95,
                    comment: "",
                    orderId: orderId,
                    clientId: clientId
                };
                var pkgItems = [];
                var item2Json = {
                    orderItemId: item2
                };
                pkgItems.push(item2Json);

                var item3Json = {
                    orderItemId: item3
                };
                pkgItems.push(item3Json);

                json.packageItems = pkgItems;
                req.body = json;
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.id) {
                        packageId2 = val.id;
                        console.log("add order package response: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                packageService.add(req, res);
            }, 1000);
        });
    });




    describe('#get()', function () {
        it('should get a package', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                var json = {
                    orderId: orderId,
                    clientId: clientId
                };
                req.body = json;
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val.length === 3 && val[1].packageNumber === 2 && val[1].sku === "0010021456" &&
                            val[1].orderedQty === 1 && val[0].shippingCost === 15.95) {
                        console.log("get order by client res: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                packageService.get(req, res);
            }, 1000);
        });
    });



    describe('#delete()', function () {
        it('should delete a package', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.params = {};
                req.params.id = packageId1;
                req.params.clientId = clientId;
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.success) {
                        console.log("delete package reaponse: " + JSON.stringify(val));
                        assert(true);
                    }
                    done();
                };
                packageService.delete(req, res);
            }, 1000);
        });
    });




    describe('#get()', function () {
        it('should get a package ', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                var json = {
                    orderId: orderId,
                    clientId: clientId
                };
                req.body = json;
                req.is = function (val) {
                    if (val === 'application/json') {
                        return true;
                    } else {
                        return false;
                    }
                };
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val.length === 2 && val[0].packageNumber === 2 && val[0].sku === "0010021456" &&
                            val[0].orderedQty === 1) {
                        console.log("get package res: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                packageService.get(req, res);
            }, 1000);
        });
    });


    describe('#delete()', function () {
        it('should delete a order', function (done) {
            setTimeout(function () {
                var req = {};
                var header = function (val) {
                    if (val === "Authorization") {
                        return "Bearer " + token;
                    } else if (val === "userId") {
                        return undefined;
                    } else if (val === "clientId") {
                        return "403";
                    }
                };
                req.header = header;
                req.params = {};
                req.params.id = orderId;
                req.params.clientId = clientId;
                var res = {};
                res.statusCode;
                res.status = function (val) {
                    this.statusCode = val;
                    console.log("res status: " + val);
                };
                res.send = function (val) {
                    if (this.statusCode === 401) {
                        assert(false);
                    } else if (val && val.success) {
                        console.log("delete customer reaponse: " + JSON.stringify(val));
                        assert(true);
                    }
                    done();
                };
                orderService.delete(req, res);
            }, 1000);
        });
    });

});


