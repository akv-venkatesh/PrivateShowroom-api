module.exports = function(app) {

    const checkAuth=require('../middleware/check-auth');
    const users = require('../controller/user.controller.js');
    const env = require('../config/env.js');
    const {checkSchema, validationResult} = require('express-validator');

        
    // Test
    app.post(`${env.rootPath}/user/test`, users.test);
    app.post(`${env.rootPath}/user/test1`, checkAuth, users.test1);
    app.post(`${env.rootPath}/user/omtest`, users.omtest);

    // 1.1. User Login
    app.post(`${env.rootPath}/user/login`, users.login);
      
    // 1.2. Signup new Seller
    const sellerSchema = require('../middleware/validators/seller-schema');
    app.post(`${env.rootPath}/user/sellersignup`, checkSchema(sellerSchema.createSchema), users.sellerSignup);

    // 1.3. Signup new Buyer
    const buyerSchema = require('../middleware/validators/buyer-schema');
    app.post(`${env.rootPath}/user/buyersignup`, checkSchema(buyerSchema.createSchema), users.buyerSignup);
 
    // 1.4. change password
    app.post(`${env.rootPath}/user/changepassword`, checkAuth, users.changePassword);

    // 1.5. List all sellers (admin only)
    app.post(`${env.rootPath}/user/listallsellers`, checkAuth, users.listallsellers);

    // 1.6. List all buyers (admin only)
    app.post(`${env.rootPath}/user/listallbuyers`, checkAuth, users.listallbuyers);

    // 1.7. Accept Buyer/Seller registration  (admin only)
    app.post(`${env.rootPath}/user/acceptuserregistration`, checkAuth, users.acceptUserRegistration);

    // 1.8. change user status (admin only)
    app.post(`${env.rootPath}/user/changeuserstatus`, checkAuth, users.changeUserStatus);

    // 1.9. Delete users (admin only)
    app.post(`${env.rootPath}/user/delete`, checkAuth, users.deleteUser);    
}