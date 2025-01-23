# Crypto Data Fetcher

The server-side application built with Node.js and MongoDB, which fetches cryptocurrency data like price and market cap in usd, and 24h change from the Coingecko API in every 2 hours, also stores it in a MongoDB database, and provides APIs to retrieve the data records of database.

---

## Features

- **Background Job:** 
    Fetches data for Bitcoin, Ethereum, and Matic in every 2 hours from the Coingecko API.
    `/store`: call the Background job by get request once every 2 hours.
- **API Endpoints:**
  - `/stats`: Retrieves the latest data price and market cap in usd, and 24h change for a specified cryptocurrency.
  - `/deviation`: Calculates the standard deviation of the price for the last 100 records of a specific cryptocurrency.
- **Dynamic coin updation:**
    - you use use other coins but add the coin "Coingecko id" and coin "name" on "cryptoCurrency" model of database
    - Also add coin name on "currency" array on /src/utils/variable.js (so that the data of that coin can add in database through the - background job)
    - Finally use the API Endpoints with that coin's "Coingecko id" and you will get the responses for that coin.


---

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building the API.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **dotenv**: Environment variable management.

---

## API Endpoints

### 1. **/stats**
    Retrieves the latest data price and market cap in usd and 24h change for a specified cryptocurrency.

#### Query Params:
- `coin`: One of `bitcoin`, `ethereum`, or `matic-network`.
    you use use other coins but add the coin Coingecko id and coin name on cryptoCurrency model of database
    and also add coin name on "currency" array on /src/utils/variable.js (so that the data of that coin can add in database through the background job)

#### Sample Response:
    {
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
    }

### 2. **/deviation**
    Calculates the standard deviation of the price for the last 100 records of a specified cryptocurrency.

#### Query Params:
- `coin`: One of `bitcoin`, `ethereum`, or `matic-network`.
    you use use other coins but add the coin Coingecko id and coin name on cryptoCurrency model of database
    and also add coin name on "currency" array on /src/utils/variable.js (so that the data of that coin can add in database through the background job)

#### Sample Response:
    {
    "deviation": 4082.48
    }

### 3. **/store**
    Call the background job once in every 2 hour.

#### Sample Response:
    {
    "message" : "Fetched data and stored in db successfully"
    }

---

## Installation and Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (Ensure MongoDB is running locally or via a cloud provider like MongoDB Atlas)
- A package manager like `npm` or `yarn`

### Steps to Run Locally

1. Clone the Repository:
    ```bash
    git clone https://github.com/Harsh-Agrawal96/KoinX_Task.git
    cd KoinX_Task
    ```

2. Install Dependencies
    ```bash
    npm install
    ```

3. Set Up Environment Variables
    Create a `.env` file in the root directory of the project and add your MongoDB connection string:

    ```env
    DB_URL=mongodb+srv://<your-mongodb-credentials>
    ```

    Replace `<your-mongodb-credentials>` with your actual MongoDB connection string.

    you can take the variable references from .env.example that used in .env file.

4. Run the Application:
    To start the server, run:

    ```bash
    npm start
    ```

    The server will be running on http://localhost:5000, The background job can be call by perform GET request on:
    ```bash
    GET http://localhost:5000/store
    ```
    And it will fetch data in every 2 hours.

5. Verify the Data Fetching Job
    To verify that the background job is working correctly,you need to perform get request:
    ```bash
    GET http://localhost:5000/store
    ```
    Now you can check the database requestedRecords model for the stored cryptocurrency record.

6. Testing the API
    Test the API endpoints using any API client (e.g., Postman or cURL).

    Get the latest data for a coin (e.g., Bitcoin, ethereum):
    ```bash
    GET http://localhost:5000/stats?coin=bitcoin
    ```

    Get the standard deviation of coin's price for the last 100 records:
    ```bash
    GET http://localhost:5000/deviation?coin=bitcoin
    ```

    Call the backgorund job once in every 2 hour for store the record of crypto currency:
    ```bash
    GET http://localhost:5000/store
    ```

