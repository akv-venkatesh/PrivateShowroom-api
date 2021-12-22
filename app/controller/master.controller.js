const env = require('../config/env.js');
const db = require('../config/db.config.js');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const moment = require('moment-timezone'); const { where } = require('sequelize');
const helper = require('../middleware/helper.js');
const productagegroupsschema = require('../middleware/validators/productagegroups-schema.js');
const m_product_colors = require('../model/m_product_colors.js');

const countries = db.m_country;
const payterms = db.m_payment_terms;
const constitutions = db.m_constitution;
const certifications = db.certifications;
const incoterms = db.m_incoterms
const product_sizes = db.m_product_sizes;
const product_items = db.m_product_items;
const product_age_groups = db.m_product_age_groups;
const product_categories = db.m_product_categories;
const product_colors = db.product_colors;
const product_genders = db.m_product_genders;
const product_groups = db.m_product_groups;





  //#region product_groups

  exports.GetAllproductgroups = (req, res) => {

    const { page, size } = req.body;
    const { limit, offset } = helper.getPagination(page, size);
  
    let condition = {'$status$': 1 };
    product_groups.findAndCountAll({ attributes:['id', 'title'], 
    where: condition,
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
  };

  exports.AddNewproductgroup = (req, res) => {
    if (!req.body.title) {
      res.status(500).send({ message: "content cannot be empty" })
    }
    const newprdclr = {
      title: req.body.title,
      color_code: req.body.color_code,
      created_by: 1,
      status: req.body.status ? req.body.status : 0
    }

    product_groups.create(newprdclr)
      .then(data => send(data))
      .catch(err => {
        res.send({ message: err.message })
      })
  }

  
//#region   Country
exports.GetAllcountries = (req, res) => {

  if(res.token_user.usertype!=1) // only super admins
  {
      return res.status(500).send({status:0, msg:"Invalid access!"});
  }

  const { page, size } = req.body;
  const { limit, offset } = helper.getPagination(page, size);

  let condition = {'$status$': 1 };

  countries.findAndCountAll({ attributes:['id', 'title'], 
  where: condition,
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
};

//POST Create
exports.AddnewCountry = (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const newcountry = {
    title: req.body.title,
    status: req.body.status ? req.body.status : 0
  }
  countries.create(newcountry)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
  }
 


  exports.EditCountry = async(req, res) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  const editcountry = await countries.findOne({
    where: {id: req.body.id}
});

if (editcountry){

  countries.update(
    {
      title : req.body.title
    },
    { where:{
      id: req.body.id}
    }).then(() => {
      console.log("country updated successfully");
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
}

//#endregion

//#region Paymentterms

exports.GetAllpaymentterms = (req, res) => {

  const { page, size } = req.body;
  const { limit, offset } = helper.getPagination(page, size);

  let condition = {'$status$': 1 };

  payterms.findAndCountAll({ attributes:['id', 'title'], 
  where: condition,
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
};

exports.Addnewpaymentterm = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const newpayterms = {
    title: req.body.title,
    status: req.body.status ? req.body.status : 0
  }
  payterms.create(newpayterms)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}

exports.Editpaymentterm = async(req, res) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  const editpayterm = await countries.findOne({
    where: {id: req.body.id}
});

if (editpayterm){

  payterms.update(
    {
      title : req.body.title
    },
    { where:{
      id: req.body.id}
    }).then(() => {
      console.log("paymentterms updated successfully");
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
}
//#endregion

//#region  constitution


exports.GetAllconstitutions = (req, res) => {

  const { page, size } = req.body;
  const { limit, offset } = helper.getPagination(page, size);

  let condition = {'$status$': 1 };

  constitutions.findAndCountAll({ attributes:['id', 'title'], 
  where: condition,
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
};

exports.Addnewconstitution = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const newconstitutions = {
    title: req.body.title,
    status: req.body.status ? req.body.status : 0
  }
  constitutions.create(newconstitutions)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}

exports.Editconstitution = async(req, res) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  const editconstitution = await constitutions.findOne({
    where: {id: req.body.id}
});

if (editconstitution){

  payterms.update(
    {
      title : req.body.title
    },
    { where:{
      id: req.body.id}
    }).then(() => {
      //console.log("constitution updated successfully");
      return res.status(200).json({
          msg: "constitution updated successfully"
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

//#endregion

//#region certifications

exports.GetAllcertifications = (req, res) => {

  const { page, size } = req.body;
  const { limit, offset } = helper.getPagination(page, size);

  let condition = {'$status$': 1 };
  certifications.findAndCountAll({ attributes:['id', 'title'], 
  where: condition,
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
};

exports.Addnewcertification = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const newcertifications = {
    title: req.body.title,
    certification_type: req.body.certification_type,
    status: req.body.status ? req.body.status : 0
  }
  certifications.create(newcertifications)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}

exports.Editcertification = async(req, res) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  const editcertification = await certifications.findOne({
    where: {id: req.body.id}
});

if (editcertification){

  payterms.update(
    {
      title : req.body.title
    },
    { where:{
      id: req.body.id}
    }).then(() => {
      //console.log("constitution updated successfully");
      return res.status(200).json({
          msg: "certification updated successfully"
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
//#endregion

//#region incoterms

exports.GetAllincoterms = (req, res) => {

  const { page, size } = req.body;
  const { limit, offset } = helper.getPagination(page, size);

  let condition = {'$status$': 1 };

  incoterms.findAndCountAll({ attributes:['id', 'title'], 
  where: condition,
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
};

exports.Addnewincoterm = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const newincoterms = {
    title: req.body.title,
    certification_type: req.body.certification_type,
    status: req.body.status ? req.body.status : 0
  }
  incoterms.create(newincoterms)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}
exports.Editnewincoterm = async(req, res) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  const editnewincoterm = await incoterms.findOne({
    where: {id: req.body.id}
});

if (editnewincoterm){

  incoterms.update(
    {
      title : req.body.title
    },
    { where:{
      id: req.body.id}
    }).then(() => {
      return res.status(200).json({
          msg: "incoterm updated successfully"
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
//#endregion

//#region product_sizes

exports.GetAllproductsizes = (req, res) => {

  const { page, size } = req.body;
  const { limit, offset } = helper.getPagination(page, size);

  let condition = {'$status$': 1 };

  product_sizes.findAndCountAll({ attributes:['id', 'title'], 
  where: condition,
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
};

exports.AddNewProductsize = (req, res) => {
  if (!req.body.title) {
    res.send({ message: "content cannot be empty" })
  }

  if (res.token_user.usertype != 1) // only super admins
  {
    return res.status(500).send({ status: 0, msg: "Invalid access!" });
  }
  const newproductsize = {
    title: req.body.title,
    created_by: 1,
    status: req.body.status ? req.body.status : 0
  }
  product_sizes.create(newproductsize)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send(message = err.message)
    })
}

exports.EditProductsize = async(req, res) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  const editProductsize = await product_sizes.findOne({
    where: {id: req.body.id}
});

if (editProductsize){

  product_sizes.update(
    {
      title : req.body.title
    },
    { where:{
      id: req.body.id}
    }).then(() => {
      return res.status(200).json({
          msg: "Productsize updated successfully"
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
//#endregion

//#region product_items

exports.GetAllproductItems = (req, res) => {
 const { page, size } = req.body;
  const{ limit, offset } = helper.getPagination(page, size);

  let condition = {'$status$': 1 };
  product_items.findAndCountAll({ attributes:['id', 'title'], 
  where: condition,
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
};

exports.AddNewProductitem = (req, res) => {
  if (!req.body.title) {
    res.status(500).send({ message: "content cannot be empty" });
  }
  const newproductitem = {
    title: req.body.title,
    created_by: 1,
    created_at: VarDate,
    status: req.body.status ? req.body.status : 0
  }
  product_items.create(newproductitem)
    .then(data => {
      res.status(200).send(data)
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    });
}

exports.EditProductitem = async(req, res) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  const editProductitem = await product_items.findOne({
    where: {id: req.body.id}
});

if (editProductitem){

  product_items.update(
    {
      title : req.body.title
    },
    { where:{
      id: req.body.id}
    }).then(() => {
      return res.status(200).json({
          msg: "Productitem updated successfully"
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
//#endregion

//#region product_age_groups


exports.GetAllproductagegroups = (req, res) => {

  const { page, size } = req.body;
  const { limit, offset } = helper.getPagination(page, size);

  let condition = {'$status$': 1 };
  product_age_groups.findAndCountAll({ attributes:['id', 'title', 'gender_id', 'from_age', 'to_age', 'display_order', 'created_by', 'created_at', 'status'], 
  where: condition,
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
};


exports.AddNewProductagegroup = (req, res) => {
  if (!req.body.title) {
    res.status(500).send({ message: "Content Cannot Be Empty" })
  }

  const newprdage_groups = {
    gender_id: req.body.gender_id,
    from_age: req.body.from_age,
    to_age: req.body.to_age,
    display_order: req.body.display_order,
    created_by: 1,
    created_at: "",
    status: req.body.status ? req.body.status : 0
  }

  product_age_groups.create(newprdage_groups)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}
exports.EditProductagegroup = async(req, res) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  const editProductagegroup = await product_age_groups.findOne({
    where: {id: req.body.id}
});

if (editProductagegroup){

  product_age_groups.update(
    {
      title : req.body.title
    },
    { where:{
      id: req.body.id}
    }).then(() => {
      return res.status(200).json({
          msg: "Product_age_group updated successfully"
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
//#endregion

//#region product_categories

exports.GetAllproduct_categories = (req, res) => {

  const { page, size } = req.body;
  const { limit, offset } = helper.getPagination(page, size);

  let condition = {'$status$': 1 };
  product_categories.findAndCountAll({ attributes:['id', 'title'], 
  where: condition,
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
};

exports.AddNewProductcategorie = (req, res) => {

  const newproductcategorie = {
    title: req.body.title,
    created_by: req.title,
    created_at: req.title,
    status: req.body.status ? req.body.status : 0
  }

  product_categories.create(newproductcategorie)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

//#endregion

//#region product_gender 

exports.GetAllproductgenders = (req, res) => {

  const { page, size } = req.body;
  const { limit, offset } = helper.getPagination(page, size);

  let condition = {'$status$': 1 };

  product_genders.findAndCountAll({ attributes:['id', 'title'], 
  where: condition,
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
};


//POST Create
exports.AddNewProductgender = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const newProductgender = {
    title: req.body.title,
    status: req.body.status ? req.body.status : 0
  }
  product_genders.create(newProductgender)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
}

exports.EditProductgender = async(req, res) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  const editProductgender = await product_genders.findOne({
    where: {id: req.body.id}
});

if (editProductgender){

  product_genders.update(
    {
      title : req.body.title
    },
    { where:{
      id: req.body.id}
    }).then(() => {
      return res.status(200).json({
          msg: "Productitem updated successfully"
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
//#endregion

//#region product_colors

exports.GetAllproductColors = (req, res) => {

  const { page, size } = req.body;
  const { limit, offset } = helper.getPagination(page, size);

  let condition = {'$status$': 1 };
  product_colors.findAndCountAll({ attributes:['id', 'title'], 
  where: condition,
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
};

exports.AddNewProductcolor = (req, res) => {
  if (!req.body.title) {
    res.status(500).send({ message: "content cannot be empty" })
  }
  const newprdclr = {
    title: req.body.title,
    color_code: req.body.color_code,
    created_by: 1,
    status: req.body.status ? req.body.status : 0
  }

  product_colors.create(newprdclr)
    .then(data => send(data))
    .catch(err => {
      res.send({ message: err.message })
    })

    
exports.EditProductcolor = async(req, res) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }


  const editProductcolor = await m_product_colors.findOne({
    where: {id: req.body.id}
});

if (editProductcolor){

  product_genders.update(
    {
      title : req.body.title
    },
    { where:{
      id: req.body.id}
    }).then(() => {
      return res.status(200).json({
          msg: "Productcolor updated successfully"
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
  //#endregion



}

//#endregion