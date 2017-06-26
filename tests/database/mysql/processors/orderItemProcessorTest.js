var assert = require('assert');
var crud = require("../../../../database/mysql/crud/mysqlCrud");
var ordersProcessor = require("../../../../database/mysql/processors/ordersProcessor");
var orderItemProcessor = require("../../../../database/mysql/processors/orderItemProcessor");

var orderId;
var clientId = 3845;
var orderItemId;
describe('OrderItemProcessor', function () {
    this.timeout(6000);
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            crud.connect("localhost", "admin", "admin", "ulbora_order_service", 5);
            crud.testConnection(function (success) {
                if (success) {
                    ordersProcessor.init(crud);
                    orderItemProcessor.init(crud);
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

    describe('#addOrderItem()', function () {
        it('should add a order item in Processor', function (done) {
            var json = {
                product: 1,
                sku: "0010021455",
                orderedQty: 1,
                cancelQty: 0,
                returnedQty: 0,
                backOrderedQty: 0,
                retailPrice: 19.95,
                status: "ordered",
                orderType: "online",
                comment: "",
                orderId: orderId,
                clientId: clientId
            };
            setTimeout(function () {
                orderItemProcessor.addOrderItem(null, json, function (result) {
                    if (result.success) {
                        orderItemId = result.id;
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
        it('should update a order item in Processor', function (done) {
            var json = {
                orderedQty: 2,
                cancelQty: 0,
                returnedQty: 0,
                backOrderedQty: 1,
                retailPrice: 19.95,
                status: "ordered",
                orderType: "online",
                comment: "",
                orderId: orderItemId,
                clientId: clientId
            };
            setTimeout(function () {
                orderItemProcessor.updateOrderItem(null, json, function (result) {
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


    describe('#getOrderItem()', function () {
        it('should get a order item in processor', function (done) {
            setTimeout(function () {
                orderItemProcessor.getOrderItem(orderItemId, clientId, function (result) {
                    console.log("order item: " + JSON.stringify(result));
                    if (result.id && result.orderedQty === 2 && result.backOrderedQty === 1) {
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
        it('should add order item in Processor', function (done) {
            var json = {
                product: 5,
                sku: "0010021457",
                orderedQty: 5,
                cancelQty: 0,
                returnedQty: 0,
                backOrderedQty: 0,
                retailPrice: 9.95,
                status: "ordered",
                orderType: "online",
                comment: "",
                orderId: orderId,
                clientId: clientId
            };
            setTimeout(function () {
                orderItemProcessor.addOrderItem(null, json, function (result) {
                    if (result.success) {
                        orderItemId = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });







    describe('#getOrderItemListByOrder()', function () {
        it('should get order item list by order in processor', function (done) {
            setTimeout(function () {
                var json = {
                    orderId: orderId,
                    clientId: clientId
                };
                orderItemProcessor.getOrderItemListByOrder(json, function (result) {
                    console.log("order item list: " + JSON.stringify(result));
                    if (result.length === 2 && result[1].product === 5 && result[1].sku === "0010021457" &&
                           result[1].orderedQty === 5) {
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
                orderItemProcessor.deleteOrderItem(null, orderItemId, clientId, function (result) {
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

