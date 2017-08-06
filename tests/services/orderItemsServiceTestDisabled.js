var assert = require('assert');
var db = require("../../database/db");
var orderService = require("../../services/orderService");
var orderItemsService = require("../../services/orderItemsService");
var tokenFile = require("./token");
// for this tests to pass, the tokenFile needs to be updated with a new token 
var token = tokenFile.token;
var orderId;
var orderItemId;
var clientId = "64544364543";
describe('orderItemsService', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_order_service", 5);
            setTimeout(function () {
                orderService.init(db);
                orderItemsService.init(db);
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
                    comment: ""
                };
                var itemJson2 = {
                    product: 2,
                    sku: "0010021456",
                    orderedQty: 1,
                    cancelQty: 0,
                    returnedQty: 0,
                    backOrderedQty: 0,
                    retailPrice: 19.95,
                    status: "ordered",
                    orderType: "online",
                    comment: ""
                };
                var items = [];
                items.push(itemJson1);
                items.push(itemJson2);
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
                    } else if (val && val.orderItems && val.orderItems.length === 2) {
                        orderItemId = val.orderItems[0].id;
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




    describe('#update()', function () {
        it('should update a order item', function (done) {
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
                req.body = {
                    orderedQty: 2,
                    cancelQty: 0,
                    returnedQty: 0,
                    backOrderedQty: 1,
                    retailPrice: 199.95,
                    status: "ordered",
                    orderType: "online",
                    comment: "",
                    id: orderItemId,
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
                        console.log("update order response: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                orderItemsService.update(req, res);
            }, 1000);
        });
    });


    describe('#add()', function () {
        it('should add a order item', function (done) {
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
                    product: 1,
                    sku: "0010021457",
                    orderedQty: 1,
                    cancelQty: 0,
                    returnedQty: 0,
                    backOrderedQty: 0,
                    retailPrice: 7.95,
                    status: "ordered",
                    orderType: "online",
                    comment: "",
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
                    } else if (val && val.id) {                        
                        console.log("add order item response: " + JSON.stringify(val));
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                };
                orderItemsService.add(req, res);
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
                    } else if (val && val.orderItems && val.orderItems.length === 3 && 
                            val.orderItems[2].sku === "0010021457" && val.orderItems[0].retailPrice === 199.95 &&
                            val.orderItems[1].retailPrice === 19.95) {                        
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
                req.params.id = orderItemId;
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
                orderItemsService.delete(req, res);
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
                    } else if (val && val.orderItems && val.orderItems.length === 2 && 
                            val.orderItems[1].sku === "0010021457" &&
                            val.orderItems[0].retailPrice === 19.95) {                        
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


