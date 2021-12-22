
module.exports = function(app) {
    const checkAuth=require('../middleware/check-auth');
    const master = require('../controller/master.controller.js');
    const env = require('../config/env.js');
    const {checkSchema, validationResult} = require('express-validator');

    const countrySchema = require('../middleware/validators/country-schema');
    const paytermsschema = require('../middleware/validators/paymentterms-schema');
    const constitutionschema = require('../middleware/validators/constitution-schema');
    const certificationschema = require('../middleware/validators/certifications-schema');
    const incotermsdchema = require('../middleware/validators/incoterms-schema');
    const productsizesschema = require('../middleware/validators/productsizes-schema');
    const productItemsschema = require('../middleware/validators/productitems-schema');
    const productagegroupsschema = require('../middleware/validators/productagegroups-schema');
    const productgroupsschema = require('../middleware/validators/productgroups-schema');
    const Productcolorschema = require('../middleware/validators/productcolors-schema');    
    const productgendersschema = require('../middleware/validators/productgenders-schema');
    const Productcategorieschema = require('../middleware/validators/productcategories-schema');

    app.post(`${env.rootPath}/master/countries`,checkAuth,master.GetAllcountries);
    app.post(`${env.rootPath}/master/country/create`,checkSchema(countrySchema.createSchema),master.AddnewCountry);
    app.put(`${env.rootPath}/master/country/edit`,checkSchema(countrySchema.updateSchema),master.EditCountry);
    app.post(`${env.rootPath}/master/payterms`,checkAuth,master.GetAllpaymentterms);
    app.post(`${env.rootPath}/master/payterm/create`,checkAuth,checkSchema(paytermsschema.createSchema),master.Addnewpaymentterm);
    app.put(`${env.rootPath}/master/country/edit`,checkSchema(paytermsschema.updateSchema),master.EditCountry);
    app.post(`${env.rootPath}/master/constitutions`,checkAuth,master.GetAllconstitutions);
    app.post(`${env.rootPath}/master/constitution/create`,checkAuth,checkSchema(constitutionschema.createSchema),master.Addnewconstitution);
    app.post(`${env.rootPath}/master/certifications`,checkAuth,master.GetAllcertifications);
    app.post(`${env.rootPath}/master/certification/create`,checkAuth,checkSchema(certificationschema.createSchema),master.Addnewcertification);
    app.put(`${env.rootPath}/master/certification/edit`,checkAuth,checkSchema(certificationschema.updateSchema),master.EditCountry);
    app.post(`${env.rootPath}/master/incoterms`,checkAuth,master.GetAllincoterms);
    app.post(`${env.rootPath}/master/incoterms/create`,checkAuth,checkSchema(incotermsdchema.createSchema),master.Addnewincoterm);
    app.post(`${env.rootPath}/master/incoterms/create`,checkAuth,checkSchema(incotermsdchema.updateSchema),master.Addnewincoterm);
    app.post(`${env.rootPath}/master/product-sizes`,checkAuth,master.GetAllproductsizes);
    app.post(`${env.rootPath}/master/product-size/create`,checkAuth,checkSchema(productsizesschema.createSchema),master.AddNewProductsize);
    app.post(`${env.rootPath}/master/product-items`,checkAuth,master.GetAllproductItems);
    app.post(`${env.rootPath}/master/product-item/create`,checkAuth,checkSchema(productItemsschema.createSchema),master.AddNewProductitem);
    app.post(`${env.rootPath}/master/product-item/edit`,checkAuth,checkSchema(productItemsschema.updateSchema),master.AddNewProductitem);
    app.post(`${env.rootPath}/master/product-age-groups`,checkAuth,master.GetAllproductagegroups);
    app.post(`${env.rootPath}/master/product-age-group/create`,checkAuth,checkAuth,checkSchema(productagegroupsschema.createSchema),master.AddNewProductagegroup);
    app.post(`${env.rootPath}/master/product-age-group/edit`,checkAuth,checkAuth,checkSchema(productagegroupsschema.updateSchema),master.AddNewProductagegroup);
    app.post(`${env.rootPath}/master/product-categories`,checkAuth,master.GetAllproduct_categories);
    app.post(`${env.rootPath}/master/product-categorie/create`,checkAuth,checkSchema(Productcategorieschema.createSchema),master.AddNewProductcategorie);
    app.post(`${env.rootPath}/master/product-categorie/edit`,checkAuth,checkSchema(Productcategorieschema.updateSchema),master.AddNewProductcategorie);
    app.post(`${env.rootPath}/master/product-genders`,checkAuth,master.GetAllproductgenders);
    app.post(`${env.rootPath}/master/product-gender/create`,checkAuth,checkSchema(productgendersschema.createSchema),master.AddNewProductgender);
    app.post(`${env.rootPath}/master/product-gender/edit`,checkAuth,checkSchema(productgendersschema.updateSchema),master.AddNewProductgender);
    app.post(`${env.rootPath}/master/product-colors`,checkAuth,master.GetAllproductColors);
    app.post(`${env.rootPath}/master/product-color/create`,checkAuth,checkSchema(Productcolorschema.createSchema),master.AddNewProductcolor);
    app.post(`${env.rootPath}/master/product-color/edit`,checkAuth,checkSchema(Productcolorschema.updateSchema),master.AddNewProductcolor);
    app.post(`${env.rootPath}/master/product-groups`,checkAuth, master.GetAllproductgroups);
    app.post(`${env.rootPath}/master/product-group/create`,checkAuth,checkSchema(productgroupsschema.createSchema),master.AddNewproductgroup);
    app.post(`${env.rootPath}/master/product-group/edit`,checkAuth,checkSchema(productgroupsschema.updateSchema),master.AddNewproductgroup);

}