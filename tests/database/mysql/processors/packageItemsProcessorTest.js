var assert = require('assert');
var crud = require("../../../../database/mysql/crud/mysqlCrud");
var ordersProcessor = require("../../../../database/mysql/processors/ordersProcessor");
var packageProcessor = require("../../../../database/mysql/processors/packageProcessor");
var orderItemProcessor = require("../../../../database/mysql/processors/orderItemProcessor");
var packageItemsProcessor = require("../../../../database/mysql/processors/packageItemsProcessor");

var orderId;
var clientId = 3845;
var packageId1;
var packageId2;
var packageCount = 0;
var orderItemId1;
var orderItemId2;
var orderItemId3;
var orderItemId4;
describe('PackageItemsProcessor', function () {
    this.timeout(6000);
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            crud.connect("localhost", "admin", "admin", "ulbora_order_service", 5);
            crud.testConnection(function (success) {
                if (success) {
                    ordersProcessor.init(crud);
                    packageProcessor.init(crud);
                    orderItemProcessor.init(crud);
                    packageItemsProcessor.init(crud);
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
                        orderItemId1 = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });

    
    describe('#getPackageCountByOrder()', function () {
        it('should get package count by order in processor', function (done) {
            setTimeout(function () {
                packageProcessor.getPackageCountByOrder(orderId, clientId, function (result) {
                    console.log("package count: " + JSON.stringify(result));
                    if (result.packageCount !== undefined && result.packageCount !== null) {
                        packageCount = result.packageCount;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    describe('#addPackage()', function () {
        it('should add a package in Processor', function (done) {
            var d = new Date();
            packageCount++;
            var json = {
                shippedDate: d,
                tracking: "",
                shippingAddressId: 10,
                packageNumber: packageCount,                
                shippingCost: 9.95,               
                comment: "",
                orderId: orderId,
                clientId: clientId
            };
            setTimeout(function () {
                packageProcessor.addPackage(null, json, function (result) {
                    if (result.success) {
                        packageId1 = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    describe('#addPackageItems()', function () {
        it('should add a package item in Processor', function (done) {
                     
            var json = {
                orderItemId: orderItemId1,
                packageId: packageId1
            };
            setTimeout(function () {
                packageItemsProcessor.addPackageItems(null, json, function (result) {
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
        it('should add a order item in Processor', function (done) {
            var json = {
                product: 1,
                sku: "0010021457",
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
                        orderItemId2 = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    
    describe('#getPackageCountByOrder()', function () {
        it('should get package count by order in processor', function (done) {
            setTimeout(function () {
                packageProcessor.getPackageCountByOrder(orderId, clientId, function (result) {
                    console.log("package count: " + JSON.stringify(result));
                    if (result.packageCount !== undefined && result.packageCount !== null) {
                        packageCount = result.packageCount;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    describe('#addPackage()', function () {
        it('should add a package in Processor', function (done) {
            var d = new Date();
            packageCount++;
            var json = {
                shippedDate: d,
                tracking: "",
                shippingAddressId: 10,
                packageNumber: packageCount,                
                shippingCost: 6.95,               
                comment: "",
                orderId: orderId,
                clientId: clientId
            };
            setTimeout(function () {
                packageProcessor.addPackage(null, json, function (result) {
                    if (result.success) {
                        packageId2 = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    describe('#addPackageItems()', function () {
        it('should add a package item in Processor', function (done) {
                     
            var json = {
                orderItemId: orderItemId2,
                packageId: packageId2
            };
            setTimeout(function () {
                packageItemsProcessor.addPackageItems(null, json, function (result) {
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
        it('should add a order item in Processor', function (done) {
            var json = {
                product: 1,
                sku: "0010021459",
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
                        orderItemId3 = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    describe('#addPackageItems()', function () {
        it('should add a package item in Processor', function (done) {
                     
            var json = {
                orderItemId: orderItemId3,
                packageId: packageId2
            };
            setTimeout(function () {
                packageItemsProcessor.addPackageItems(null, json, function (result) {
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
        it('should add a order item in Processor', function (done) {
            var json = {
                product: 1,
                sku: "0010021467",
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
                        orderItemId4 = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    describe('#addPackageItems()', function () {
        it('should add a package item in Processor', function (done) {
                     
            var json = {
                orderItemId: orderItemId4,
                packageId: packageId2
            };
            setTimeout(function () {
                packageItemsProcessor.addPackageItems(null, json, function (result) {
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
    
    
    describe('#getPackageOrderDetails()', function () {
        it('should get package details by order in processor', function (done) {
            setTimeout(function () {
                var json = {
                    orderId: orderId,
                    clientId: clientId
                };
                packageProcessor.getPackageOrderDetails(json, function (result) {
                    console.log("package details: " + JSON.stringify(result));
                    if (result.length === 4 && result[1].packageNumber === 2 && result[1].sku === "0010021457" &&
                           result[1].orderedQty === 1) {
                        assert(true);
                    } else {
                        assert(false);
                    }

                    done();
                });
            }, 1000);
        });
    });


    describe('#deletePackageItems()', function () {
        it('should delete package items in processor', function (done) {
            setTimeout(function () {
                packageItemsProcessor.deletePackageItems(null, orderItemId1, packageId1, function (result) {
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

