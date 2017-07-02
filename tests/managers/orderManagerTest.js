var assert = require('assert');
var db = require("../../database/db");
var orderManager = require("../../managers/orderManager");
var orderId;
var clientId = "4984556118";

describe('Order Manager', function () {
    this.timeout(20000);
    describe('#init()', function () {
        it('should init manager', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_order_service", 5);
            setTimeout(function () {
                orderManager.init(db);                
                done();
            }, 1000);
        });
    });
        
    
    describe('#addOrder()', function () {
        it('should fail to add an order because of no items in db', function (done) {
            var json = {
                clientId: clientId,
                customerId: 45               
            };
            setTimeout(function () {
                orderManager.addOrder(json, function (result) {
                    if (!result.success && result.message === "No items added") {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
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
    
    
    describe('#updateOrder()', function () {
        it('should update order in db', function (done) {
            var json = {
                clientId: clientId,  
                id: orderId,
                billingAddressId: 20,                
                comment: "updated order",
                payment: "online"
            };
            setTimeout(function () {
                orderManager.updateOrder(json, function (result) {
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
                    if (result && result.billingAddressId === 20 && result.comment === "updated order" &&
                            result.payment === "online" && result.orderItems && result.orderItems.length === 2) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    describe('#getOrderListByClient()', function () {
        it('should get order list by client in db', function (done) {
            setTimeout(function () {
                orderManager.getOrderListByClient(clientId, function (result) {
                    console.log("order list by client res: " + JSON.stringify(result));
                    if (result && result.length === 1 && result[0].id === orderId) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    describe('#getOrderListByCustomer()', function () {
        it('should get order list by customer in db', function (done) {
            setTimeout(function () {
                orderManager.getOrderListByCustomer(clientId, 45, function (result) {
                    if (result && result.length === 1 && result[0].id === orderId) {
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



