/**
 * Created by rakhmatullahyoga on 06/07/17.
 */

'use strict';

module.exports = function (TOOLS) {
    // Initialize Express engine
    let APP = TOOLS.MODULES.EXPRESS();
    APP.use(TOOLS.MODULES.BODY_PARSER.urlencoded({ extended: false }));
    APP.use(TOOLS.MODULES.BODY_PARSER.json({ extended: true }));
    APP.use(TOOLS.MODULES.CORS());
    APP.use(TOOLS.MODULES.EXPRESS_LOGGER.create(TOOLS.LOG));
    APP.use(TOOLS.MODULES.METHOD_OVERRIDE());
    APP.use(TOOLS.MULTER.single());

    // Initialize routers
    require(TOOLS.CONSTANTS.PATH.ROUTERS_LOADER)(TOOLS, APP);

    // Not found route handler
    APP.use(function(req, res) {
        return res.status(404).json({ status: TOOLS.MODULES.HTTP.STATUS_CODES[404] });
    });

    // Starting the application server
    let SERVER = APP.listen(process.env.APP_PORT, function () {
        TOOLS.LOG.info('Listening on port: ' + SERVER.address().port);
    });
};