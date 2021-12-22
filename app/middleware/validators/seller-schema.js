
const db = require('../../config/db.config.js');
const Users = db.user;

const sellerSchema = {

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
              constitution_id: {
                notEmpty: true,
                errorMessage: "Constitution of the company cannot be empty"
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
            constitution_id: {
              notEmpty: true,
              errorMessage: "Constitution of the company cannot be empty"
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
      }

};


module.exports = sellerSchema;