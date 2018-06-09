/*     
 Copyright (C) 2016 Ulbora Labs LLC. (www.ulboralabs.com)
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
exports.ORDERS_INSERT_QUERY = "INSERT INTO orders Set ?";

exports.ORDERS_UPDATE_QUERY = "UPDATE orders SET billing_address_id = ?, comment = ?, payment = ? " +                                
                              "WHERE id = ? and client_id = ? ";
                        
                              
exports.ORDERS_GET_BY_ID_QUERY = "SELECT * FROM orders WHERE id = ? and client_id = ? ";

exports.ORDERS_DELETE_QUERY = "DELETE FROM orders WHERE id = ? and client_id = ? ";

exports.ORDERS_LIST_BY_CLIENT_QUERY = "SELECT * FROM orders " +
                                      "WHERE client_id = ? " +
                                      "order by customer_id";
                              
exports.ORDERS_LIST_BY_CUSTOMER_QUERY = "SELECT * FROM orders " +
                                        "WHERE client_id = ? and customer_id = ? " +
                                        "order by customer_id";
                      
