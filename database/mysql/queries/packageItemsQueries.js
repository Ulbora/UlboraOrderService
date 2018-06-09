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
exports.PACKAGE_ITEMS_INSERT_QUERY = "INSERT INTO package_items Set ?";

exports.PACKAGE_DELETE_QUERY = "DELETE FROM package_items WHERE order_item_id = ?  and package_id = ? ";

exports.PACKAGE_LIST_BY_ORDER_QUERY = "SELECT * FROM bar_code " +
                                               "WHERE product_details_id = ? " + 
                                               "and client_id = ? ";

