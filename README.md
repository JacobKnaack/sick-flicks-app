# Sick Flicks Web Service

![continuous integration](https://github.com/JacobKnaack/sick-flicks-app/actions/workflows/ci.yml/badge.svg)

## Overview

This Web Service is designed to Serve Client applications that are registered on the Sick Flicks Platform.

### Behavior

* Register an application that can consume Reviews, and Comments Provided by the Sick Flicks API.
* Fetch **Movie** and **Review** content that can be displayed client side.

## Authentication

In order to retrieve data stored in within the Sick Flicks API, you must register an application with our platform.

## Routes

These routes can be used to retrieve data from the Sick Flicks Servers:

### Responses

All responses from each service are formatted as `JSON` objects.

* *Successful* responses will contain the data type requests from the service.
* *Unsuccessful* responses will contain an `Error` object formatted as `JSON`.

### Login Service

Allows the User to Sign into the platform for `Authenticated` services.

#### /login

* Request:
  * Method: `POST`
  * path: `sickflicks:PORT/api/v1/login`
  * required headers:
    * Authorization
      * `Basic <base64encodedUser:Pass>`
* Response:
  * StatusCodes:
    * 405

### Registration Service

#### /register

### Review Service

### /movies

### /profile/:id

### /comments/:reviewId
