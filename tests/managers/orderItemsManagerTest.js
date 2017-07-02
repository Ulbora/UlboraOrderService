var assert = require('assert');
var db = require("../../database/db");
var orderManager = require("../../managers/orderManager");
var orderItemsManager = require("../../managers/orderItemsManager");
var orderId;
var orderItemId;
var clientId = "4984756118";

describe('Order Items Manager', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_order_service", 5);
            setTimeout(function () {
                orderManager.init(db);    
                orderItemsManager.init(db);   
                done();
            }, 1000);
        });
    });
        
    
    describe('#addOrder()', function () {
        it('should add an order in db', function (done) {
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
            setTimeout(function () {
                orderManager.addOrder(json, function (result) {
                    if (result.success && result.id) {
                        orderId = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    describe('#getOrder()', function () {
        it('should get order in db', function (done) {
            setTimeout(function () {
                orderManager.getOrder(orderId, clientId, function (result) {
                    console.log("order res: " + JSON.stringify(result));
                    if (result && result.orderItems && result.orderItems.length === 2) {
                        orderItemId = result.orderItems[0].id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    

    describe('#updateOrderItem()', function () {
        it('should update a order item in db', function (done) {
            var json = {
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
            setTimeout(function () {
                orderItemsManager.updateOrderItem(json, function (result) {
                    if (result.success) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });



    describe('#addOrderItem()', function () {
        it('should add a order item in db', function (done) {
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
            setTimeout(function () {
                orderItemsManager.addOrderItem(json, function (result) {
                    if (result.success) {                        
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });




    describe('#getOrder()', function () {
        it('should get order in db', function (done) {
            setTimeout(function () {
                orderManager.getOrder(orderId, clientId, function (result) {
                    console.log("order res: " + JSON.stringify(result));
                    if (result && result.orderItems && result.orderItems.length === 3 && 
                            result.orderItems[2].sku === "0010021457" && result.orderItems[0].retailPrice === 199.95 &&
                            result.orderItems[1].retailPrice === 19.95) {                        
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    

    describe('#deleteOrderItem()', function () {
        it('should delete order item in processor', function (done) {
            setTimeout(function () {
                orderItemsManager.deleteOrderItem(orderItemId, clientId, function (result) {
                    if (result.success) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
            
    
    describe('#getOrder()', function () {
        it('should get order after delete in db', function (done) {
            setTimeout(function () {
                orderManager.getOrder(orderId, clientId, function (result) {
                    console.log("order res: " + JSON.stringify(result));
                    if (result && result.orderItems && result.orderItems.length === 2) {                        
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    describe('#deleteOrder()', function () {
        it('should delete order in db', function (done) {
            setTimeout(function () {
                orderManager.deleteOrder(orderId, clientId, function (result) {
                    if (result.success) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
       

});



