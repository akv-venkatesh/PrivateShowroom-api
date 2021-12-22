module.exports = function(app) {

    const checkAuth=require('../middleware/check-auth');
    const admin = require('../controller/admin.controller.js');
    const env = require('../config/env.js');
    const {checkSchema, validationResult} = require('express-validator');

    const privateShowSchema = require('../middleware/validators/private-show-schema');
 
    // Test
    app.post(`${env.rootPath}/admin/test`, admin.test);

    // 4.1. List all Private shows
    app.post(`${env.rootPath}/admin/list-private-show`, checkAuth, admin.ListAllPrivateShows);

    // 4.2. Add Private Show
    app.post(`${env.rootPath}/admin/create-private-show`, checkAuth, checkSchema(privateShowSchema.createSchema), admin.AddNewPrivateShow);

    // 4.3. Update Private Show
    app.post(`${env.rootPath}/admin/update-private-show`, checkAuth, checkSchema(privateShowSchema.updateSchema), admin.updatePrivateShow);

    // 4.4. Delete Private Show
    app.post(`${env.rootPath}/admin/delete-private-show`, checkAuth, admin.deletePrivateShow);
           
}