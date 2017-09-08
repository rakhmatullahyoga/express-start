/**
 * Created by rakhmatullahyoga on 05/09/17.
 */

'use strict';

module.exports = function (MODULES) {
    let mongoose = MODULES.MONGOOSE;
    let Schema = mongoose.Schema;

    let sampleSchema = new Schema({
        // define your schema here
    }, {timestamps: {}});

    // define your plugin here, see examples below
    // let mongoose_delete = MODULES.MONGOOSE_DELETE;
    // let mongoose_unique = MODULES.MONGOOSE_UNIQUE;
    // sampleSchema.plugin(mongoose_delete, {deletedAt: true, overrideMethods: 'all'});
    // sampleSchema.plugin(mongoose_unique, {message: 'is already have profile data.'});

    return sampleSchema;
};