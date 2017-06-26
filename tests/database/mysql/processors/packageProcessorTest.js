var assert = require('assert');
var crud = require("../../../../database/mysql/crud/mysqlCrud");
var ordersProcessor = require("../../../../database/mysql/processors/ordersProcessor");
var packageProcessor = require("../../../../database/mysql/processors/packageProcessor");

var orderId;
var clientId = 3845;
var packageId;
var packageCount = 0;
describe('PackageProcessor', function () {
    this.timeout(6000);
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            crud.connect("localhost", "admin", "admin", "ulbora_order_service", 5);
            crud.testConnection(function (success) {
                if (success) {
                    ordersProcessor.init(crud);
                    packageProcessor.init(crud);
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
                        packageId = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });


    describe('#updatePackage()', function () {
        it('should update a package in Processor', function (done) {
            var d = new Date();
            var json = {
                shippedDate: d,
                tracking: "12355555",
                shippingAddressId: 10,
                packageNumber: packageCount,                
                shippingCost: 10.95,               
                comment: "added tracking",
                id: packageId,
                clientId: clientId
            };
            setTimeout(function () {
                packageProcessor.updatePackage(null, json, function (result) {
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
                shippingCost: 1.95,               
                comment: "",
                orderId: orderId,
                clientId: clientId
            };
            setTimeout(function () {
                packageProcessor.addPackage(null, json, function (result) {
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

    


    describe('#getPackage()', function () {
        it('should get a package in processor', function (done) {
            setTimeout(function () {
                packageProcessor.getPackage(packageId, clientId, function (result) {
                    console.log("package: " + JSON.stringify(result));
                    if (result.id && result.packageNumber === 1 && result.shippingCost === 10.95) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });


    describe('#getPackageListByOrder()', function () {
        it('should get package list by order in processor', function (done) {
            setTimeout(function () {
                var json = {
                    orderId: orderId,
                    clientId: clientId
                };
                packageProcessor.getPackageListByOrder(json, function (result) {
                    console.log("package list: " + JSON.stringify(result));
                    if (result.length === 2 && result[1].packageNumber === 2 && result[1].shippingCost === 1.95) {
                        assert(true);
                    } else {
                        assert(false);
                    }

                    done();
                });
            }, 1000);
        });
    });




    describe('#deletePackage()', function () {
        it('should delete package in processor', function (done) {
            setTimeout(function () {
                packageProcessor.deletePackage(null, packageId, clientId, function (result) {
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

