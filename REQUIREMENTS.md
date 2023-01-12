**_Table of Contents_**

- [API Endpoints](#api-endpoints)
  - [Users](#users)
  - [Products](#products)
  - [Orders](#orders)
  - [Order_Products](#Order_Products)
- [Data Schema](#data-schema)
  - [Products Schema](#products-schema)
  - [Users Schema](#users-schema)
  - [Orders Schema](#orders-schema)
  - [Order_Products](#Order_Products-schema)
- [Data Shapes](#data-shapes)
  - [User](#user)
  - [Product](#product)
  - [Order](#order)
  - [Order_Products](#Order_Products-shape)

## API Endpoints

### Users

- Index - **`Cookie Token required`**

  - HTTP verb `GET`
  - Endpoint:- `/users/:id`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of user objects`

    ```json
    {
      "action": "show all users ",
      "data": [
        {
          "id": 1,
          "userName": "test",
          "firstName": "test",
          "lastName": "test",
          "email": "test@test.com"
        }
      ]
    }
    ```

- Show **`Cookie Token required`**

  - HTTP verb `GET`
  - Endpoint:- `/store/:id` - **id of the user to be retrieved**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `User object`

    ```
    page
    ```

- Create **`Cookie Token required`**

  - HTTP verb `POST`
  - Endpoint:- `/store/signup`
  - Request Body

    ```json
    {
      "firstname": "Test",
      "lastname": "User",
      "username": "testuser",
      "email": "test@test.com",
      "pass": "test123"
    }
    ```

  - Response Body -- `User object`

    ```json
    massage on website
    ```

- Delete **`Cookie Token required`**

  - HTTP verb `post`
  - Endpoint:- `/delete/:id` - **id of the user to be deleted**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Deleted User object`
    ```
    website page login
    ```

- Edit **`Cookie Token required`**

  - HTTP verb `post`
  - Endpoint:- `/update/:id`
  - Request Body

    ```json
    {
      "firstname": "Test2",
      "lastname": "test2",
      "username": "test2",
      "email": "test2@test.com",
      "pass": "test123"
    }
    ```

  - Response Body -- `Updated User object`

    ```
    website page login
    ```

- login

  - HTTP verb `POST`
  - Endpoint:- `/store/login`
  - Request Body

    ```json
    {
      "email": "test@test.com",
      "pass": "test123"
    }
    ```

  - Response Body -- `Updated User object`

    ```json
     page
    ```

### Products

- Index **`Cookie Token required`**

  - HTTP verb `GET`
  - Endpoint:- `/products/:id`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of products`

    ```
    website page all products
    ```

- Show **`Cookie Token required`**

  - HTTP verb `GET`
  - Endpoint:- `/product/:id/:product_id` - **id of the product to be retrieved**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Product object`

    ```json
    {
      "product": {
        "id": 1,
        "product_name": "product name",
        "Description": "product description",
        "price": 9.99,
        "category": "Electronics.",
        "image": "long text...."
      }
    }
    ```

- Create **`Cookie Token required`**

  - HTTP verb `POST`
  - Endpoint:- `/product/:id`
  - Request Body

    ```json
    {
      "product_name": "product name",
      "Description": "product description",
      "price": 9.99,
      "category": "Electronics.",
      "image": "long text...." // uploadiImage
    }
    ```

  - Response Body -- `User object`

    ```
    message website
    ```

- Delete **`Cookie Token required`**

  - HTTP verb `post`
  - Endpoint:- `/product/:id/delete/:product_id` - **id of the product to be deleted**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Deleted Product object`

    ```json
    {
      "product": {
        "id": 1,
        "product_name": "product name",
        "Description": "product description",
        "price": 9.99,
        "category": "Electronics.",
        "image": "long text...."
      }
    }
    ```

- Edit **`Cookie Token required`**

  - HTTP verb `PUT`
  - Endpoint:- `/product/:id/update/:product_id`
  - Request Body

    ```json
    {
      "product_name": "product name",
      "Description": "product description",
      "price": 9.99,
      "category": "Electronics.",
      "image": "long text...."
    }
    ```

  - Response Body -- `Updated User object`

    ```json
    {
      "product": {
        "id": 1,
        "product_name": "product name",
        "Description": "product description",
        "price": 9.99,
        "category": "Electronics.",
        "image": "long text...."
      }
    }
    ```

### Orders

- Index - **`Cookie Token required`**

  - HTTP verb `GET`
  - Endpoint:- `/orders/:id`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Array of order objects, including an array of products added to the order and the associated user`

    ```json
    {
      "action": "update one Order by user_id and product_id",
      "data": {
        "id": 1,
        "order_status": "active",
        "user_id": "1",
        "product_id": "1",
        "quatitiy": 2
      }
    }
    ```

- Show - **`Cookie Token required`**

  - HTTP verb `GET`
  - Endpoint:- `/order/:id/:product_id` - **id of the order to be retrieved**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Order object`

    ```json
    {
      "action": "show one Order by user_id and product_id",
      "data": {
        "id": 1,
        "order_status": "active",
        "user_id": "1",
        "product_id": "1",
        "quatitiy": 2
      }
    }
    ```

- Create **`Cookie Token required`**

  - HTTP verb `POST`
  - Endpoint:- `/order/:id/:product_id`
  - Request Body

    ```json
    {
      "quantity": 2,
      "order_status": "active"
    }
    ```

  - Response Body -- `User object`

    ```json
    {
      "action": "create order",
      "data": {
        "id": 1,
        "order_status": "active",
        "user_id": "1",
        "product_id": "1",
        "quatitiy": 2
      }
    }
    ```

- Delete **`Cookie Token required`**

  - HTTP verb `post`
  - Endpoint:- `/order/:id/delete/:product_id` - **id of the order to be deleted**
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Deleted Order object`

    ```json
    {
      "action": "Delete one Order by user_id and product_id]",
      "data": {
        "id": 1,
        "order_status": "active",
        "user_id": "1",
        "product_id": "1",
        "quatitiy": 2
      }
    }
    ```

- Edit **`Cookie Token required`**

  - HTTP verb `post`
  - Endpoint:- `/order/:id/delete/:product_id`
  - Request Body

    ```json
    {
      "order_status": "completed",
      "quatitiy": 3
    }
    ```

  - Response Body -- `Updated User object`

    ```json
    {
      "action": "Delete one Order by user_id and product_id]",
      "data": {
        "id": 1,
        "order_status": "completed",
        "user_id": "1",
        "product_id": "1",
        "quatitiy": 3
      }
    }
    ```

### Order_Products

- Index - **`Cookie Token required`**

  - HTTP verb `GET`
  - Endpoint:- `/order/:id/:order_id/:product_id`
  - Request Body

    ```json
      N/A
    ```

  - Response Body

    ```json
    {
      "action": "show all one Order-products by user_id and order_id",
      "data": [
        {
          "id": 1,
          "order_id": "1",
          "product_id": "1",
          "quantity": 20
        }
      ]
    }
    ```

- Show - **`Cookie Token required`**

  - HTTP verb `GET`
  - Endpoint:- `/order/:id/:order_id/:product_id/:order_products_id`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Order object`

    ```json
    {
      "action": "show all one Order-products by user_id and order_id",
      "data": {
        "id": 1,
        "order_id": "1",
        "product_id": "1",
        "quantity": 20
      }
    }
    ```

- Create **`Cookie Token required`**

  - HTTP verb `POST`
  - Endpoint:- `/order/:id/:order_id/:product_id`
  - Request Body

    ```json
    {
      "quantity": 1
    }
    ```

  - Response Body -- `User object`

    ```json
    {
      "action": "create one Order-products by user_id and order_id",
      "data": {
        "id": 1,
        "user_id": "1",
        "product_id": "1",
        "quatitiy": 1
      }
    }
    ```

- Delete **`Cookie Token required`**

  - HTTP verb `post`
  - Endpoint:- `"/order/:id/:order_id/:product_id/delete/:order_products_id"`
  - Request Body

    ```json
      N/A
    ```

  - Response Body -- `Deleted Order object`

    ```json
    {
      "action": "delete one  Order-products by user_id and order_id and order_producst_id",
      "data": {
        "id": 1,
        "user_id": "1",
        "product_id": "1",
        "quatitiy": 1
      }
    }
    ```

- Edit **`Cookie Token required`**

  - HTTP verb `post`
  - Endpoint:- `"/order/:id/:order_id/:product_id/update/:order_products_id"`
  - Request Body

    ```json
    {
      "quatitiy": 3
    }
    ```

  - Response Body -- `Updated User object`

    ```json
    {
      "action": "update one  Order-products by user_id and order_id and order_producst_id",
      "data": {
        "id": 1,
        "user_id": "1",
        "product_id": "1",
        "quatitiy": 3
      }
    }
    ```

## Data Schema

### Users Schema

```sql
CREATE TABLE IF NOT EXISTS users_store(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    username VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    pass text
);
```

### Products Schema

```sql
CREATE TABLE IF NOT EXISTS products_store(
    id SERIAL PRIMARY KEY,
    user_id bigint references users_Store(id),
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NUll,
    price  NUMERIC(17, 2) NOT NULL,
    description text,
    image text
);

```

### Orders Schema

```sql
CREATE TABLE IF NOT EXISTS orders_store(
    id SERIAL PRIMARY KEY,
    user_id bigint references users_Store(id),
    product_id bigint references products_store(id),
    order_status VARCHAR(50),
    quantity integer
);
```

### Order_Products-schema

```sql
CREATE TABLE IF NOT EXISTS order_products(
    id SERIAL PRIMARY KEY,
    order_id bigint references orders_Store(id),
    product_id bigint references products_store(id),
    quantity integer
);
```

## Data Shapes

### User

```typescript
type userData = {
  id?: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  pass: string;
};
```

### Product

```typescript
type productData = {
  id?: number;
  product_name: string;
  user_id: number;
  category: string;
  price: number;
  description: string;
  image: string;
};
```

### Order

```typescript
type orderType = {
  id?: number;
  user_id: number;
  product_id: number;
  quantity: number;
  order_status: string;
};
```

### #Order_Products-shape

```typescript
type orderProducts = {
  id?: number;
  order_id: string;
  product_id: string;
  quantity: number;
};
```
