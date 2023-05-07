<h1 align="center"> Hudla - Challenge</h1>
<hr/>

<p id="intro"></p>

## 📘 Introduction
This project consists of a client transaction manager, based on the affiliate-producer model. Since the application refers to a bussiness that follows the producer-affiliate model, you can create customers, projects, and store the transactions for each customer. In addition, you can handle and query transactions related to the sales of these products. 

<p id="overview"></p>

## 🔍 Overview

The project assumes the point of view of an administrator user, who has the role of managing his customers' transactions. Therefore, the user has the responsibility to create a record of the customers, as well as their respective products and affiliates. To register a transaction, the administrator only needs to upload a txt file on a form, where the front-end application must be able to manipulate and normalize this file to finally save the information.

## 📚 Table of contents

- [📘 Introduction](#-introduction)
- [🔍 Overview](#-overview)
- [📚 Table of contents](#-table-of-contents)
- [📝 Requirements](#-requirements)
- [🖥️ Technologies](#️-technologies)
- [📲 How to install](#-how-to-install)
- [🏃🏾 How to run](#-how-to-run)
  - [🌅 Preparing environment](#-preparing-environment)
  - [🗺  General](#--general)
  - [📄 Documentation](#-documentation)
  - [✅ Tests](#-tests)
- [🌎 Support links](#-support-links)

<p id="requirements"></p>

## 📝 Requirements
- Docker;
- Docker compose;
- Node (as of 16v);
- MySQL;

<p id="tech"></p>

## 🖥️ Technologies

- __💾 Database:__
    - MySQL;

- __🌩️ Back-end:__
    - Typescript;
    - Node.js;
    - Nest.js;
    - Swagger;

- __🖼️ Front-end:__
    - Typescript;
    - Next.js;
    - Axios;
    - Context API;

<p id="install"></p>

## 📲 How to install

To install the application

## 🏃🏾 How to run

<p id="run-env"></p>

### 🌅 Preparing environment

if there is already a copy of the application on your local device, you will need to make some changes to the settings to adapt them to your context.

Initially, you will need  to create an `.env` file in the root directory of the project, in which you will declare all environment variables needed to run the application. The contents of the file will be as follows:

```
// Here are the settings related to your database. In my case I have named my database "db_desafio".
MYSQL_ROOT_PASSWORD=<your root password>
MYSQL_DATABASE=<name of your database>
MYSQL_USER=<your user>
MYSQL_PASSWORD=<your user password>

DATABASE_URL=mysql://<user>:<password>@db:3306/<database name>?schema=public

// this is the environment variable of the server that will connect the front-end to the API.
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

With all the environment variables set, everything can be recognized by docker-compose and each specific service.

<p id="run-general"></p>

### 🗺  General

Once you meet the requirements, you can run the application simply by following the steps below:

First of all, you need to build the application by running this command in the terminal:

```
docker-compose build
```

After building the application, you'll have to do Prisma migrations on your back-end. When you do these migrations, Prisma builds your database based on the application models.

```
docker-compose run --rm backend npx prisma migrate dev

docker-compose run --rm backend npx prisma migrate deploy
```

Now you can finally run the application.

```
docker-compose up
```

When you run this command, docker-compose will run the services built earlier as well as populate the database, making it easier to test the application.

If you make any changes to the docker settings, you can run the following command, which will build the apllication and then run.

```
docker-compose up --build
```

<p id="run-doc"></p>

### 📄 Documentation

If you want to access the back-end documentation, you need to open the address http://localhost:3000/doc in your browser while the application is running.

<p id="run-test"></p>

### ✅ Tests

With the whole application built and set, if you want to do or run some tests, you will need to run in the terminal the command below:

```
// this command will run the test on backend
docker-compose run --rm backend npx backend test
```

<p id="support"></p>

## 🌎 Support links

- Install docker: https://docs.docker.com/engine/install/
- Mysql Docker hub: https://hub.docker.com/_/mysql/
- Download Node: https://nodejs.org/en/download
