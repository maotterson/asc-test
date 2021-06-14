# ASC-LCCC REST API

## Description

A dedicated REST API written in node.js with express.js to manage requests for check-in related tasks with the ASC.

## How to setup locally

1. Install Node.js on your machine (https://nodejs.org/en/)<br>

2. In the root directory of the project repository, use the command **npm install** to download/install all dependencies.

3. Create a file called **.env** in the root directory, and add the following line:<br><br>
MONGO_CONNECTION_STRING=""<br><br>
In order to interact with a database, you will need to configure one; if you wish, message me and I either grant you access to the existing dummy database I am using or setup your own. Register an account at https://www.mongodb.com .

4. To run the server on your machine, use the command **node server.js**.

## Testing API Endpoints in POSTMAN

1. Open the project workspace in Postman (titled **ASC-LCCC**)

2. Under **Collections**, select a collection folder corresponding to an API endpoint to view sample requests.

3. With a request selected, observe the request method, URI, headers, and body.

4. To test a request, click the blue **Send** button in the top right.
