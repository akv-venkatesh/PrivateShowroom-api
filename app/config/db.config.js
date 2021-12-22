const env = require('./env.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {

    host: env.host,
    dialect: env.dialect,
    dialectOptions:{useUTC:false},timezone:"+05:30",
    //operatorsAliases: false,

    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle,
       
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.user = require('../model/user.js')(sequelize, Sequelize);
db.admin = require('../model/admin.js')(sequelize, Sequelize);

db.buyer = require('../model/buyers.js')(sequelize, Sequelize);
db.buyer_prereq = require('../model/buyer_prereq.js')(sequelize, Sequelize);
db.buyer_prereq_certifications = require('../model/buyer_prereq_certifications.js')(sequelize, Sequelize);
db.buyer_prereq_incoterms = require('../model/buyer_prereq_incoterms.js')(sequelize, Sequelize);
db.buyer_prereq_market_exposure = require('../model/buyer_prereq_market_exposure.js')(sequelize, Sequelize);
db.buyer_prereq_payment_terms = require('../model/buyer_prereq_payment_terms.js')(sequelize, Sequelize);
db.buyer_prereq_product_categories = require('../model/buyer_prereq_product_categories.js')(sequelize, Sequelize);
db.buyer_prereq_product_groups = require('../model/buyer_prereq_product_groups.js')(sequelize, Sequelize);
db.buyer_prereq_product_items = require('../model/buyer_prereq_product_items.js')(sequelize, Sequelize);


db.seller = require('../model/sellers.js')(sequelize, Sequelize);
db.seller_certifications = require('../model/seller_certifications.js')(sequelize, Sequelize);
db.seller_incoterms = require('../model/seller_incoterms.js')(sequelize, Sequelize);
db.seller_market_exposure = require('../model/seller_market_exposure.js')(sequelize, Sequelize);
db.seller_payment_terms = require('../model/seller_payment_terms.js')(sequelize, Sequelize);
db.seller_product_categories = require('../model/seller_product_categories.js')(sequelize, Sequelize);
db.seller_product_groups = require('../model/seller_product_groups.js')(sequelize, Sequelize);
db.seller_product_items = require('../model/seller_product_items.js')(sequelize, Sequelize);

//Master/tables

db.m_country = require('../model/m_country.js')(sequelize, Sequelize);
db.certifications = require('../model/m_certifications.js')(sequelize, Sequelize);
db.m_payment_terms = require('../model/m_payment_terms.js')(sequelize, Sequelize);
db.m_constitution = require('../model/m_constitution.js')(sequelize, Sequelize);
db.m_incoterms = require('../model/m_incoterms.js')(sequelize, Sequelize);
db.m_product_sizes = require('../model/m_product_sizes.js')(sequelize, Sequelize);
db.m_product_items = require('../model/m_product_items.js')(sequelize, Sequelize);
db.m_product_age_groups = require('../model/m_product_age_groups.js')(sequelize, Sequelize);
db.m_product_categories = require('../model/m_product_categories.js')(sequelize, Sequelize);
db.product_colors = require('../model/m_product_colors.js')(sequelize, Sequelize);
db.m_product_genders = require('../model/m_product_genders.js')(sequelize, Sequelize);
db.m_product_groups = require('../model/m_product_groups.js')(sequelize, Sequelize);

db.private_shows = require('../model/private_shows.js')(sequelize, Sequelize);


db.user.hasOne(db.admin, {foreignKey: 'user_id', targetKey: 'id'});

db.user.hasOne(db.seller, {foreignKey: 'user_id', targetKey: 'id'});
db.seller.belongsTo(db.user, { foreignKey: 'user_id', sourceKey: 'id'});

db.user.hasOne(db.buyer, {foreignKey: 'user_id', targetKey: 'id'});
db.buyer.belongsTo(db.user, { foreignKey: 'user_id', sourceKey: 'id'});

db.buyer_prereq.hasMany(db.buyer_prereq_certifications, {foreignKey: 'buyer_prereq_id', targetKey: 'id'});
db.buyer_prereq_certifications.belongsTo(db.buyer_prereq, { foreignKey: 'buyer_prereq_id', sourceKey: 'id'});

db.buyer_prereq.hasMany(db.buyer_prereq_incoterms, {foreignKey: 'buyer_prereq_id', targetKey: 'id'});
db.buyer_prereq_incoterms.belongsTo(db.buyer_prereq, { foreignKey: 'buyer_prereq_id', sourceKey: 'id'});

db.buyer_prereq.hasMany(db.buyer_prereq_market_exposure, {foreignKey: 'buyer_prereq_id', targetKey: 'id'});
db.buyer_prereq_market_exposure.belongsTo(db.buyer_prereq, { foreignKey: 'buyer_prereq_id', sourceKey: 'id'});

db.buyer_prereq.hasMany(db.buyer_prereq_payment_terms, {foreignKey: 'buyer_prereq_id', targetKey: 'id'});
db.buyer_prereq_payment_terms.belongsTo(db.buyer_prereq, { foreignKey: 'buyer_prereq_id', sourceKey: 'id'});

db.buyer_prereq.hasMany(db.buyer_prereq_product_categories, {foreignKey: 'buyer_prereq_id', targetKey: 'id'});
db.buyer_prereq_product_categories.belongsTo(db.buyer_prereq, { foreignKey: 'buyer_prereq_id', sourceKey: 'id'});

db.buyer_prereq.hasMany(db.buyer_prereq_product_groups, {foreignKey: 'buyer_prereq_id', targetKey: 'id'});
db.buyer_prereq_product_groups.belongsTo(db.buyer_prereq, { foreignKey: 'buyer_prereq_id', sourceKey: 'id'});

db.buyer_prereq.hasMany(db.buyer_prereq_product_items, {foreignKey: 'buyer_prereq_id', targetKey: 'id'});
db.buyer_prereq_product_items.belongsTo(db.buyer_prereq, { foreignKey: 'buyer_prereq_id', sourceKey: 'id'});

db.certifications.hasMany(db.buyer_prereq_certifications, {foreignKey: 'certificate_id', targetKey: 'id'});
db.buyer_prereq_certifications.belongsTo(db.certifications, { foreignKey: 'certificate_id', sourceKey: 'id'});

db.m_incoterms.hasMany(db.buyer_prereq_incoterms, {foreignKey: 'incoterms_id', targetKey: 'id'});
db.buyer_prereq_incoterms.belongsTo(db.m_incoterms, { foreignKey: 'incoterms_id', sourceKey: 'id'});

db.m_country.hasMany(db.buyer_prereq_market_exposure, {foreignKey: 'country_id', targetKey: 'id'});
db.buyer_prereq_market_exposure.belongsTo(db.m_country, { foreignKey: 'country_id', sourceKey: 'id'});

db.m_payment_terms.hasMany(db.buyer_prereq_payment_terms, {foreignKey: 'payment_terms_id', targetKey: 'id'});
db.buyer_prereq_payment_terms.belongsTo(db.m_payment_terms, { foreignKey: 'payment_terms_id', sourceKey: 'id'});

db.m_product_categories.hasMany(db.buyer_prereq_product_categories, {foreignKey: 'product_category_id', targetKey: 'id'});
db.buyer_prereq_product_categories.belongsTo(db.m_product_categories, { foreignKey: 'product_category_id', sourceKey: 'id'});

db.m_product_groups.hasMany(db.buyer_prereq_product_groups, {foreignKey: 'product_group_id', targetKey: 'id'});
db.buyer_prereq_product_groups.belongsTo(db.m_product_groups, { foreignKey: 'product_group_id', sourceKey: 'id'});

db.m_product_items.hasMany(db.buyer_prereq_product_items, {foreignKey: 'product_item_id', targetKey: 'id'});
db.buyer_prereq_product_items.belongsTo(db.m_product_items, { foreignKey: 'product_item_id', sourceKey: 'id'});

//-----------------------------------

db.seller.hasMany(db.seller_certifications, {foreignKey: 'seller_id', targetKey: 'id'});
db.seller_certifications.belongsTo(db.seller, { foreignKey: 'seller_id', sourceKey: 'id'});

db.seller.hasMany(db.seller_incoterms, {foreignKey: 'seller_id', targetKey: 'id'});
db.seller_incoterms.belongsTo(db.seller, { foreignKey: 'seller_id', sourceKey: 'id'});

db.seller.hasMany(db.seller_market_exposure, {foreignKey: 'seller_id', targetKey: 'id'});
db.seller_market_exposure.belongsTo(db.seller, { foreignKey: 'seller_id', sourceKey: 'id'});

db.seller.hasMany(db.seller_payment_terms, {foreignKey: 'seller_id', targetKey: 'id'});
db.seller_payment_terms.belongsTo(db.seller, { foreignKey: 'seller_id', sourceKey: 'id'});

db.seller.hasMany(db.seller_product_categories, {foreignKey: 'seller_id', targetKey: 'id'});
db.seller_product_categories.belongsTo(db.seller, { foreignKey: 'seller_id', sourceKey: 'id'});

db.seller.hasMany(db.seller_product_groups, {foreignKey: 'seller_id', targetKey: 'id'});
db.seller_product_groups.belongsTo(db.seller, { foreignKey: 'seller_id', sourceKey: 'id'});

db.seller.hasMany(db.seller_product_items, {foreignKey: 'seller_id', targetKey: 'id'});
db.seller_product_items.belongsTo(db.seller, { foreignKey: 'seller_id', sourceKey: 'id'});

db.certifications.hasMany(db.seller_certifications, {foreignKey: 'certificate_id', targetKey: 'id'});
db.seller_certifications.belongsTo(db.certifications, { foreignKey: 'certificate_id', sourceKey: 'id'});

db.m_incoterms.hasMany(db.seller_incoterms, {foreignKey: 'incoterms_id', targetKey: 'id'});
db.seller_incoterms.belongsTo(db.m_incoterms, { foreignKey: 'incoterms_id', sourceKey: 'id'});

db.m_country.hasMany(db.seller_market_exposure, {foreignKey: 'country_id', targetKey: 'id'});
db.seller_market_exposure.belongsTo(db.m_country, { foreignKey: 'country_id', sourceKey: 'id'});

db.m_payment_terms.hasMany(db.seller_payment_terms, {foreignKey: 'payment_terms_id', targetKey: 'id'});
db.seller_payment_terms.belongsTo(db.m_payment_terms, { foreignKey: 'payment_terms_id', sourceKey: 'id'});

db.m_product_categories.hasMany(db.seller_product_categories, {foreignKey: 'seller_product_category_id', targetKey: 'id'});
db.seller_product_categories.belongsTo(db.m_product_categories, { foreignKey: 'seller_product_category_id', sourceKey: 'id'});

db.m_product_groups.hasMany(db.seller_product_groups, {foreignKey: 'seller_product_group_id', targetKey: 'id'});
db.seller_product_groups.belongsTo(db.m_product_groups, { foreignKey: 'seller_product_group_id', sourceKey: 'id'});

db.m_product_items.hasMany(db.seller_product_items, {foreignKey: 'seller_product_item_id', targetKey: 'id'});
db.seller_product_items.belongsTo(db.m_product_items, { foreignKey: 'seller_product_item_id', sourceKey: 'id'});

module.exports = db;