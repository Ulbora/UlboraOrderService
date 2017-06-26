var assert = require('assert');
var crud = require("../../../../database/mysql/crud/mysqlCrud");
var ordersProcessor = require("../../../../database/mysql/processors/ordersProcessor");

var orderId;
var clientId = 3842;
describe('OrdersProcessor', function () {
    this.timeout(6000);
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            crud.connect("localhost", "admin", "admin", "ulbora_order_service", 5);
            crud.testConnection(function (success) {
                if (success) {
                    ordersProcessor.init(crud);
                    assert(true);
                } else {
                    assert(false);
                }
                done();
            });
        });
    });


    describe('#addOrder()', function () {
        it('should add an order in Processor', function (done) {
            var d = new Date();
            var json = {
                clientId: clientId,
                customerId: 45,
                billingAddressId: 20,
                orderDate: d,
                comment: "",
                payment: ""
            };
            setTimeout(function () {
                ordersProcessor.addOrder(null, json, function (result) {
                    if (result.success) {
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
        it('should update order in processor', function (done) {
            var json = {
                clientId: clientId,  
                id: orderId,
                billingAddressId: 20,                
                comment: "updated order",
                payment: "online"
            };
            setTimeout(function () {
                ordersProcessor.updateOrder(null, json, function (result) {
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
        it('should get order in processor', function (done) {
            setTimeout(function () {
                ordersProcessor.getOrder(orderId, clientId, function (result) {
                    if (result && result.billingAddressId === 20 && result.comment === "updated order" &&
                            result.payment === "online") {
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
        it('should get order list by client in processor', function (done) {
            setTimeout(function () {
                ordersProcessor.getOrderListByClient(clientId, function (result) {
                    if (result && result.length === 1) {
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
        it('should get order list by customer in processor', function (done) {
            setTimeout(function () {
                ordersProcessor.getOrderListByCustomer(clientId, 45, function (result) {
                    if (result && result.length === 1) {
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
        it('should delete order in processor', function (done) {
            setTimeout(function () {
                ordersProcessor.deleteOrder(null, orderId, clientId, function (result) {
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

