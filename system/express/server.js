/**
 * Created by rakhmatullahyoga on 06/07/17.
 */

'use strict';

module.exports = function (TOOLS, MODULES, CONSTANTS) {
    console.time('Loading express engine');

    // Initialize Express engine
    let APP = MODULES.EXPRESS();
    APP.use(MODULES.BODY_PARSER.urlencoded({ extended: false }));
    APP.use(MODULES.BODY_PARSER.json({ extended: true }));
    APP.use(MODULES.CORS());
    APP.use(MODULES.EXPRESS_LOGGER.create(TOOLS.LOG));
    APP.use(MODULES.METHOD_OVERRIDE());

    // Make directory '/public' as a static file content
    APP.use('/public', MODULES.EXPRESS.static(CONSTANTS.PATH.PUBLIC_FILE_PATH));

    // Initialize express interface
    TOOLS.INTERFACES.EXPRESS = require(CONSTANTS.PATH.CLASS_LOADER)(TOOLS, MODULES, CONSTANTS, CONSTANTS.PATH.EXPRESS_INTERFACES_PATH);

    // Initialize routers
    require(CONSTANTS.PATH.ROUTERS_LOADER)(TOOLS, APP, CONSTANTS, MODULES);

    // Not found route handler
    APP.use(function (req, res) {
        return res.status(404).json({ status: MODULES.HTTP.STATUS_CODES[404] });
    });

    // Starting the application server
    let SERVER = APP.listen(process.env.APP_PORT, function () {
        console.timeEnd('Loading express engine');
        console.timeEnd('Total application preparation time');
        console.info('Listening on port: ' + SERVER.address().port);
    });

    // Return APP for testing purpose
    return SERVER;
};
