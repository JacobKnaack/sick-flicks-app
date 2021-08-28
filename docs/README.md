# Sick Flicks Web Service

![continuous integration](https://github.com/JacobKnaack/sick-flicks-app/actions/workflows/ci.yml/badge.svg)
![code coverage](https://img.shields.io/codecov/c/github/JacobKnaack/sick-flicks-app?label=Code%20Coverage)

## Overview

This Web Service is designed to Serve Client Applications with a range of API features.  The services included in this app are designed to facilitate the delivery of Movie Review data to any client that is registered on Platform, and manage Profile Data for Users of the platform.

---

## Installation

Once you have cloned the repository you should be able to install the application using the following scripts.

1. Install the project:

   ```bash
   $ npm install 
   ```

1. Once dependencies are installed you should run tests to ensure all modules are working properly:

   ```bash
   $ npm test
   ```

1. To run the project you should be able to use the start script:

   ```bash
   $ npm start
   ```

---

## Configuration

Before you can properly run the application you will need to provide access to a running **Mongo DB** instance. You should configure an environment varible that provides the following information to the application:

* `MONGODB_URI=mongodb://<YOUR_MONGO_DB_CONNECTION_STRING>`

You can create a file titled: `.env` at the root of this project repo to provide these values to the application.

---

## Authentication

The Sick Flicks API requires that every client that wants to access application resources to `Register` their application with the platform. Once Registered, the client will be allowed to access data and give Users the ability to access their Profile Data and perform Role based authorized behaviors.

### **API Keys**

Every Request to the platform requires an *API Key* to identify the Client Application accessing the Sick Flicks API.  Please see the Sick Flicks Client Services documentation for how to allows clients to access keys and manage applications.

How do we obtain Application credentials?

### **Profile Authentication**

For specific services and service behaviors, the User will be required to `Register` and or `Log In` to the platform and to obtain or modify information belonging to a specific profile or user.

How do we Obtain Profile credentials?

---

## Services

For full details about Sick Flicks API services had [here](/services/README.md). This Application includes the following services:

* ### Login

    Allows users to exchange authentication credentials for Profile Data.  Once a User has a Profile, they are allowed to perform 1st class functionality like comment creation and participating in Platform curration with likes and dislikes.

* ### Register

    In order to Login and access a variety of platform features, the `Register` service should be used to grant platform credentials to the client application.

    These service requires that the client application has obtained an **API Key**.

* ### Movies

    Movies are catalogued from the **MovieDB**.  The movie service allows clients to request information about a movie and any associated information from TMDB.  Certain movie service methods required **Profile Authentication**.

* ### Reviews

    The platform can query and manage **Review** data created by particular User Profiles.
  
* ### Comments

    Comments can be created for a given **Review** and for a given **Profile**.
