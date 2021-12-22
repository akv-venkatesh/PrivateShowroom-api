const env = require('../config/env.js');
const db = require('../config/db.config.js');
const sequelize=require('sequelize'); 
const Op = sequelize.Op;
const {validationResult} = require('express-validator');
const moment = require('moment-timezone');
const helper = require('../middleware/helper.js');
const { certifications } = require('../config/db.config.js');

const Users = db.user;
const Admins = db.admin;
const Sellers = db.seller;
const Buyers = db.buyer;
const BuyerPreReq = db.buyer_prereq;
const BuyerPreReqCertifications = db.buyer_prereq_certifications;
const BuyerPreReqIncoterms = db.buyer_prereq_incoterms;
const BuyerPreReqMarketExposure = db.buyer_prereq_market_exposure;
const BuyerPreReqPaymentTerms = db.buyer_prereq_payment_terms;
const BuyerPreReqProductCategories = db.buyer_prereq_product_categories;
const BuyerPreReqProductGroups = db.buyer_prereq_product_groups;
const BuyerPreReqProductItems = db.buyer_prereq_product_items;

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

            Buyers.findOne({ attributes:['company_name', 'contact_person', 'designation', 'phone', 'address', 'facebook_link', 'linkedin_link'], 
                                        where: {user_id: user_id}, 
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
            
                
            Buyers.update({
                            "company_name": req.body.company_name,
                            "contact_person": (req.body.contact_person) ? req.body.contact_person : "NULL",
                            "designation": (req.body.designation) ? req.body.designation : "NULL",
                            "phone": (req.body.phone) ? req.body.phone : "NULL",
                            "address": (req.body.address) ? req.body.address : "NULL",
                            "facebook_link": (req.body.facebook_link) ? req.body.facebook_link : "NULL",
                            "linkedin_link": (req.body.linkedin_link) ? req.body.linkedin_link : "NULL",
            
                        }, {
                            where: {
                                user_id: user_id
                            }
                        }).then(() => {
                            console.log("Profile updated successfully");
                            return res.status(200).json({
                                status:1, 
                                msg: "Profile updated successfully"
                            });
                        }).catch(err => {
                            console.log(err);
                            return res.status(500).json({
                                msg: "error",
                                details: err
                            });
                        });
        }        
    }
    catch (err) 
    {
        console.log(err);
    }
        
};

exports.addPreReq = async(req, res) => 
{
    try 
    {
        var user_id = res.token_user.userid;

        const errors = validationResult(req);

        if (!errors.isEmpty()) 
        {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        else
        {
            var current_date_time = moment().format("YYYY-MM-DD HH:mm:ss");

            const buyer = await Buyers.findOne({
                where: {
                    user_id: user_id,
                }
            });

            if (buyer) 
            {
                // Delete all previous prereq of this buyer
                await BuyerPreReqCertifications.destroy({where: {user_id: user_id}});
                await BuyerPreReqIncoterms.destroy({where: {user_id: user_id}});
                await BuyerPreReqMarketExposure.destroy({where: {user_id: user_id}});
                await BuyerPreReqPaymentTerms.destroy({where: {user_id: user_id}});
                await BuyerPreReqProductCategories.destroy({where: {user_id: user_id}});
                await BuyerPreReqProductGroups.destroy({where: {user_id: user_id}});
                await BuyerPreReqProductItems.destroy({where: {user_id: user_id}});
                await BuyerPreReq.destroy({where: {user_id: user_id}});

                // create new prereq
                var prereq_values = {
                                        "user_id": user_id,
                                        "buyer_id": buyer.id,
                                        "yrs_in_business": req.body.yrs_in_business,
                                        "production_capacity_per_day":req.body.production_capacity_per_day,
                                        "aql":req.body.aql,
                                        "lead_time":req.body.lead_time,
                                        "difot":req.body.difot,
                                        "min_order_per_colorway":req.body.min_order_per_colorway,
                                        "created_at": current_date_time,
                                        "status": 1
                                    };

                if(req.body.private_show_id && req.body.private_show_id>0)
                {
                    prereq_values.private_show_id = req.body.private_show_id;
                }                    

                const buyer_pre_req = await BuyerPreReq.create(prereq_values);
                
                if(buyer_pre_req.id && buyer_pre_req.id>=1)
                {
                    if(req.body.certifications && req.body.certifications.length>=1)
                    {
                        let arr_certifications = [];
                        
                        req.body.certifications.forEach(function(value)
                        {
                            let x = { buyer_prereq_id: buyer_pre_req.id, 
                                        user_id: user_id, 
                                        buyer_id: buyer.id, 
                                        certificate_id: value,
                                        created_at: current_date_time,
                                        status: 1 
                                    };
                            arr_certifications.push(x);
                        });

                        await BuyerPreReqCertifications.bulkCreate(arr_certifications);
                    }

                    if(req.body.incoterms && req.body.incoterms.length>=1)
                    {
                        let arr_incoterms = [];
                        
                        req.body.incoterms.forEach(function(value)
                        {
                            let x = { buyer_prereq_id: buyer_pre_req.id, 
                                        user_id: user_id, 
                                        buyer_id: buyer.id, 
                                        incoterms_id: value,
                                        created_at: current_date_time,
                                        status: 1 
                                    };
                            arr_incoterms.push(x);
                        });

                        await BuyerPreReqIncoterms.bulkCreate(arr_incoterms);
                    }

                    if(req.body.market_exposure && req.body.market_exposure.length>=1)
                    {
                        let arr_market_exposure = [];
                        
                        req.body.market_exposure.forEach(function(value)
                        {
                            let x = { buyer_prereq_id: buyer_pre_req.id, 
                                        user_id: user_id, 
                                        buyer_id: buyer.id, 
                                        country_id: value,
                                        created_at: current_date_time,
                                        status: 1 
                                    };
                            arr_market_exposure.push(x);
                        });

                        await BuyerPreReqMarketExposure.bulkCreate(arr_market_exposure);
                    }

                    if(req.body.payment_terms && req.body.payment_terms.length>=1)
                    {
                        let arr_payment_terms = [];
                        
                        req.body.payment_terms.forEach(function(value)
                        {
                            let x = { buyer_prereq_id: buyer_pre_req.id, 
                                        user_id: user_id, 
                                        buyer_id: buyer.id, 
                                        payment_terms_id: value,
                                        created_at: current_date_time,
                                        status: 1 
                                    };
                            arr_payment_terms.push(x);
                        });

                        await BuyerPreReqPaymentTerms.bulkCreate(arr_payment_terms);
                    }

                    if(req.body.product_categories && req.body.product_categories.length>=1)
                    {
                        let arr_product_categories = [];
                        
                        req.body.product_categories.forEach(function(value)
                        {
                            let x = { buyer_prereq_id: buyer_pre_req.id, 
                                        user_id: user_id, 
                                        buyer_id: buyer.id, 
                                        product_category_id: value,
                                        created_at: current_date_time,
                                        status: 1 
                                    };
                            arr_product_categories.push(x);
                        });

                        await BuyerPreReqProductCategories.bulkCreate(arr_product_categories);
                    }

                    if(req.body.product_groups && req.body.product_groups.length>=1)
                    {
                        let arr_product_groups = [];
                        
                        req.body.product_groups.forEach(function(value)
                        {
                            let x = { buyer_prereq_id: buyer_pre_req.id, 
                                        user_id: user_id, 
                                        buyer_id: buyer.id, 
                                        product_group_id: value,
                                        created_at: current_date_time,
                                        status: 1 
                                    };
                            arr_product_groups.push(x);
                        });

                        await BuyerPreReqProductGroups.bulkCreate(arr_product_groups);
                    }

                    if(req.body.product_items && req.body.product_items.length>=1)
                    {
                        let arr_product_items = [];
                        
                        req.body.product_items.forEach(function(value)
                        {
                            let x = { buyer_prereq_id: buyer_pre_req.id, 
                                        user_id: user_id, 
                                        buyer_id: buyer.id, 
                                        product_item_id: value,
                                        created_at: current_date_time,
                                        status: 1 
                                    };
                            arr_product_items.push(x);
                        });

                        await BuyerPreReqProductItems.bulkCreate(arr_product_items);
                    }

                    return res.status(200).json({
                        status:1,
                        msg: "Success",
                    });
                }
                else
                {
                    return res.status(500).json({
                        status: 0,
                        msg: "Failed to create prereq",
                    });
                }                                
            }
        }
    }
    catch (err) 
    {
        console.log(err);
    }
};

exports.getPreReq = async(req, res) => 
{
    try 
    {
        var user_id = res.token_user.userid;

        var current_date_time = moment().format("YYYY-MM-DD HH:mm:ss");

        
            const { page, size } = req.body;
            const { limit, offset } = helper.getPagination(page, size);

            let condition = {status: 1, user_id: user_id};
            
            if(req.body.private_show_id && req.body.private_show_id>0)
            {
                condition.private_show_id = req.body.private_show_id;
            }
        
            BuyerPreReq.findAndCountAll({ attributes:['id', 'user_id', 'buyer_id', 'yrs_in_business', 'production_capacity_per_day', 'aql', 'lead_time', 'difot', 'min_order_per_colorway'], 
                                        where: condition, 
                                        include: [  {
                                                        model: BuyerPreReqCertifications,
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
                                                        model: BuyerPreReqIncoterms,
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
                                                        model: BuyerPreReqMarketExposure,
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
                                                        model: BuyerPreReqPaymentTerms,
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
                                                        model: BuyerPreReqProductCategories,
                                                        required: false,
                                                        attributes:['id', 'product_category_id', 'status',],
                                                        where: {status:1},
                                                        include:[{
                                                            model: ProductCategories,
                                                            required: false,
                                                            attributes:['id', 'title',],
                                                          }
                                                        ],
                                                    },
                                                    {
                                                        model: BuyerPreReqProductGroups,
                                                        required: false,
                                                        attributes:['id', 'product_group_id', 'status',],
                                                        where: {status:1},
                                                        include:[{
                                                            model: ProductGroups,
                                                            required: false,
                                                            attributes:['id', 'title', ],
                                                          }
                                                        ],
                                                    },
                                                    {
                                                        model: BuyerPreReqProductItems,
                                                        required: false,
                                                        attributes:['id', 'product_item_id', 'status',],
                                                        where: {status:1},
                                                        include:[{
                                                            model: ProductItems,
                                                            required: false,
                                                            attributes:['id', 'title',],
                                                          }
                                                        ],
                                                    },
                                                    
                                                ],
                                        limit, 
                                        offset,
                                    })
            .then(data => {
                const response = helper.getPagingData(data, page, limit);
                
                res.send(response);
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


