module.exports = function(app) {

    const checkAuth=require('../middleware/check-auth');
    const sellers = require('../controller/seller.controller.js');
    const env = require('../config/env.js');
    const {checkSchema, validationResult} = require('express-validator');

    const sellerSchema = require('../middleware/validators/seller-schema');
 
    // Test
    app.post(`${env.rootPath}/seller/test`, sellers.test);

    // 3.1. Get seller profile
    app.post(`${env.rootPath}/seller/get-profile`, checkAuth, sellers.getProfile);

    // 3.2. Update seller profile
    app.post(`${env.rootPath}/seller/update-profile`, checkAuth, checkSchema(sellerSchema.updateSchema), sellers.updateProfile);
           
}