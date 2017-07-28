# ExpRest-MVC #

### What is this? ###

* Custom MVC framework for Node.js, using Express.js

* Application version: 1.0.0

### How do I get set up? ###

* Install Node.js v7.0.0

* Clone this repository:

    `git clone https://github.com/rakhmatullahyoga/ExpRest-MVC.git`
    
* Install project dependencies:
    
    - Install all dependencies defined in package.json:
    
        `npm install`
    
* Setup environment variables

    This project uses [dotenv](https://www.npmjs.com/package/dotenv), please configure the proper environment variables before running this application.
    
    - Copy the `.sample-env` file and rename it to `.env`
    - Edit all sample fields with the correct environment variables for the application server
    
* Database migration (using [Sequelize](http://docs.sequelizejs.com)):

    - run: `node node_modules/.bin/sequelize db:migrate`
    - undo: `node node_modules/.bin/sequelize db:migrate:undo`

* How to run tests: (TBD)

* Deployment instructions

    `npm start` or `node index.js`    

### Contribution guidelines ###

* Writing tests: (TBD)
* Code review: (TBD)
* Other guidelines: (TBD)

### Who do I talk to? ###

&copy; [Rakhmatullah Yoga Sutrisna](https://github.com/rakhmatullahyoga/) 2017