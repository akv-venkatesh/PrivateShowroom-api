
const db = require('../../config/db.config.js');
const Users = db.user;

const buyerSchema = {

    createSchema: {
    
              email: {
                  notEmpty: true,
                  isEmail: true,
                  errorMessage: "Email id should be a valid format",
                  custom: {
                      options: value => {
                          return Users.findOne({
                            where: {
                              username: value
                            }
                          }).then(user => { 
                              if (user && user.id>0) 
                              { 
                                  return Promise.reject('Email id already taken!')
                              }
                          });
                      }
                  }
              },
              password: {
                  notEmpty: true,
                  errorMessage: "Password can not be blank",
                  isLength: {
                      options: { min: 5, max: 50 },
                      errorMessage: "minimum 5 characteres and maximum 50 characteres"
                  },
                  
              },
              company_name: {
                  notEmpty: true,
                  errorMessage: "Company name cannot be empty",
                  isLength: {
                      options: { min: 2, max: 50 },
                      errorMessage: "minimum 2 characteres and maximum 50 characteres"
                  },
              },
              contact_person: {
                notEmpty: true,
                errorMessage: "Contact person cannot be empty",
                isLength: {
                    options: { min: 2, max: 50 },
                    errorMessage: "minimum 2 characteres and maximum 50 characteres"
                },
              },
              designation: {
                notEmpty: true,
                errorMessage: "Designation cannot be empty",
                isLength: {
                    options: { min: 2, max: 50 },
                    errorMessage: "minimum 2 characteres and maximum 50 characteres"
                },
              },
              phone: {
                notEmpty: true,
                errorMessage: "Designation cannot be empty",
                isLength: {
                    options: { min: 2, max: 50 },
                    errorMessage: "minimum 2 characteres and maximum 50 characteres"
                },
              },
              address: {
                notEmpty: true,
                errorMessage: "Address cannot be empty",
                isLength: {
                    options: { min: 2, max: 2000 },
                    errorMessage: "minimum 2 characteres and maximum 2000 characteres"
                },
              },              
      },
    updateSchema: {

                company_name: {
                    notEmpty: true,
                    errorMessage: "Company name cannot be empty",
                    isLength: {
                        options: { min: 2, max: 50 },
                        errorMessage: "minimum 2 characteres and maximum 50 characteres"
                    },
                },
                contact_person: {
                notEmpty: true,
                errorMessage: "Contact person cannot be empty",
                isLength: {
                    options: { min: 2, max: 50 },
                    errorMessage: "minimum 2 characteres and maximum 50 characteres"
                    },
                },
                designation: {
                notEmpty: true,
                errorMessage: "Designation cannot be empty",
                isLength: {
                    options: { min: 2, max: 50 },
                    errorMessage: "minimum 2 characteres and maximum 50 characteres"
                    },
                },
                phone: {
                notEmpty: true,
                errorMessage: "Designation cannot be empty",
                isLength: {
                    options: { min: 2, max: 50 },
                    errorMessage: "minimum 2 characteres and maximum 50 characteres"
                    },
                },
                address: {
                notEmpty: true,
                errorMessage: "Address cannot be empty",
                isLength: {
                    options: { min: 2, max: 2000 },
                    errorMessage: "minimum 2 characteres and maximum 2000 characteres"
                    },
                },
      },

    preReqSchema: {
        
        yrs_in_business: {
            notEmpty: true,
            isNumeric: true,
            errorMessage: "Years in business is required",
            isLength: {
                options: { min: 1, max: 3 },
                errorMessage: "Years in business should be a valid number"
            },
        },
        production_capacity_per_day: {
            notEmpty: true,
            isNumeric: true,
            errorMessage: "Production capacity per day is required",
            isLength: {
                options: { min: 1, max: 8 },
                errorMessage: "Production capacity per day should be a valid number"
            },
        },
        aql: {
            notEmpty: true,
            isNumeric: true,
            errorMessage: "Acceptable Quality Level is required",
            isLength: {
                options: { min: 1, max: 8 },
                errorMessage: "Acceptable Quality Level should be a valid number"
            },
        },      
        lead_time: {
            notEmpty: true,
            isNumeric: true,
            errorMessage: "Lead Time expected is required",
            isLength: {
                options: { min: 1, max: 8 },
                errorMessage: "Lead Time expected should be a valid number"
            },
        },
        difot: {
            notEmpty: true,
            isNumeric: true,
            errorMessage: "Delivery in full on time is required",
            isLength: {
                options: { min: 1, max: 8 },
                errorMessage: "Delivery in full on time should be a valid number"
            },
        },
        min_order_per_colorway: {
            notEmpty: true,
            isNumeric: true,
            errorMessage: "Minimum order per design colourway is required",
            isLength: {
                options: { min: 1, max: 8 },
                errorMessage: "Minimum order per design colourway should be a valid number"
            },
        }, 
        certifications: {
            notEmpty: true,
            isArray: true,
            errorMessage: "Certifications is required",
        }, 
        "certifications.*": {
            isInt: true
        },
        incoterms: {
            notEmpty: true,
            isArray: true,
            errorMessage: "Incoterms is required",
        }, 
        "incoterms.*": {
            isInt: true
        },
        market_exposure: {
            notEmpty: true,
            isArray: true,
            errorMessage: "Market exposure is required",
        }, 
        "market_exposure.*": {
            isInt: true
        },
        payment_terms: {
            notEmpty: true,
            isArray: true,
            errorMessage: "Payment terms is required",
        }, 
        "payment_terms.*": {
            isInt: true
        },
        product_categories: {
            notEmpty: true,
            isArray: true,
            errorMessage: "Product categories is required",
        }, 
        "product_categories.*": {
            isInt: true
        },
        product_groups: {
            notEmpty: true,
            isArray: true,
            errorMessage: "Product groups is required",
        }, 
        "product_groups.*": {
            isInt: true
        },
        product_items: {
            notEmpty: true,
            isArray: true,
            errorMessage: "Product items is required",
        }, 
        "product_items.*": {
            isInt: true
        },
    },  

};


module.exports = buyerSchema;