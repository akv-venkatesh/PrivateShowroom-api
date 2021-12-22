const db = require('../../config/db.config.js')

const dbcountries = db.m_country;

const countrySchema = {
    createSchema: {

        title: {
            notEmpty: true,
            errorMessage: "title cannot be empty",
            isAlpha: true,
            errorMessage: "Only Characters are Allowed",
            isLength: {
                options: { min: 2, max: 75 },
                errorMessage: "minimum 2 characteres and maximum 50 characteres"
            },
            custom: {
                options: value => {
                    return dbcountries.findOne({
                        where: {
                            title: value
                        }
                    }).then(data => {
                        if (data && data.id > 0) {
                            return Promise.reject('title already taken!')
                        }
                    });
                }
            }
        }
    }, updateSchema: {
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
module.exports = countrySchema;