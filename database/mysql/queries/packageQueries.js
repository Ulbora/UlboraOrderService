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

//client   
exports.PACKAGE_INSERT_QUERY = "INSERT INTO package Set ?";

exports.PACKAGE_UPDATE_QUERY = "UPDATE package SET shipped_date = ?, tracking = ?, " +  
                               "shipping_address_id = ?, shipping_cost = ?, comment = ? " +
                               "WHERE id = ? and client_id = ? ";
                       
exports.PACKAGE_GET_BY_ID_QUERY = "SELECT * FROM package WHERE id = ? and client_id = ? ";

exports.PACKAGE_DELETE_QUERY = "DELETE FROM package WHERE id = ?  and client_id = ? ";

exports.PACKAGE_LIST_BY_ORDER_QUERY = "SELECT * FROM package " +
                                      "WHERE order_id = ? " + 
                                      "and client_id = ? ";
                              
exports.PACKAGE_COUNT_BY_ORDER_QUERY = "SELECT count(id) as packageCount FROM package " +
                                       "WHERE order_id = ? " + 
                                       "and client_id = ? ";
                                       
exports.PACKAGE_ORDER_DETAILS_GET_BY_BAR_CODE = "select p.id as package_id, p.shipped_date, p.tracking, p.shipping_address_id, " +
                                                "p.package_number, p.shipping_cost, p.comment as package_comments, " +
                                                "oi.id as order_item_id, oi.product, oi.sku, oi.ordered_qty, " +
                                                "oi.cancel_qty, oi.returned_qty, oi.back_ordered_qty, " +
                                                "oi.retail_price, oi.status as order_item_status, oi.order_type, " + 
                                                "oi.comment as item_comments, " +
                                                "oi.order_id, oi.client_id, o.customer_id, o.billing_address_id, " +
                                                "o.order_date, o.comment as order_comments, o.payment " +
                                                "from package p " +
                                                "inner join package_items pi " +
                                                "on p.id = pi.package_id " +
                                                "inner join order_item oi " +
                                                "on oi.id = pi.order_item_id " +
                                                "inner join orders o " +
                                                "on o.id = oi.order_id " +
                                                "where o.id = ? and o.client_id = ? ";      
                                 
                                     
