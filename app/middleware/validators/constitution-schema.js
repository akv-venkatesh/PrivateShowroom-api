
const db = require('../../config/db.config.js');

const dbconstitutions = db.m_constitution;

 const constitutionschema ={
    createSchema:{
        title:{
            notEmpty:true,
            errorMessage:"title cannot be empty",
            isAlpha:true,
            errorMessage:"Only Characters are Allowed",
            isLength: {
                options: { min: 2, max:75 },
                errorMessage: "minimum 2 characteres and maximum 50 characteres"
            }, custom: {
                options: value => {
                    return dbconstitutions.findOne({
                      where: {
                        title: value
                      }
                    }).then(data => { 
                        if (data && data.id>0) 
                        { 
                            return Promise.reject('title already taken!')
                        }
                    });
                }
            },
        },
        status:{
            isInt:true,
            errorMessage:"status should be an integer",
            isIn: [[1, -1, 0 ]],
            errorMessage:"status should countain any one of( 1, -1, 0)"
        },
    },updateSchema: {
        id:{
            notEmpty: true,
            errorMessage: "id cannot be empty",
        },
        title: {
            notEmpty: true,
            errorMessage: "title cannot be empty",
            isAlpha: true,
            errorMessage: "Only Characters are Allowed",
            isLength: {
                options: { min: 2, max: 75 },
                errorMessage: "minimum 2 characteres and maximum 50 characteres"
            }
        }
    }
};

module.exports = constitutionschema