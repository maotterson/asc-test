# ASC-LCCC REST API

## Description

A dedicated REST API written in node.js with express.js to manage requests for check-in related tasks with the ASC.

## How to setup locally

1. Install Node.js on your machine (https://nodejs.org/en/)<br>

2. In the root directory of the project repository, use the command **npm install** to download/install all dependencies.

3. Create a file called **.env** in the root directory, and add the following line:<br><br>
COSMOS_CONNECTION_STRING="*Value goes here*"<br><br>
In order to interact with a database, you will need to configure this connection string... note that it should be kept private to prevent unauthorized access. The connection string is stored as an **environment variable** on the azure web service resource where the project gets deployed and run. To access this variable, locate the lorainccc-asc app service, and navigate on the left-side to **Settings>Configuration**. Under the tab **Application Settings** are a list of a few variables, one of which is called **COSMOS_CONNECTION_STRING**; you can click to reveal the value. Paste this value so that it replaces the stuff in italics in the .env file.

4. To run the server on your machine, use the command **node server.js**.

## Testing API Endpoints in POSTMAN

1. Open the project workspace in Postman (titled **ASC-LCCC**)

2. Under **Collections**, select a collection folder corresponding to an API endpoint to view sample requests.

3. With a request selected, observe the request method, URI, headers, and body.

4. To test a request, click the blue **Send** button in the top right.
