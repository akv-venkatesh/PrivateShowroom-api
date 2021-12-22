const db = require("../../config/db.config");

const dbproductsizes = db.m_product_sizes;



const productsizesschema = {
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
                    return dbproductsizes.findOne({
                        where: {
                            title: value
                        }
                    }).then(data => {
                        if (data && data.id > 0) {
                            return Promise.reject('title already taken!')
                        }
                    });
                }
            },
        }
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
}

module.exports = productsizesschema;