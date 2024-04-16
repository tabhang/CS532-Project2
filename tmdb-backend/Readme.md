# TMDB Flask API

This Flask API allows for interaction with a TMDB database by serving data through HTTP endpoints. It is designed to handle requests for specific database queries using a custom query system.

## Features

- **Server Initialization**: The server provides a basic response to confirm it is running.
- **Data Querying**: Users can make requests to retrieve data based on a specific path that corresponds to custom database queries.

## API Endpoints

### 1. Home Endpoint
- **Endpoint**: `/`
- **Method**: GET
- **Description**: Checks if the server is on and returns a simple message.
- **Response**: `{"msg": "Server on"}`

### 2. Data Retrieval Endpoint
- **Endpoint**: `/data/<path>`
- **Method**: GET
- **Description**: Receives a path parameter and returns data from the database based on the custom query constructed using the path.
- **Response**:
  - If data is found: Returns JSON containing the queried result.
  - If no data is found: Returns a 404 error with a JSON response indicating no matching data was found.

## Setup and Local Deployment

The project uses Flask, a lightweight WSGI web application framework in Python. Here's how to run the Flask application locally:

1. Ensure Flask is installed using `pip install flask`.
2. The script connects to a `tmdb` database with a table `merged` through a class `Database` defined externally. Make sure this setup is correctly initialized.
3. Run the script directly by executing `python <script_name>.py` in your command line.

This will start the Flask application in debug mode on the default port, accessible via `localhost:5000` in your web browser.

## Usage Example

To query data using the API, navigate to `http://localhost:5000/data/<your-query-path>` where `<your-query-path>` is the specific path that forms part of your database query. For example, accessing `http://localhost:5000/data/movies` could potentially run a query like `Querymovies` if defined in your `Database` class methods.
