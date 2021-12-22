const env = require('../config/env.js');
const db = require('../config/db.config.js');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const moment = require('moment-timezone'); 
const helper = require('../middleware/helper.js');

const PrivateShows = db.private_shows;


exports.test = (req, res) => 
{
    return res.status(200).json({
        msg: moment(),
        msg1: moment().format("YYYY-MM-DD HH:mm:ss"),
        msg2: moment().unix(),
        msg3: moment("2021-10-15 10:20:16").unix(),
    });
        
};

exports.ListAllPrivateShows = (req, res) => {

    if(res.token_user.usertype!=1) // only super admins
    {
        return res.status(500).send({status:0, msg:"Invalid access!"});
    }

    const { page, size } = req.body;
    const { limit, offset } = helper.getPagination(page, size);

    var condition = { status:1 };

    if(req.body.show_status)
    {
      condition.show_status = req.body.show_status;
    }

    PrivateShows.findAndCountAll({ attributes:['id', 'title', 'start_date', 'end_date', 'show_status'], 
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


exports.AddNewPrivateShow = (req, res) => {

  try
  {
      if(res.token_user.usertype!=1) // only super admins
      {
          return res.status(500).send({status:0, msg:"Invalid access!"});
      }
      else
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
              var current_date_time = moment().format("YYYY-MM-DD HH:mm:ss");

              var private_show_data = {
                                        title: req.body.title,
                                        start_date: req.body.start_date,
                                        end_date: req.body.end_date,
                                        created_at: current_date_time,
                                        status: 1,
                                      };

              PrivateShows.create(private_show_data)
                .then(data => {
                  res.send(data);
                })
                .catch(err => {
                  res.status(500).send({
                    message: err.message
                  });
                });
          }
      }
  }
  catch (err) 
  {
      console.log(err);
  }
}
 

exports.updatePrivateShow = async(req, res) => {

  try
  {
      if(res.token_user.usertype!=1) // only super admins
      {
          return res.status(500).send({status:0, msg:"Invalid access!"});
      }
      else
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
            const private_show = await PrivateShows.findOne({
                                                where: {id: req.body.private_show_id}
                                            });

            if(private_show) 
            {
                var current_date_time = moment().format("YYYY-MM-DD HH:mm:ss");

                var private_show_data = {
                                          title: req.body.title,
                                          start_date: req.body.start_date,
                                          end_date: req.body.end_date,
                                        };

                PrivateShows.update(private_show_data, {where: {id: req.body.private_show_id}})
                  .then(data => {
                    return res.status(200).json({
                      status:1, 
                      msg: "Updated successfully"
                  });
                  })
                  .catch(err => {
                    res.status(500).send({
                      message: err.message
                    });
                  });
              }
              else
              {
                  return res.status(400).send({status:0, msg:"Invalid private show!"});
              }
          }
      }
  }
  catch (err) 
  {
      console.log(err);
  }
}


exports.deletePrivateShow = async(req, res) => {

  try
  {
      if(res.token_user.usertype!=1) // only super admins
      {
          return res.status(500).send({status:0, msg:"Invalid access!"});
      }
      else
      {
          if (!req.body.private_show_id) 
          {
              return res.status(400).json({status:0, msg:"Private show id is missing!"});
          }
          else
          {
            const private_show = await PrivateShows.findOne({
                                                where: {id: req.body.private_show_id}
                                            });

            if(private_show) 
            {
                var current_date_time = moment().format("YYYY-MM-DD HH:mm:ss");

                var private_show_data = {
                                          status: -1,
                                        };

                PrivateShows.update(private_show_data, {where: {id: req.body.private_show_id}})
                  .then(data => {
                    return res.status(200).json({
                      status:1, 
                      msg: "Deleted successfully"
                  });
                  })
                  .catch(err => {
                    res.status(500).send({
                      message: err.message
                    });
                  });
              }
              else
              {
                  return res.status(400).send({status:0, msg:"Invalid private show!"});
              }
          }
      }
  }
  catch (err) 
  {
      console.log(err);
  }
}
