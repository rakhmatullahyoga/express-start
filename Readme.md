# express-start #

### Introduction ###

This repository contains express-start project, a boilerplate for Node.js REST API application using Express.js as its main server for http protocol.
You can use this repo as a template for REST API web service development.
This boilerplate is already powered by docker for containerization and application deployment purposes.
You can add or remove some third party plugin as necessary, such as databases (this repo includes Mongoose.js, Sequelize.js, and Redis) and other library such as Cron, RPC client and server for micro-service application development (currently not available).

### Boilerplate structure ###

    .
    ├─ build                   # Build scripts
    ├─ coverage*               # Tests coverage report
    ├─ logs                    # Express log files
    ├─ public                  # Resource files
    ├─ src                     # Source files
    |   ├─ main                # Main application
    |   |   |─ application     # Application core, consist of controllers and services
    |   |   |─ configs         # Application configurations
    |   |   |─ database        # Database configuration and models/schema
    |   |   |─ protocols       # Protocol-based interface to application core
    |   |   └─ system          # Application server (express, etc.) configuration
    |   └─ test                # Automated tests
    |       |─ connection      # Connectivity testing
    |       |─ unit-test       # Unit-test for each controller and service layer 
    |       └─ web-api         # Integration test based on API's endpoints
    ├─ volumes*                # Docker containers volume
    |   ├─ mysql*              # MySQL container volume
    |   └─ redis*              # redis container volume
    ├─ LICENSE
    └─ README.md
    
    *generated directories

### Development guidelines ###

* Install Node.js latest version. See the official [download site of Node.js](https://nodejs.org/en/download)

* Clone this repository:

    `git clone https://github.com/rakhmatullahyoga/express-start.git`
    
* Specify minimum dependencies for application:

    You can modify appropriate minimum dependencies by adding / removing unnecessary dependencies on these files:
    
    - [package.json](package.json): dependency installation
    
    - [src/main/configs/modules.js](src/main/configs/modules.js): application dependency declaration
    
    - [src/main/configs/tools.js](src/main/configs/tools.js): dependency initialization before running the main application.
    
    - [build/docker-compose.yml](build/docker-compose.yml): docker dependency

* Install project dependencies:

    - Install all required third party application (database and other tools) and make sure everything running properly
    
    - Install all dependencies defined in package.json:
    
        `npm install`
    
* Setup environment variables

    **express-start** uses [dotenv](https://www.npmjs.com/package/dotenv), please configure the proper environment variables before running this application.
    
    - Copy the `.env.sample` file and rename it to `.env`
    - Edit all sample fields with the correct environment variables for the application server
    
* Database migration (using [Sequelize](http://docs.sequelizejs.com)):

    - create model (and migration): `node node_modules/.bin/sequelize model:create --name <model_name> --attributes <attributes>`
    - create migration: `node node_modules/.bin/sequelize migration:create --name <migration_name>`
    - run migration: `node node_modules/.bin/sequelize db:migrate`
    - undo migration: `node node_modules/.bin/sequelize db:migrate:undo`
    - help: `node node_modules/.bin/sequelize help`

* Code quality tools

    **express-start** boilerplate is supported with [ESLint](https://www.npmjs.com/package/eslint) for javascript code lint.
    Use this after you develop some application codes using this boilerplate by typing these commands:
    
    - To run ESLint, type: `node node_modules/.bin/eslint .`
    - Fixing code errors, just type: `node node_modules/.bin/eslint . --fix`

* Application testing

    **express-start** use [Mocha](http://mochajs.org) as the testing environment, and [Chai](http://chaijs.com) as the assertion library.
    **express-start** also provide code coverage using [Istanbul](https://www.npmjs.com/package/istanbul).
    Code coverage report can be viewed in `coverage/lcov-report/index.html` after running test.
    All test files should be located under the `src/tests` directory.
    You can run testing by typing command: `npm test`

### Deployment guidelines ###

#### Local deployment (for development) ####

* Make sure all dependencies are installed and already running

* Make sure you have run ESLint to check your application codes

* Run `npm start` to start application

#### Deployment using Docker (for staging and production) ####

* Setup all docker-related environments (minimum: **docker** and **docker-compose**, see [the official Docker documentation](https://docs.docker.com))

* Run all scripts available in [build](build) directory

    - `.env.sample` contains environment variables for docker-compose configuration
    - `build.sh` contains script for build container
    - `docker-compose.yml` contains configuration for all required containers and services
    - `init-db.sh` contains script for running database migrations and seeds
    - `test.sh` contains script for application testing
    - `up.sh` contains script for running whole application containers

* Note that in `docker-compose.yml` file, user and password configuration can only be declared once, unless you clear mysql container and volumes by using `docker-compose down` command.

* Note that in `docker-compose.yml` file, user configuration could not be specified to 'root' as this user is already declared by default

* Note that `build.sh` script must be executed before any other script

* Note that `init-db.sh` script must be executed before executing `test.sh` and/or `up.sh`

### Contribution guidelines ###

Please fork this repository to start making any contributions and make a pull request whenever you have finished your contribution.
All contribution must be reviewed before merged to master branch.

### Author ###

* [Rakhmatullah Yoga Sutrisna](https://github.com/rakhmatullahyoga)

See also the list of [contributors](https://github.com/rakhmatullahyoga/express-start/graphs/contributors) who participated in this project.

### License ###

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Hat tip to [@atmaboy](https://github.com/atmaboy) who come up with the idea of build scripts.

* [GITS Indonesia](https://github.com/gitsindonesia) for giving me opportunity to learn and develop this boilerplate, especially for work purposes.