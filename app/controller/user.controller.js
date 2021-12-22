const env = require('../config/env.js');
const db = require('../config/db.config.js');
const sequelize=require('sequelize'); 
const Op = sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
const moment = require('moment-timezone');
const helper = require('../middleware/helper.js');

const Users = db.user;
const Admins = db.admin;
const Sellers = db.seller;
const Buyers = db.buyer;
const Country = db.country;


exports.test = (req, res) => 
{
    return res.status(200).json({
        msg: moment(),
        msg1: moment().format("YYYY-MM-DD HH:mm:ss"),
        msg2: moment().unix(),
        msg3: moment("2021-10-15 10:20:16").unix(),
    });
        
};

exports.test1 = (req, res) => 
{
    bcrypt.hash(req.body.name, 10)
        .then(hash => {
            return res.status(200).json({
                msg: hash,
                user_details:res.token_user
            });
        });
};

// Retrieve all data.
exports.omtest = (req, res) => {
    const { page, size, title } = req.body;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    const { limit, offset } = helper.getPagination(page, size);
  
    Country.findAndCountAll({ attributes:['id', 'title'], where: condition, limit, offset })
      .then(data => {
        const response = helper.getPagingData(data, page, limit);
        
        res.send(response);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

// Login 
exports.login = async(req, res) => 
{
    try 
    {
        // Get user input
        var username = "";
        var password = "";
    
        // Validate user input
        if (!(req.body.username && req.body.password)) 
        {
            return res.status(400).send({status:0, msg:"Username & Password is required"});
        }
        else
        {
            username = req.body.username.trim().toLowerCase();
            password = req.body.password.trim();
        }
        
        // Validate if user exist in our database
        const user = await Users.findOne({
                                            where: {
                                                status: {[Op.ne]: -2},
                                                username: sequelize.where(
                                                    sequelize.fn('lower', sequelize.col('username')), 
                                                    sequelize.fn('lower', username),
                                                ),
                                            }
                                        });

        if (user && (await bcrypt.compare(password, user.password))) 
        {

            if(user.status==1)
            {
                var display_name = "User";

                if(user.user_type==1) // if admin
                {
                    var get_admin = await Admins.findOne({where: {
                                                                    user_id: user.id,
                                                                    status: 1
                                                                },
                                                        });

                    if(get_admin.name)
                    {
                        display_name = get_admin.name;
                    }                                    
                }
                else if(user.user_type==2) // if seller
                {
                    var get_seller = await Sellers.findOne({where: {
                                                                    user_id: user.id,
                                                                    status: 1
                                                                },
                                                        });

                    if(get_seller.company_name)
                    {
                        display_name = get_seller.company_name;
                    }                                    
                }
                else if(user.user_type==3) // if buyer
                {
                    var get_buyer = await Buyers.findOne({where: {
                                                                    user_id: user.id,
                                                                    status: 1
                                                                },
                                                        });

                    if(get_buyer.company_name)
                    {
                        display_name = get_buyer.company_name;
                    }                                    
                }

                const token = jwt.sign({
                                    userid: user.id,
                                    usertype: user.user_type,
                                    name: display_name,
                                }, env.password_token, {
                                    expiresIn: '7d'
                                });

                return res.status(200).json({
                                                status:1,
                                                msg:"Success",
                                                user_id:user.id,
                                                user_type: user.user_type,
                                                name: display_name,
                                                token: token,
                                                expiresIn: 604800
                                            });
            }
            else if(user.status==0)
            {
                return res.status(400).send({status:0, msg:"Your account has been suspended. Please contact admin!"});
            }
            else if(user.status==-1)
            {
                return res.status(400).send({status:0, msg:"Your account verfication been pending. Please verify your account!"});
            }  
            else if(user.status==-2)
            {
                return res.status(400).send({status:0, msg:"Your account has been removed"});
            }                      
            else
            {
                return res.status(400).send({status:0, msg:"Something went wrong. Please try again!"});
            }
        }
        else
        {
            return res.status(400).send({status:0, msg:"Invalid username or password!"});
        }
      }
      catch (err) 
      {
        console.log(err);
      }
};


// Create a new Seller account
exports.sellerSignup = async(req, res) => {

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
            //console.log(req.body);
            var hashed_password = await bcrypt.hash(req.body.password, 10);
            var current_date_time = moment().format("YYYY-MM-DD HH:mm:ss");


            Users.create({
                "username": req.body.email,
                "password": hashed_password,
                "user_type": 2,
                "created_at": current_date_time,
                "status": -1
            }).then(User => {
                        console.log(User.id);
                        console.log("user created successfull");

                        Sellers.create({
                                    "user_id": User.id,
                                    "company_name": req.body.company_name,
                                    "constitution_id": req.body.constitution_id,
                                    "contact_person": (req.body.contact_person) ? req.body.contact_person : "NULL",
                                    "designation": (req.body.designation) ? req.body.designation : "NULL",
                                    "phone": (req.body.phone) ? req.body.phone : "NULL",
                                    "email": (req.body.email) ? req.body.email : "NULL",
                                    "address": (req.body.address) ? req.body.address : "NULL",
                                    "facebook_link": (req.body.facebook_link) ? req.body.facebook_link : "NULL",
                                    "linkedin_link": (req.body.linkedin_link) ? req.body.linkedin_link : "NULL",
                                    "created_at": current_date_time,
                                    "status": 1  
                        }).then(Seller => {

                            return res.status(200).json({
                                msg: "Your account created successfully.",
                                user_id: User.id,
                                seller_id:Seller.id,
                            });

                        }).catch(err => {
                                            console.log(err);
                                            res.status(500).json({
                                                msg: "error",
                                                details: err
                                            });
                                        });
                        
                    }).catch(err => {
                                        console.log(err);
                                        res.status(500).json({
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

// Create a new Buyer account
exports.buyerSignup = async(req, res) => {

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
            //console.log(req.body);
            var hashed_password = await bcrypt.hash(req.body.password, 10);
            var current_date_time = moment().format("YYYY-MM-DD HH:mm:ss");

            Users.create({
                "username": req.body.email,
                "password": hashed_password,
                "user_type": 3,
                "created_at": current_date_time,
                "status": -1
            }).then(User => {
                        console.log(User.id);
                        console.log("user created successfull");

                        Buyers.create({
                                    "user_id": User.id,
                                    "company_name": req.body.company_name,
                                    "contact_person": (req.body.contact_person) ? req.body.contact_person : "NULL",
                                    "designation": (req.body.designation) ? req.body.designation : "NULL",
                                    "phone": (req.body.phone) ? req.body.phone : "NULL",
                                    "email": (req.body.email) ? req.body.email : "NULL",
                                    "address": (req.body.address) ? req.body.address : "NULL",
                                    "facebook_link": (req.body.facebook_link) ? req.body.facebook_link : "NULL",
                                    "linkedin_link": (req.body.linkedin_link) ? req.body.linkedin_link : "NULL",
                                    "created_at": current_date_time,
                                    "status": 1  
                        }).then(Buyer => {

                            return res.status(200).json({
                                msg: "Your account created successfully.",
                                user_id: User.id,
                                buyer_id:Buyer.id,
                            });

                        }).catch(err => {
                                            console.log(err);
                                            res.status(500).json({
                                                msg: "error",
                                                details: err
                                            });
                                        });
                        
                    }).catch(err => {
                                        console.log(err);
                                        res.status(500).json({
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

//Change  password
exports.changePassword = async(req, res) => {

    try
    {
        var user_id = res.token_user.userid;
        // Get user input
        var current_password = "";
        var new_password = "";
        var confirm_password = "";
    
        // Validate user input
        if (!(req.body.current_password && req.body.new_password && req.body.confirm_password)) 
        {
            return res.status(400).send({status:0, msg:"All input fileds are required"});
        }
        else
        {
            current_password = req.body.current_password.trim();
            new_password = req.body.new_password.trim();
            confirm_password = req.body.confirm_password.trim();
        }

        if(new_password!==confirm_password)
        {
            return res.status(400).send({status:0, msg:"New password and confirm password must be same"});
        }
        else
        {
            const user = await Users.findOne({
                                                where: {id: user_id}
                                            });

            if (user && (await bcrypt.compare(current_password, user.password))) 
            {  
                const hashed_password = await bcrypt.hash(new_password, 10);

                Users.update({
                            password: hashed_password,
                        
                        }, {
                            where: {
                                id: user_id
                            }
                        }).then(() => {
                            console.log("Password updated successfully");
                            return res.status(200).json({
                                status:1, 
                                msg: "Password updated successfully"
                            });
                        }).catch(err => {
                            console.log(err);
                            return res.status(500).json({
                                msg: "error",
                                details: err
                            });
                        });
            }
            else
            {
                return res.status(400).send({status:0, msg:"Current password is wrong!"});
            }            
        }
    }
    catch (err) 
    {
        console.log(err);
    }
    
};

// Accept Buyer/Seller Registration by admin
exports.acceptUserRegistration = async(req, res) => {

    try
    {
        if(res.token_user.usertype!=1) // only super admins
        {
            return res.status(500).send({status:0, msg:"Invalid access!"});
        }
        else
        {
            var user_id = "";
        
            // Validate user input
            if (!(req.body.user_id)) 
            {
                return res.status(400).send({status:0, msg:"All input fileds are required"});
            }
            else
            {
                user_id = req.body.user_id.trim();
            }

            
            const user = await Users.findOne({
                                                where: {id: user_id, user_type: {[Op.ne]: 1}, status: -1}
                                            });

            if (user) 
            {  
                Users.update({
                            status: 1,
                        }, {
                            where: {
                                id: user_id
                            }
                        }).then(() => {
                            console.log("Status updated successfully");
                            return res.status(200).json({
                                status:1, 
                                msg: "Status updated successfully"
                            });
                        }).catch(err => {
                            console.log(err);
                            return res.status(500).json({
                                msg: "error",
                                details: err
                            });
                        });
            }
            else
            {
                return res.status(400).send({status:0, msg:"Invalid user!"});
            }            
        }
    }
    catch (err) 
    {
        console.log(err);
    }
    
};

//Change  User Active/Inactive status by admin
exports.changeUserStatus = async(req, res) => {

    try
    {
        if(res.token_user.usertype!=1) // only super admins
        {
            return res.status(500).send({status:0, msg:"Invalid access!"});
        }
        else
        {
            var user_id = "";
            var new_status = "";
        
            // Validate user input
            if (!(req.body.user_id && req.body.status)) 
            {
                return res.status(400).send({status:0, msg:"All input fileds are required"});
            }
            else
            {
                user_id = req.body.user_id.trim();
                new_status = req.body.status.trim();
            }

            
            const user = await Users.findOne({
                                                where: {id: user_id, user_type: {[Op.ne]: 1}}
                                            });

            if (user) 
            {  
                Users.update({
                            status: new_status,
                        
                        }, {
                            where: {
                                id: user_id
                            }
                        }).then(() => {
                            console.log("Status updated successfully");
                            return res.status(200).json({
                                status:1, 
                                msg: "Status updated successfully"
                            });
                        }).catch(err => {
                            console.log(err);
                            return res.status(500).json({
                                msg: "error",
                                details: err
                            });
                        });
            }
            else
            {
                return res.status(400).send({status:0, msg:"Invalid user!"});
            }            
        }
    }
    catch (err) 
    {
        console.log(err);
    }
    
};

// Delete users by admin
exports.deleteUser = async(req, res) => {

    try
    {
        if(res.token_user.usertype!=1) // only super admins
        {
            return res.status(500).send({status:0, msg:"Invalid access!"});
        }
        else
        {
            var user_id = "";
        
            // Validate user input
            if (!(req.body.user_id)) 
            {
                return res.status(400).send({status:0, msg:"All input fileds are required"});
            }
            else
            {
                user_id = req.body.user_id.trim();
            }

            
            const user = await Users.findOne({
                                                where: {id: user_id, user_type: {[Op.ne]: 1}}
                                            });

            if(user) 
            {
                Users.update({
                            status: -2,
                        }, {
                            where: {
                                id: user_id
                            }
                        }).then(() => {
                            console.log("Deleted successfully");
                            return res.status(200).json({
                                status:1, 
                                msg: "Deleted successfully"
                            });
                        }).catch(err => {
                            console.log(err);
                            return res.status(500).json({
                                msg: "error",
                                details: err
                            });
                        });
            }
            else
            {
                return res.status(400).send({status:0, msg:"Invalid user!"});
            }            
        }
    }
    catch (err) 
    {
        console.log(err);
    }
};

//List all sellers
exports.listallsellers = async(req, res) => {

    try
    {
        if(res.token_user.usertype!=1) // only super admins
        {
            return res.status(500).send({status:0, msg:"Invalid access!"});
        }
        else
        {
            const { page, size } = req.body;
            const { limit, offset } = helper.getPagination(page, size);

            let condition = {'$user.status$': {[Op.gte]: 0}};

            if(req.body.verification_pending)
            {
               condition = {'$user.status$': {[Op.eq]: -1}};
            }

        
            Sellers.findAndCountAll({ attributes:['id', 'user_id', 'company_name', 'contact_person', 'designation', 'phone', 'email', 'address',], 
                                        where: condition, 
                                        include: [{
                                                    model: Users,
                                                    required: true,
                                                    attributes:['id', 'user_type', 'status',]
                                                }],
                                        limit, 
                                        offset,
                                    })
            .then(data => {
                const response = helper.getPagingData(data, page, limit);
                
                res.send(response);
            })
            .catch(err => {
                res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
                });
            });
        }
    }
    catch (err) 
    {
        console.log(err);
    }
    
};

//List all buyers
exports.listallbuyers = async(req, res) => {

    try
    {
        if(res.token_user.usertype!=1) // only super admins
        {
            return res.status(500).send({status:0, msg:"Invalid access!"});
        }
        else
        {
            const { page, size } = req.body;
            const { limit, offset } = helper.getPagination(page, size);

            let condition = {'$user.status$': {[Op.gte]: 0}};

            if(req.body.verification_pending)
            {
               condition = {'$user.status$': {[Op.eq]: -1}};
            }

        
            Buyers.findAndCountAll({ attributes:['id', 'user_id', 'company_name', 'contact_person', 'designation', 'phone', 'email', 'address',], 
                                        where: condition, 
                                        include: [{
                                                    model: Users,
                                                    required: true,
                                                    attributes:['id', 'user_type', 'status',]
                                                }],
                                        limit, 
                                        offset,
                                    })
            .then(data => {
                const response = helper.getPagingData(data, page, limit);
                
                res.send(response);
            })
            .catch(err => {
                res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
                });
            });
        }
    }
    catch (err) 
    {
        console.log(err);
    }
    
};