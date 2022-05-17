# React Secure Session

## Why this ?
So, many projects of big companies, right now is exposing top secret values such as JWTs, JWKs, Usernames, UserIds, etc.
Those values have to never been publicly exposed cause security reasons. There is another concept like a CORS which must has a same origin strict policy cause it is most secure to your api working like this way. You need to interface your UI layer to hide the backend and to secure your application.

## How it works ?
### React - Create an standar react web app
### React Build - Create a process in your package.json to export a dist folder of your react project
### NodeJS Server Side Processing - Create a NodeJS server side service to return the HTML and assets of your react dist folder
### NoodeJS Embedded API - Create an embedded api on the path '/api' to avoid the CORS conflicts. This embedded api will calls your backend endpoints
### NodeJS Session Dealing - Create a mechanism to handle the http only cookie created in the server side with the authentication callback. When this occurs it is very secure to interact with the server but our embedded api is not going to expect a JWT, it will expect a session id created in the authorization process. So you need to check if the session id is valid (validating the client ip for example) and then, on the embedded api side you are able to collect the already stored JWT of the session.
### Interaction NodeJS Embedded API and Backend API - Now you are able to call the backend api with the JWT of the session request, also you are no expecting issues with the cors.
## Just run  `npm install && npm start`

