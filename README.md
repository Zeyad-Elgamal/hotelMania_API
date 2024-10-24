
# Hotel Reservation System API Documentation

This API is designed to manage cities, governates, hotels, rooms, and reservations. Below are the endpoints available and how to use them.

## Base URL

The base URL for all requests is: `http://localhost:5001`

---


## 1. City Endpoints

### a. Get All Cities
- **Method**: `GET`
- **Endpoint**: `/cities`
- **Query Parameters**: 
  - `governate`: (Optional) Filters cities by the governate name.
- **Example**:
  ```bash
  curl -X GET "http://localhost:5001/cities?governate=Cairo"
  ```

### b. Get All Hotels of a City
- **Method**: `GET`
- **Endpoint**: `/cities/:cityID/hotels`
- **Example**:
  ```bash
  curl -X GET "http://localhost:5001/cities/1/hotels"
  ```

---

## 2. Governate Endpoints

### a. Get All Governates
- **Method**: `GET`
- **Endpoint**: `/governates`
- **Example**:
  ```bash
  curl -X GET "http://localhost:5001/governates"
  ```

### b. Get Governate Cities
- **Method**: `GET`
- **Endpoint**: `/governates/:govID/cities`
- **Example**:
  ```bash
  curl -X GET "http://localhost:5001/governates/1/cities"
  ```

---

## 3. Hotel Endpoints

### a. Get All Hotels
- **Method**: `GET`
- **Endpoint**: `/hotels`
- **Query Parameters**: 
  - `city`: (Optional) Filters hotels by the city name.
  - `governate`: (Optional) Filters hotels by the governate name.
- **Example**:
  ```bash
  curl -X GET "http://localhost:5001/hotels?city=Nasr City"
  ```

### b. Get Rooms of a Hotel
- **Method**: `GET`
- **Endpoint**: `/hotels/:hotelID/rooms`
- **Example**:
  ```bash
  curl -X GET "http://localhost:5001/hotels/1/rooms"
  ```

### c. Get Amenities of a Room
- **Method**: `GET`
- **Endpoint**: `/hotels/:hotelID/rooms/:roomID/amenities`
- **Example**:
  ```bash
  curl -X GET "http://localhost:5001/hotels/1/rooms/1/amenities"
  ```

---

## 4. Reservation Endpoints

### a. Get All Reservations
- **Method**: `GET`
- **Endpoint**: `/reservations`
- **Example**:
  ```bash
  curl -X GET "http://localhost:5001/reservations"
  ```

### b. Get Reservations by User ID
- **Method**: `GET`
- **Endpoint**: `/reservations?userID=USER_ID`
- **Example**:
  ```bash
  curl -X GET "http://localhost:5001/reservations?userID=12345"
  ```

### c. Add Reservation
- **Method**: `POST`
- **Endpoint**: `/reservations`
- **Body**: JSON with reservation details:
  ```json
  {
    "dateFrom": "2024-10-20T00:00:00.000Z",
    "dateTo": "2024-10-22T00:00:00.000Z",
    "roomID": "room_id",
    "hotelID": "hotel_id"
  }
  ```
- **Example**:
  ```bash
  curl -X POST "http://localhost:5001/reservations" -H "Content-Type: application/json" -d '{
    "dateFrom": "2024-10-20T00:00:00.000Z",
    "dateTo": "2024-10-22T00:00:00.000Z",
    "roomID": "1",
    "hotelID": "1"
  }'
  ```

  ### d. User Login
  - **Method**: `POST`
  - **Endpoint**: `/login`
  - **Body**: x-www-form-urlencoded with login credentials:
    ```x-www-form-urlencoded
    
      "username": "user_name",
      "password": "user_password"
    
    ```

  ### e. User Signup
  - **Method**: `POST`
  - **Endpoint**: `/signup`
  - **Body**: x-www-form-urlencoded with signup details:
    ```x-www-form-urlencoded
    "username": "new_user_name",
    "password": "new_user_password",
    "email": "user_email"
    ```

---

## Using the API with Postman

1. Open Postman.
2. Select the request method (`GET`, `POST`, etc.).
3. Enter the URL for the desired endpoint.
4. For `GET` requests, if query parameters are needed, click on the "Params" tab and add them.
5. For `POST` requests, go to the "Body" tab, select "raw", choose JSON format, and add the required JSON data.
6. Send the request and check the response.

---

## Running the API Locally

To run this API locally:
1. Clone the repository.
2. Run `npm install` to install the dependencies.
3. Use `node app.js` to start the server.
4. The API will be available at `http://localhost:5001`.
