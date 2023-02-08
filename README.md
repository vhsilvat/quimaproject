# Quima Project

Quima Project is a web application that consists of three components:
- PostgreSQL database
- REST API
- Angular frontend

## Prerequisites
- Docker and Docker Compose
- Node.js and npm

## Getting Started
1. Clone the repository to your local machine.
2. Navigate to the root of the project in the terminal.
3. Run `docker-compose up` to build and start the containers.
    - The Angular frontend can be accessed on `localhost:4200/Home`.
4. To stop the containers, run `docker-compose down`.

## Project Structure
```bash
quimaProject
|   database
|   |   data
|   |   table_schema.sql
|   quimafront
|   |   Dockerfile
|   |   package.json
|   |   ...
|   quimaproject
|   |   Dockerfile
|   |   pom.xml
|   |   ...
|   docker-compose.yml
```

## Technical Details
- The project uses Docker and Docker Compose to manage the containers.
- The PostgreSQL database is managed by the `postgres` service. The database data is stored in the `./database/data` directory and the table schema is in `./database/table_schema.sql`.
- The REST API is managed by the `restapi` service. It is built using Java and Maven.
- The Angular frontend is managed by the `angularfront` service. It is built using Node.js and npm.

## Project Overview
Quima Project is a web application that allows users to manage products. The backend is a REST API that communicates with a PostgreSQL database to store and retrieve product information. The frontend is an Angular application that provides a user-friendly interface for interacting with the REST API.
