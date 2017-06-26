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

var crud = require("./crud/mysqlCrud");
var barCodeProcessor = require("./processors/barCodeProcessor");
var detailsProcessor = require("./processors/detailsProcessor");
var optionsProcessor = require("./processors/optionsProcessor");
var productProcessor = require("./processors/productProcessor");

exports.connect = function (host, user, pw, db, cpnum) {
    crud.connect(host, user, pw, db, cpnum);
    barCodeProcessor.init(crud);
    detailsProcessor.init(crud);
    optionsProcessor.init(crud);
    productProcessor.init(crud);
};
// for testing only
exports.testConnection = function (callback) {
    crud.testConnection(callback);
};

// for testing only
exports.getConnection = function (callback) {
    crud.getConnection(callback);
};

exports.addBarCode = function (json, callback) {
    barCodeProcessor.addBarCode(null, json, callback);
};

exports.updateBarCode = function (json, callback) {
    barCodeProcessor.updateBarCode(null, json, callback);
};

exports.getBarCode = function (id, clientId, callback) {
    barCodeProcessor.getBarCode(id, clientId, callback);
};

exports.getBarCodeListByDetails = function (json, callback) {
    barCodeProcessor.getBarCodeListByDetails(json, callback);
};

exports.deleteBarCode = function (id, clientId, callback) {
    barCodeProcessor.deleteBarCode(null, id, clientId, callback);
};


exports.getDetailByBarCode = function (json, callback) {
    detailsProcessor.getDetailByBarCode(json, callback);
};

exports.getDetailBySku = function (json, callback) {
    detailsProcessor.getDetailBySku(json, callback);
};

exports.addDetail = function (json, callback) {
    detailsProcessor.addDetail(null, json, callback);
};

exports.updateDetail = function (json, callback) {
    detailsProcessor.updateDetail(null, json, callback);
};

exports.getDetail = function (id, clientId, callback) {
    detailsProcessor.getDetail(id, clientId, callback);
};

exports.getDetailListByProduct = function (json, callback) {
    detailsProcessor.getDetailListByProduct(json, callback);
};

exports.deleteDetail = function (id, clientId, callback) {
    detailsProcessor.deleteDetail(null, id, clientId, callback);
};

exports.addOption = function (json, callback) {
    optionsProcessor.addOption(null, json, callback);
};

exports.updateOption = function (json, callback) {
    optionsProcessor.updateOption(null, json, callback);
};

exports.getOption = function (id, clientId, callback) {
    optionsProcessor.getOption(id, clientId, callback);
};

exports.getOptionListByDetails = function (json, callback) {
    optionsProcessor.getOptionListByDetails(json, callback);
};

exports.searchByOptionName = function (json, callback) {
    optionsProcessor.searchByOptionName(json, callback);
};

exports.deleteOption = function (id, clientId, callback) {
    optionsProcessor.deleteOption(null, id, clientId, callback);
};

exports.addProduct = function (json, callback) {
    productProcessor.addProduct(null, json, callback);
};

exports.updateProduct = function (json, callback) {
    productProcessor.updateProduct(null, json, callback);
};

exports.getProduct = function (id, clientId, callback) {
    productProcessor.getProduct(id, clientId, callback);
};

exports.deleteProduct = function (id, clientId, callback) {
    productProcessor.deleteProduct(null, id, clientId, callback);
};

