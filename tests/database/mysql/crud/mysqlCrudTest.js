var assert = require('assert');
var db = require("../../../../database/mysql/crud/mysqlCrud");
var orderId;
var clientId = 11233;
describe('MYSQLCrud', function () {
    this.timeout(6000);
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
    
    describe('#insert()', function () {
        it('should insert into db', function (done) {
            var d = new Date();
            var q = "INSERT INTO orders Set ?";     
            //var q = "INSERT INTO `order` (`id`, `customer_id`, `billing_address_id`, `order_date`, `comment`, `client_id`, `payment`) VALUES (NULL, '1', NULL, '2017-06-01 00:00:00', NULL, '11', NULL);"
            var args = {                
                customer_id: 1,                   
                order_date: d,                
                client_id: clientId
                
            };           
            setTimeout(function () {
                db.insert(null, q, args, function (result) {
                    console.log("add order: " + JSON.stringify(result));
                    if (result.id > -1) {
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

    
    
    describe('#update()', function () {
        it('should update row from db', function (done) {
            var q = "UPDATE orders SET billing_address_id = ? WHERE id = ? and client_id = ? ";
            var args = [40, orderId, clientId];
            setTimeout(function () {
                db.update(null, q, args, function (result) {
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
    
    describe('#get()', function () {
        it('should read row from db', function (done) {
            var q = "SELECT * FROM orders WHERE id = ? and client_id = ? ";
            var queryId = [orderId, clientId];
            setTimeout(function () {
                db.get(q, queryId, function (result) {
                    if (result.success && result.data[0].billing_address_id === 40) {                        
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);           
        });
    });
    
    
    describe('#getList()', function () {
        it('should read row from db', function (done) {
            var q = "SELECT * FROM orders";            
            setTimeout(function () {
                db.getList(q, function (result) {
                    if (result.success && result.data.length > 0) {                        
                        assert(true);
                    } else {
                        assert(false);
                    }
                    done();
                });
            }, 1000);           
        });
    });
     
    
   
    describe('#delete()', function () {
        it('should delete row from db', function (done) {
            var q = "DELETE FROM orders WHERE id = ?";
            var queryId = [orderId];
            setTimeout(function () {
                db.delete(null, q, queryId, function (result) {
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

