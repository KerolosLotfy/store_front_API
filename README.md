# Storefront Backend Project

## Table of Contents
-   [How_to_setup_Application](#How_to_setup_Application)
-   [How_to_connect_to_the_database](#How-to-set-up-and-connect-the-database)
-   [ports](#what-ports-the-backend-and-database-are-running-on)
-   [How-to-running-unit-test](#How-to-running-unit-test)
-   [package-installation-instructions](#package-installation-instructions)
-   [Author](#Author)
-   [Endpoints](#Endpoints)


## How to set up and connect the database
    -  download postgres database on your driver by [postgres](https://www.postgresql.org/)`
    -   create user in sql shell
        ```sh
        CREATE USER kerodev WITH SUPERUSER PASSWORD 'kkk123';
        ```

    -   create databases in sql shell
        ```sh
        create database store ;
        create database store_test ;
        ```
    -   Grant all database privileges TO user in both databases
        ```sh
        GRANT ALL PRIVILEGES ON database store TO kerodev;
        GRANT ALL PRIVILEGES ON database store_test TO kerodev;
        ```

## How_to_setup_Application

-   First, create a .env file with all the required environment variables:
    -   ```bash
        driver = pg
        postgres_user = keroDev
        postgres_db = store
        postgres_test_db = store_test
        postgres_password = pass123
        postgres_host = 127.0.0.1
        postgres_port = 5432
        ENV = dev
        PEPPER = alpapakirolos6@
        SALT_ROUNDS = 10
        TOKEN_SECRET = alpapakirolos6@
        ```
-   download packages by run `yarn` or `npm i`.
-   runing application by run `yarn start` or `npm run start`cls
-  in some endpoints must run on any API platform such as [postman](https://www.postman.com/)



## what-ports-the-backend-and-database-are-running-on

The application will run on <http://127.0.0.1:3030/>

## How-to-running-unit-test

```bash
yarn test
```

## package-installation-instructions

-   [NodeJS](https://nodejs.org/) - The JavaScript runtime
-   [Yarn](https://yarnpkg.com/) - The dependency manager
-   [db-migrate](https://db-migrate.readthedocs.io/en/latest/) - The database migration tool
-   [Express](https://expressjs.com) - The web framework
-   [TypeScript](https://www.typescriptlang.org/) - Types JS extension
-   [Jasmine](https://jasmine.github.io/) - The unit testing framework

## Author

Kerolos Lotfy

## Endpoints 

-   See [REQUIREMENTS.md](./REQUIREMENTS.md) file
