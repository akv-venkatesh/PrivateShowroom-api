module.exports = function(app) {

    const checkAuth=require('../middleware/check-auth');
    const buyers = require('../controller/buyer.controller.js');
    const env = require('../config/env.js');
    const {checkSchema, validationResult} = require('express-validator');

    const buyerSchema = require('../middleware/validators/buyer-schema');
        
    // Test
    app.post(`${env.rootPath}/buyer/test`, buyers.test);

    // 2.1. Get buyer profile
    app.post(`${env.rootPath}/buyer/get-profile`, checkAuth, buyers.getProfile);

    // 2.2. Update buyer profile
    app.post(`${env.rootPath}/buyer/update-profile`, checkAuth, checkSchema(buyerSchema.updateSchema), buyers.updateProfile);

    // 2.3. Add/Update prereq details (buyers)    
    app.post(`${env.rootPath}/buyer/add-prereq`, checkAuth, checkSchema(buyerSchema.preReqSchema), buyers.addPreReq);

    // 2.4. Get prereq details
    app.post(`${env.rootPath}/buyer/get-prereq`, checkAuth, buyers.getPreReq);

    
       
}