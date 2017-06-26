var assert = require('assert');
var db = require("../../../database/mysql/db");
var crud = require("../../../database/mysql/crud/mysqlCrud");
var productProcessor = require("../../../database/mysql/processors/productProcessor");
var detailsProcessor = require("../../../database/mysql/processors/detailsProcessor");
var optionsProcessor = require("../../../database/mysql/processors/optionsProcessor");
var prodId;
var detailId;
var detailId2;
var clientId = "5584567";
var barCodeId;
var barCodeId2;

describe('mysql DB barcode', function () {
    this.timeout(20000);
    describe('#connect()', function () {
        it('should connect to db and create pool', function (done) {
            db.connect("localhost", "admin", "admin", "ulbora_product_service", 5);
            db.testConnection(function (success) {
                if (success) { 
                    productProcessor.init(crud);
                    detailsProcessor.init(crud);                    
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
                detailsProcessor.addDetail(null, json, function (result) {
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
    
  
    describe('#addOptions()', function () {
        it('should add a options in mysql db', function (done) {
            var json = {
                optionName: "color",
                optionValue: "blue",
                productDetailsId: detailId,
                clientId: clientId
            };
            setTimeout(function () {
                optionsProcessor.addOption(null, json, function (result) {
                    console.log("options: " + JSON.stringify(result));
                    if (result.success) {
                        optionId = result.id;
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
                sku: "001002124578",
                price: 10.56,
                productId: prodId,
                clientId: clientId
            };
            setTimeout(function () {
                detailsProcessor.addDetail(null, json, function (result) {
                    if (result.success) {
                        detailId2 = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    
    describe('#addOptions()', function () {
        it('should add a options in mysql db', function (done) {
            var json = {
                optionName: "color",
                optionValue: "red",
                productDetailsId: detailId2,
                clientId: clientId
            };
            setTimeout(function () {
                optionsProcessor.addOption(null, json, function (result) {
                    console.log("options: " + JSON.stringify(result));
                    if (result.success) {
                        optionId = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });


    describe('#addBarCode()', function () {
        it('should add a bar code in mysql db', function (done) {
            var json = {
                type: "upc",
                code: "15555fff555111",
                productDetailsId: detailId,
                clientId: clientId
            };
            setTimeout(function () {
                db.addBarCode(json, function (result) {
                    console.log("bar code: " + JSON.stringify(result));
                    if (result.success) {
                        barCodeId = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });


    describe('#updateBarCode()', function () {
        it('should update bar code in mysql db', function (done) {
            var json = {
                type: "upc",
                code: "455555fgh555",
                id: barCodeId,
                clientId: clientId
            };
            setTimeout(function () {
                db.updateBarCode(json, function (result) {
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
    
    
    describe('#addBarCode()', function () {
        it('should add a bar code in mysql db', function (done) {
            var json = {
                type: "upc",
                code: "15555fff555888",
                productDetailsId: detailId2,
                clientId: clientId
            };
            setTimeout(function () {
                db.addBarCode(json, function (result) {
                    console.log("bar code: " + JSON.stringify(result));
                    if (result.success) {
                        barCodeId2 = result.id;
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });


    describe('#getBarCode()', function () {
        it('should get a bar code in mysql db', function (done) {
            setTimeout(function () {
                db.getBarCode(barCodeId, clientId, function (result) {
                    console.log("product bar code: " + JSON.stringify(result));
                    if (result.id && result.type === "upc" && result.code === "455555fgh555") {
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);
        });
    });
    
    describe('#addBarCode()', function () {
        it('should add a bar code in mysql db', function (done) {
            var json = {
                type: "upc",
                code: "666GGJ555111",
                productDetailsId: detailId,
                clientId: clientId
            };
            setTimeout(function () {
                db.addBarCode(json, function (result) {
                    console.log("bar code: " + JSON.stringify(result));
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

   

    describe('#getBarCodeListByDetails()', function () {
        it('should get bar code list by details in mysql db', function (done) {
            setTimeout(function () {
                var json = {
                    productDetailsId: detailId,
                    clientId: clientId
                };
                db.getBarCodeListByDetails(json, function (result) {
                    console.log("bar code list: " + JSON.stringify(result));
                    if (result && result.length === 2) {
                        if (result.length === 2 && result[1].type === "upc" && result[1].code === "666GGJ555111") {
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


    describe('#getDetailByBarCode()', function () {
        it('should get details by bar code in mysql db', function (done) {
            setTimeout(function () {
                var json = {                    
                    clientId: clientId,
                    barCodeType: "upc",
                    barCode: "455555fgh555"
                };
                db.getDetailByBarCode(json, function (result) {
                    console.log("product details id : " + detailId);
                    console.log("product id: " + prodId);
                    console.log("product details by bar code: " + JSON.stringify(result));
                    if (result.productDetailsId && result.productDetailsId === detailId && result.productId === prodId && result.sku === "00100212457") {
                        assert(true);
                    } else {
                        assert(false);
                    }

                    done();
                });
            }, 1000);
        });
    });
    
    
    
    describe('#getDetailBySku()', function () {
        it('should get details by sku in mysql db', function (done) {
            setTimeout(function () {
                var json = {                    
                    clientId: clientId,
                    sku: "001002%"
                };
                db.getDetailBySku(json, function (result) {
                    console.log("product details id : " + detailId);
                    console.log("product id: " + prodId);
                    console.log("product details by sku " + JSON.stringify(result));
                    if (result.length > 0 && result[0].productDetailsId && result[0].productDetailsId === detailId && result[0].productId === prodId && result[0].sku === "00100212457") {
                        assert(true);
                    } else {
                        assert(false);
                    }

                    done();
                });
            }, 1000);
        });
    });



    describe('#deleteBarCode()', function () {
        it('should delete bar coe in mysql db', function (done) {
            setTimeout(function () {
                db.deleteBarCode(barCodeId, clientId, function (result) {
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
        it('should delete Product', function (done) {
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

