var assert = require('assert');
var db = require("../../../database/mysql/db");
var crud = require("../../../database/mysql/crud/mysqlCrud");
var productProcessor = require("../../../database/mysql/processors/productProcessor");
var optionsProcessor = require("../../../database/mysql/processors/optionsProcessor");
var prodId;
var clientId = "5584567";
var detailId;

describe('mysql DB details', function () {
    this.timeout(20000);
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_product_service", 5);
            db.testConnection(function (success) {
                if (success) { 
                    productProcessor.init(crud);                               
                    optionsProcessor.init(crud);
                    assert(true);
                } else {
                    assert(false);
                }
                done();
            });
        });
    });
    
    
    describe('#addProduct()', function () {
        it('should add a Product in mysql db', function (done) {
            var json = {
                clientId: clientId,
                productName: "Hat",
                brand: "Nike",
                mfnId: 1,
                model: "123_hat",
                description: "A black Cap",
                overview: '111djfjoiqjldktrtryrtyrytrsflkdfjdskdsoidsljdsjdsljdlsjfljsdlfjdlsfdsjfdslfkdsjffld',
                specifications: '111djfjoiqjldktrtryrtyrytrsflkdfjdskdsoidsljdsjdsljdlsjfljsdlfjdlsfdsjfdslfkdsjff'

            };
            setTimeout(function () {
                productProcessor.addProduct(null, json, function (result) {
                    if (result.success) {
                        prodId = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    describe('#addDetail()', function () {
        it('should add a Detail in mysql db', function (done) {
            var json = {
                sku: "00100212457",
                price: 8.56,
                productId: prodId,
                clientId: clientId
            };
            setTimeout(function () {
                db.addDetail(json, function (result) {
                    if (result.success) {
                        detailId = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    describe('#updateDetail()', function () {
        it('should update a Detail in mysql db', function (done) {
            var json = {
                sku: "00100312457",
                price: 9.56,
                id: detailId,
                clientId: clientId
            };
            setTimeout(function () {
                db.updateDetail(json, function (result) {
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

    
    describe('#getDetail()', function () {
        it('should get a product detail in mysql db', function (done) {
            setTimeout(function () {
                db.getDetail(detailId, clientId, function (result) {
                    console.log("product detail: " + JSON.stringify(result));
                    if (result.id && result.price === 9.56) {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    describe('#addDetail()', function () {
        it('should add a Detail in Processor', function (done) {
            var json = {
                sku: "00100215000",
                price: 20.00,
                productId: prodId,
                clientId: clientId
            };
            setTimeout(function () {
                db.addDetail(json, function (result) {
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
    
    
    describe('#getDetailByProduct()', function () {
        it('should get detail list by product in processor', function (done) {
            setTimeout(function () {
                var json = {
                productId: prodId,                
                clientId: clientId
            };
                db.getDetailListByProduct(json, function (result) {
                    console.log("product detail list: " + JSON.stringify(result));
                    if (result && result.length === 2) {
                        if (result[1].sku === "00100215000" && result[1].price === 20.00) {
                            assert(true);
                        } else {
                            assert(false);
                        }
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });

    
    describe('#getDetailBySku()', function () {
        it('should get details by sku in processor', function (done) {
            setTimeout(function () {
                var json = {                    
                    clientId: clientId,
                    sku: "001003%"
                };
                db.getDetailBySku(json, function (result) {
                    console.log("product details id : " + detailId);
                    console.log("product id: " + prodId);
                    console.log("product details by sku " + JSON.stringify(result));
                    if (result.length > 0 && result[0].productDetailsId && result[0].productDetailsId === detailId && result[0].productId === prodId && result[0].sku === "00100312457") {                        
                        assert(true);
                    } else {
                        assert(false);
                    }

                    done();
                });
            }, 1000);
        });
    });
    
    describe('#deleteDetails()', function () {
        it('should delete product details in processor', function (done) {
            setTimeout(function () {
                db.deleteDetail(detailId, clientId, function (result) {
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
    
     describe('#deleteProduct()', function () {
        it('should delete Product in mysql db', function (done) {
            setTimeout(function () {
                productProcessor.deleteProduct(null, prodId, clientId, function (result) {
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

