/*     
 Copyright (C) 2016 Ulbora Labs Inc. (www.ulboralabs.com)
 All rights reserved.
 
 Copyright (C) 2016 Ken Williamson
 All rights reserved.
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published
 by the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var db = require("./mysql/db");

exports.connectDb = function (conf) {
    var host;
    if(process.env.MYSQL_PORT_3306_TCP_ADDR){
        host = process.env.MYSQL_PORT_3306_TCP_ADDR;
    }else{
        host = process.env.DATABASE_HOST || conf.DATABASE_HOST;
    }            
    var user = process.env.DATABASE_USER_NAME || conf.DATABASE_USER_NAME;
    var pw = process.env.DATABASE_USER_PASSWORD || conf.DATABASE_USER_PASSWORD;
    var database = process.env.DATABASE_NAME || conf.DATABASE_NAME;
    var conPoolSize = process.env.DATABASE_POOL_SIZE || conf.DATABASE_POOL_SIZE;
    db.connect(host, user, pw, database, conPoolSize);
};

exports.connect = function (host, user, pw, database, cpnum) {
    db.connect(host, user, pw, database, cpnum);
};


exports.addBarCode = function (json, callback) {
    db.addBarCode(json, callback);
};


exports.updateBarCode = function (json, callback) {
    db.updateBarCode(json, callback);
};

exports.getBarCode = function (id, clientId, callback) {
    db.getBarCode(id, clientId, callback);
};

exports.getBarCodeListByDetails = function (json, callback) {
    db.getBarCodeListByDetails(json, callback);
};

exports.deleteBarCode = function (id, clientId, callback) {
    db.deleteBarCode(id, clientId, callback);
};



exports.getDetailByBarCode = function (json, callback) {
    db.getDetailByBarCode(json, callback);
};

exports.getDetailBySku = function (json, callback) {
    db.getDetailBySku(json, callback);
};

exports.addDetail = function (json, callback) {
    db.addDetail(json, callback);
};

exports.updateDetail = function (json, callback) {
    db.updateDetail(json, callback);
};

exports.getDetail = function (id, clientId, callback) {
    db.getDetail(id, clientId, callback);
};

exports.getDetailListByProduct = function (json, callback) {
    db.getDetailListByProduct(json, callback);
};

exports.deleteDetail = function (id, clientId, callback) {
    db.deleteDetail(id, clientId, callback);
};


exports.addOption = function (json, callback) {
    db.addOption(json, callback);
};

exports.updateOption = function (json, callback) {
    db.updateOption(json, callback);
};

exports.getOption = function (id, clientId, callback) {
    db.getOption(id, clientId, callback);
};

exports.getOptionListByDetails = function (json, callback) {
    db.getOptionListByDetails(json, callback);
};

exports.searchByOptionName = function (json, callback) {
    db.searchByOptionName(json, callback);
};

exports.deleteOption = function (id, clientId, callback) {
    db.deleteOption(id, clientId, callback);
};


exports.addProduct = function (json, callback) {
    db.addProduct(json, callback);
};

exports.updateProduct = function (json, callback) {
    db.updateProduct(json, callback);
};

exports.getProduct = function (id, clientId, callback) {
    db.getProduct(id, clientId, callback);
};

exports.deleteProduct = function (id, clientId, callback) {
    db.deleteProduct(id, clientId, callback);
};

