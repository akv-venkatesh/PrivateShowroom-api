const privateShowSchema = {

    createSchema: {

        title: {
                notEmpty: true,
                errorMessage: "Title cannot be empty",
                isLength: {
                    options: { min: 2, max: 250 },
                    errorMessage: "minimum 2 characteres and maximum 100 characteres"
                },
            },
        start_date: {
            notEmpty: true,
            errorMessage: "Start Date cannot be empty",
        },
        end_date: {
            notEmpty: true,
            errorMessage: "End Datecannot be empty",
        },    
    }, 
    
    updateSchema: {
        private_show_id: {
            notEmpty: true,
            errorMessage: "Private show id cannot be empty",
        },
        title: {
            notEmpty: true,
            errorMessage: "Title cannot be empty",
            isLength: {
                options: { min: 2, max: 250 },
                errorMessage: "minimum 2 characteres and maximum 100 characteres"
            },
        },
        start_date: {
            notEmpty: true,
            errorMessage: "Start Date cannot be empty",
        },
        end_date: {
            notEmpty: true,
            errorMessage: "End Datecannot be empty",
        }, 
    }
};
module.exports = privateShowSchema;