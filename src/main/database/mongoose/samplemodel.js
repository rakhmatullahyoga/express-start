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
    // let mongooseDelete = MODULES.MONGOOSE_DELETE;
    // let mongooseUnique = MODULES.MONGOOSE_UNIQUE;
    // sampleSchema.plugin(mongooseDelete, {deletedAt: true, overrideMethods: 'all'});
    // sampleSchema.plugin(mongooseUnique, {message: 'is already have profile data.'});

    return sampleSchema;
};
