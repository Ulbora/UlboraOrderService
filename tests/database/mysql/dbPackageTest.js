var assert = require('assert');
var db = require("../../../database/mysql/db");
//var crud = require("../../../database/mysql/crud/mysqlCrud");
var orderId;
var item1;
var item2;
var item3;
var packageId1;
var packageId2;
var clientId = "5584556116";

describe('mysql DB package', function () {
    this.timeout(20000);
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_order_service", 5);
            db.testConnection(function (success) {
                if (success) {
                    assert(true);
                } else {
                    assert(false);
                }
                done();
            });
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
            setTimeout(function () {
                db.addOrder(json, function (result) {
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
                db.getOrder(orderId, clientId, function (result) {
                    console.log("order res: " + JSON.stringify(result));
                    if (result && result.orderItems && result.orderItems.length === 3) {
                        item1 = result.orderItems[0].id;
                        item2 = result.orderItems[1].id;
                        item3 = result.orderItems[2].id;
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
        it('should add a package in db', function (done) {           
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
            setTimeout(function () {
                db.addPackage(json, function (result) {
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
    
    
    describe('#updatePackage()', function () {
        it('should update a package in db', function (done) {
            var d = new Date();
            var json = {
                shippedDate: d,
                tracking: "12355555",
                shippingAddressId: 10,                              
                shippingCost: 15.95,               
                comment: "added tracking",
                id: packageId1,
                clientId: clientId
            };
            setTimeout(function () {
                db.updatePackage(json, function (result) {
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
    
    
    describe('#addPackage()', function () {
        it('should add a second package in db', function (done) {           
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
            setTimeout(function () {
                db.addPackage(json, function (result) {
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
    
    
    describe('#getPackageOrderDetails()', function () {
        it('should get package details by order in db', function (done) {
            setTimeout(function () {
                var json = {
                    orderId: orderId,
                    clientId: clientId
                };
                db.getPackageOrderDetails(json, function (result) {
                    console.log("package details: " + JSON.stringify(result));
                    if (result.length === 3 && result[1].packageNumber === 2 && result[1].sku === "0010021456" &&
                           result[1].orderedQty === 1 &&  result[0].shippingCost === 15.95) {
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
        it('should delete package in db', function (done) {
            setTimeout(function () {
                db.deletePackage(packageId1, clientId, function (result) {
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
        it('should get package details by order after delete in db', function (done) {
            setTimeout(function () {
                var json = {
                    orderId: orderId,
                    clientId: clientId
                };
                db.getPackageOrderDetails(json, function (result) {
                    console.log("package details: " + JSON.stringify(result));
                    if (result.length === 2 && result[0].packageNumber === 2 && result[0].sku === "0010021456" &&
                           result[0].orderedQty === 1) {
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
                db.deleteOrder(orderId, clientId, function (result) {
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

