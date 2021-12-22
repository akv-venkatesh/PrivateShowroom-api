const env = require('../config/env.js');
const db = require('../config/db.config.js');
const sequelize=require('sequelize'); 
const Op = sequelize.Op;
const {validationResult} = require('express-validator');
const moment = require('moment-timezone');
const helper = require('../middleware/helper.js');
const sellers = require('../model/sellers.js');

const Users = db.user;
const Admins = db.admin;
const Sellers = db.seller;
const Buyers = db.buyer;

const SellerCertifications = db.seller_certifications;
const SellerIncoterms = db.seller_incoterms;
const SellerMarketExposure = db.seller_market_exposure;
const SellerPaymentTerms = db.seller_payment_terms;
const SellerProductCategories = db.seller_product_categories;
const SellerProductGroups = db.seller_product_groups;
const SellerProductItems = db.seller_product_items;

const Certifications = db.certifications;
const Incoterms = db.m_incoterms;
const Country = db.m_country;
const PaymentTerms = db.m_payment_terms;
const ProductCategories = db.m_product_categories;
const ProductGroups = db.m_product_groups;
const ProductItems = db.m_product_items;


exports.test = (req, res) => 
{
    return res.status(200).json({
        msg: moment(),
        msg1: moment().format("YYYY-MM-DD HH:mm:ss"),
        msg2: moment().unix(),
        msg3: moment("2021-10-15 10:20:16").unix(),
    });
        
};

exports.getProfile = async(req, res) => 
{
    try 
    {
        var user_id = res.token_user.userid;

        var current_date_time = moment().format("YYYY-MM-DD HH:mm:ss");

            Sellers.findOne({ attributes:['company_name', 'constitution_id', 'contact_person', 'designation', 
                                            'phone', 'address', 'facebook_link', 'linkedin_link', 'business_started_year', 'production_capacity_per_day', 
                                            'aql', 'lead_time', 'difot', 'min_order_per_colorway',
                                        ],
                                        where: {user_id: user_id}, 
                                        include: [  {
                                                        model: SellerCertifications,
                                                        required: false,
                                                        attributes:['id', 'certificate_id', 'status',],
                                                        where: {status:1},
                                                        include:[{
                                                                    model: Certifications,
                                                                    required: false,
                                                                    attributes:['id', 'title', 'certification_type'],
                                                                }
                                                                ],
                                                    },
                                                    {
                                                        model: SellerIncoterms,
                                                        required: false,
                                                        attributes:['id', 'incoterms_id', 'status',],
                                                        where: {status:1},
                                                        include:[{
                                                            model: Incoterms,
                                                            required: false,
                                                            attributes:['id', 'title', ],
                                                        }
                                                        ],
                                                    },
                                                    {
                                                        model: SellerMarketExposure,
                                                        required: false,
                                                        attributes:['id', 'country_id', 'status',],
                                                        where: {status:1},
                                                        include:[{
                                                            model: Country,
                                                            required: false,
                                                            attributes:['id', 'title',],
                                                        }
                                                        ],
                                                    },
                                                    {
                                                        model: SellerPaymentTerms,
                                                        required: false,
                                                        attributes:['id', 'payment_terms_id', 'status',],
                                                        where: {status:1},
                                                        include:[{
                                                            model: PaymentTerms,
                                                            required: false,
                                                            attributes:['id', 'title',],
                                                        }
                                                        ],
                                                    },
                                                    {
                                                        model: SellerProductCategories,
                                                        required: false,
                                                        attributes:['id', 'seller_product_category_id', 'status',],
                                                        where: {status:1},
                                                        include:[{
                                                            model: ProductCategories,
                                                            required: false,
                                                            attributes:['id', 'title',],
                                                        }
                                                        ],
                                                    },
                                                    {
                                                        model: SellerProductGroups,
                                                        required: false,
                                                        attributes:['id', 'seller_product_group_id', 'status',],
                                                        where: {status:1},
                                                        include:[{
                                                            model: ProductGroups,
                                                            required: false,
                                                            attributes:['id', 'title', ],
                                                        }
                                                        ],
                                                    },
                                                    {
                                                        model: SellerProductItems,
                                                        required: false,
                                                        attributes:['id', 'seller_product_item_id', 'status',],
                                                        where: {status:1},
                                                        include:[{
                                                            model: ProductItems,
                                                            required: false,
                                                            attributes:['id', 'title',],
                                                        }
                                                        ],
                                                    },
                                                    
                                                ],
                                    })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
                });
            });

    }
    catch (err) 
    {
        console.log(err);
    }
        
};

exports.updateProfile = async(req, res) => 
{
    try 
    {
        const errors = validationResult(req);

        if (!errors.isEmpty()) 
        {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        else
        {
            var user_id = res.token_user.userid;

            var current_date_time = moment().format("YYYY-MM-DD HH:mm:ss");
            
            var profile_values = {
                                    "company_name": req.body.company_name,
                                    "constitution_id": req.body.constitution_id,
                                    "contact_person": (req.body.contact_person) ? req.body.contact_person : "NULL",
                                    "designation": (req.body.designation) ? req.body.designation : "NULL",
                                    "phone": (req.body.phone) ? req.body.phone : "NULL",
                                    "address": (req.body.address) ? req.body.address : "NULL",
                                    "facebook_link": (req.body.facebook_link) ? req.body.facebook_link : "NULL",
                                    "linkedin_link": (req.body.linkedin_link) ? req.body.linkedin_link : "NULL",
                                    "business_started_year": req.body.business_started_year,
                                    "production_capacity_per_day": req.body.production_capacity_per_day,
                                    "aql": req.body.aql,
                                    "lead_time": req.body.lead_time,
                                    "difot": req.body.difot,
                                    "min_order_per_colorway": req.body.min_order_per_colorway,
                                };


                
            await Sellers.update(profile_values, {
                            where: {
                                user_id: user_id
                            }
                        }).catch(err => {
                            console.log(err);
                            return res.status(500).json({
                                msg: "error",
                                details: err
                            });
                        });

            const seller = await Sellers.findOne({
                where: {
                    user_id: user_id,
                }
            });
            
            if (seller) 
            { 
                // Delete all previous prereq of this seller
                await SellerCertifications.destroy({where: {user_id: user_id}});
                await SellerIncoterms.destroy({where: {user_id: user_id}});
                await SellerMarketExposure.destroy({where: {user_id: user_id}});
                await SellerPaymentTerms.destroy({where: {user_id: user_id}});
                await SellerProductCategories.destroy({where: {user_id: user_id}});
                await SellerProductGroups.destroy({where: {user_id: user_id}});
                await SellerProductItems.destroy({where: {user_id: user_id}});

                    if(req.body.certifications && req.body.certifications.length>=1)
                    {
                        let arr_certifications = [];
                        
                        req.body.certifications.forEach(function(value)
                        {
                            let x = {  
                                        user_id: user_id, 
                                        seller_id: seller.id, 
                                        certificate_id: value,
                                        created_at: current_date_time,
                                        status: 1 
                                    };
                            arr_certifications.push(x);
                        });

                        await SellerCertifications.bulkCreate(arr_certifications);
                    }

                    if(req.body.incoterms && req.body.incoterms.length>=1)
                    {
                        let arr_incoterms = [];
                        
                        req.body.incoterms.forEach(function(value)
                        {
                            let x = {  
                                        user_id: user_id, 
                                        seller_id: seller.id, 
                                        incoterms_id: value,
                                        created_at: current_date_time,
                                        status: 1 
                                    };
                            arr_incoterms.push(x);
                        });

                        await SellerIncoterms.bulkCreate(arr_incoterms);
                    }

                    if(req.body.market_exposure && req.body.market_exposure.length>=1)
                    {
                        let arr_market_exposure = [];
                        
                        req.body.market_exposure.forEach(function(value)
                        {
                            let x = {  
                                        user_id: user_id, 
                                        seller_id: seller.id, 
                                        country_id: value,
                                        created_at: current_date_time,
                                        status: 1 
                                    };
                            arr_market_exposure.push(x);
                        });

                        await SellerMarketExposure.bulkCreate(arr_market_exposure);
                    }

                    if(req.body.payment_terms && req.body.payment_terms.length>=1)
                    {
                        let arr_payment_terms = [];
                        
                        req.body.payment_terms.forEach(function(value)
                        {
                            let x = {  
                                        user_id: user_id, 
                                        seller_id: seller.id, 
                                        payment_terms_id: value,
                                        created_at: current_date_time,
                                        status: 1 
                                    };
                            arr_payment_terms.push(x);
                        });

                        await SellerPaymentTerms.bulkCreate(arr_payment_terms);
                    }

                    if(req.body.product_categories && req.body.product_categories.length>=1)
                    {
                        let arr_product_categories = [];
                        
                        req.body.product_categories.forEach(function(value)
                        {
                            let x = {  
                                        user_id: user_id, 
                                        seller_id: seller.id, 
                                        product_category_id: value,
                                        created_at: current_date_time,
                                        status: 1 
                                    };
                            arr_product_categories.push(x);
                        });

                        await SellerProductCategories.bulkCreate(arr_product_categories);
                    }

                    if(req.body.product_groups && req.body.product_groups.length>=1)
                    {
                        let arr_product_groups = [];
                        
                        req.body.product_groups.forEach(function(value)
                        {
                            let x = {  
                                        user_id: user_id, 
                                        seller_id: seller.id, 
                                        product_group_id: value,
                                        created_at: current_date_time,
                                        status: 1 
                                    };
                            arr_product_groups.push(x);
                        });

                        await SellerProductGroups.bulkCreate(arr_product_groups);
                    }

                    if(req.body.product_items && req.body.product_items.length>=1)
                    {
                        let arr_product_items = [];
                        
                        req.body.product_items.forEach(function(value)
                        {
                            let x = {  
                                        user_id: user_id, 
                                        seller_id: seller.id, 
                                        product_item_id: value,
                                        created_at: current_date_time,
                                        status: 1 
                                    };
                            arr_product_items.push(x);
                        });

                        await SellerProductItems.bulkCreate(arr_product_items);
                    }
            }
            
            return res.status(200).json({
                status:1, 
                msg: "Profile updated successfully"
            });
        }        
    }
    catch (err) 
    {
        console.log(err);
    }
        
};

