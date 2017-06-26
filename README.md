Ulbora Order Service 
==============

Order Micro Service

## Headers
Content-Type: application/json (for POST and PUT)
Authorization: Bearer atToken
clientId: clientId (example 33477)


## Add Product

```
POST:
URL: http://localhost:3005/rs/product/add

Example Request
{
   "clientId":"clientId",
   "productName":"Cap",
   "brand":"Nike",
   "mfnId":1,
   "model":"123_Cap",
   "description":"A black Cap",
   "overview":"111djfjoiqjldktrtryrtyrytrsflkdfjdskdsoidsljdsjdsljdlsjfljsdlfjdlsfdsjfdslfkdsjffld",
   "specifications":"111djfjoiqjldktrtryrtyrytrsflkdfjdskdsoidsljdsjdsljdlsjfljsdlfjdlsfdsjfdslfkdsjff"
}
  
```

```
Example Response   

{
  "success": true,
  "id": 176,
  "clientId": "403",
  "message": ""
}

```

## Update Product

```
PUT:
URL: http://localhost:3005/rs/product/update

Example Request
{
   "id":176,
   "clientId":"403",
   "productName":"Hat",
   "brand":"Nike",
   "mfnId":1,
   "model":"123_Hat",
   "description":"A black Cap",
   "overview":"111djfjoiqjldktrtryrtyrytrsflkdfjdskdsoidsljdsjdsljdlsjfljsdlfjdlsfdsjfdslfkdsjffld",
   "specifications":"111djfjoiqjldktrtryrtyrytrsflkdfjdskdsoidsljdsjdsljdlsjfljsdlfjdlsfdsjfdslfkdsjff"
}
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```

## Get Product

```
GET:
URL: http://localhost:3005/rs/product/get/176/403
  
```

```
Example Response   

{
  "id": 176,
  "productName": "Hat",
  "brand": "Nike",
  "mfnId": 1,
  "model": "123_Hat",
  "description": "A black Cap",
  "overview": {
    "type": "Buffer",
    "data": [
      49,
      49,
      49,      
      100
    ]
  },
  "specifications": {
    "type": "Buffer",
    "data": [
      49,
      49,
      49,      
      102
    ]
  },
  "clientId": 403
}

```


## Delete Product

```
DELETE:
URL: http://localhost:3005/rs/product/delete/176/403
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```


## Add Product Details

```
POST:
URL: http://localhost:3005/rs/details/add

Example Request
{
   "sku":"00100212457",
   "price":8.56,
   "productId":177,
   "clientId":403
}
  
```

```
Example Response   

{
  "success": true,
  "id": 176,
  "clientId": "403",
  "message": ""
}

```


## Update Product Details

```
PUT:
URL: http://localhost:3005/rs/details/update

Example Request
{
   "id": 197,
   "sku":"00100212458",
   "price":10.56,
   "clientId":403
}
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```


## Get Product Details

```
GET:
URL: http://localhost:3005/rs/details/get/197/403
  
```

```
Example Response   

{
  "id": 197,
  "sku": "00100212458",
  "price": 10.56,
  "productId": 177,
  "clientId": 403
}

```




## Get Product Details by Product ID

```
POST:
URL: http://localhost:3005/rs/details/getByProduct

Example Request
{
   "productId":177,
   "clientId":403
}
  
```

```
Example Response   

[
  {
    "id": 196,
    "sku": "00100212457",
    "price": 8.56,
    "productId": 177,
    "clientId": 403
  },
  {
    "id": 197,
    "sku": "00100212458",
    "price": 10.56,
    "productId": 177,
    "clientId": 403
  }
]

```



## Get Product Details by partial SKU

```
POST:
URL: http://localhost:3005/rs/details/getBySku

Example Request
{
   "sku":"001002%",
   "clientId":403
}

```

```
Example Response   

[
  {
    "productDetailsId": 196,
    "productName": "Cap",
    "brand": "Nike",
    "model": "123_Cap",
    "description": "A black Cap",
    "sku": "00100212457",
    "price": 8.56,
    "productId": 177
  },
  {
    "productDetailsId": 197,
    "productName": "Cap",
    "brand": "Nike",
    "model": "123_Cap",
    "description": "A black Cap",
    "sku": "00100212458",
    "price": 10.56,
    "productId": 177
  }
]

```


## Get Product Details by Bar Code

```
POST:
URL: http://localhost:3005/rs/details/getByBarCode

Example Request
{
   "barCodeType":"upc",
   "barCode": "15555fff555115",
   "clientId":403
}

```

```
Example Response   

{
  "productDetailsId": 196,
  "sku": "00100212457",
  "productId": 177,
  "clientId": 403
}

```

## Delete Product Details

```
DELETE:
URL: http://localhost:3005/rs/details/delete/197/403
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```




## Add Product Details Bar Code

```
POST:
URL: http://localhost:3005/rs/barcode/add

Example Request
{
   "type": "upc",
   "code": "15555fff555112",
   "productDetailsId":196,
   "clientId":403
}
  
```

```
Example Response   

{
  "success": true,
  "id": 86,
  "message": ""
}

```


## Update Product Details Bar Code

```
PUT:
URL: http://localhost:3005/rs/barcode/update

Example Request
{
   "id":86,
   "type": "upc",
   "code": "15555fff555115",
   "clientId":403
}
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```




## Get Product Details Bar Code

```
GET:
URL: http://localhost:3005/rs/barcode/get/86/403
  
```

```
Example Response   

{
  "id": 86,
  "type": "upc",
  "code": "15555fff555115",
  "productDetailsId": 196,
  "clientId": 403
}

```



## Get Product Details Bar Code By Details ID

```
POST:
URL: http://localhost:3005/rs/barcode/getByDetails

Example Request
{
   "productDetailsId": 196,
   "clientId":403
}

```

```
Example Response   

[
  {
    "id": 85,
    "type": "upc",
    "code": "15555fff555111",
    "productDetailsId": 196,
    "clientId": 403
  },
  {
    "id": 86,
    "type": "upc",
    "code": "15555fff555115",
    "productDetailsId": 196,
    "clientId": 403
  }
]

```



## Delete Product Details Bar Code

```
DELETE:
URL: http://localhost:3005/rs/barcode/delete/86/403
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```



## Add Product Details Options

```
POST:
URL: http://localhost:3005/rs/options/add

Example Request
{
   "optionName": "color",
   "optionValue": "blue",
   "productDetailsId":196,
   "clientId":403
}
  
```

```
Example Response   

{
  "success": true,
  "id": 88,
  "message": ""
}

```



## Update Product Details Options

```
PUT:
URL: http://localhost:3005/rs/options/update

Example Request
{
   "id":88,
   "optionName": "weight",
   "optionValue": "5.5",
   "clientId":403
}
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```



## Get Product Details Options

```
GET:
URL: http://localhost:3005/rs/barcode/get/86/403
  
```

```
Example Response   

{
  "id": 86,
  "type": "upc",
  "code": "15555fff555115",
  "productDetailsId": 196,
  "clientId": 403
}

```




## Get Product Details Options By Details ID

```
POST:
URL: http://localhost:3005/rs/options/getByDetails

Example Request
{
   "productDetailsId": 196,
   "clientId":403
}

```

```
Example Response   

[
  {
    "id": 88,
    "optionName": "weight",
    "optionValue": "5.5",
    "productDetailsId": 196,
    "clientId": 403
  }
]

```



## Search Product Details Options By Option

```
POST:
URL: http://localhost:3005/rs/options/searchByOption

Example Request
{
   "productDetailsId": 196,
   "clientId":403,
   "optionName": "%weight%"
}

```

```
Example Response   

{
  "id": 88,
  "optionName": "weight",
  "optionValue": "5.5",
  "productDetailsId": 196,
  "clientId": 403
}

```




## Delete Product Details Options

```
DELETE:
URL: http://localhost:3005/rs/options/delete/88/403
  
```

```
Example Response   

{
  "success": true,
  "message": ""
}

```

