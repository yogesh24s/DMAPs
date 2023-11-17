'use strict';

const routes = require('express').Router();
var access = require('../../var.js');
var {jwtTokenGenerate, verifyToken} = require('../Shared/jwt.js')
access.DMAPFunc();

routes.use(bodyParser.json());
routes.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);


routes.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Set the content type header to the response object.
  res.setHeader('Content-Type', 'application/json');
  // Pass to next layer of middleware

  next();
});

// Authenticate the user.
routes.post('/api/authenticate', function (req, res) {

  var username = req.body.username;
  var password = req.body.password;
  var date = new Date();

  knex1.select('user_role')
  .from('users')
  .where('username', username)
  .timeout(100000, {cancel: true})
  .map(function (row) { return row; })
  .then(function(usersList = []){
    var userrole = usersList.length && usersList[0].role ? usersList[0].role : 8;

    var token = {
      username : username,
      datetime : date.toString(),
      userrole : userrole
    }

    jwt.sign(token, 'secretkey', {}, (err, token) => {
      jwt.verify(token, 'secretkey', (err, authData) => {
        var path = req.route.path;
        if(err) {
          res.sendStatus(403);
        } else {
          pool.query('SELECT * FROM dmaps.user_credentials WHERE username = ?',[username], function (error, results, fields) {
            if ( error ) {
              access.sendResponse(req, res, {
                status: 202,
                data: {
                  status:false,
                  message:'there is some error with query'
                }
              });
            } else {
              if ( results.length > 0 ) {
                bcrypt.compare(password, results[0].password, function(err, ress) {
                  if ( ress ) {
                    pool.query('SELECT * FROM dmaps.user WHERE employee_id = ?', [results[0].username], function (error1, results1, fields1) {
                      var resultObj = {};
                      if ( error1 ) {
                        resultObj = {
                          status: false,
                          message: 'Could not find the details for the provided username or employee id.'
                        }
                      } else {
                        if ( results1.length > 0 ) {
                          if ( ( results1[0].status === 'Active' || results1[0].status === 'Notice' ) && results1[0].login_access === 'Enabled' ) {
                            resultObj = {
                              status: true,
                              message: 'User authentication is successful!',
                              role: results[0].user_role,
                              empid: results[0].user_name,
                              Status: results1[0].status,
                              Access: results1[0].login_access,
                              token : token
                            }
                          } else {
                            resultObj = {
                              status: false,
                              message: 'Login access denied.',
                              role: results[0].user_role,
                              empid: results[0].user_name,
                              Status: results1[0].status,
                              Access: results1[0].login_access
                            }
                          }
                        } else {
                          resultObj = {
                            status: false,
                            message: 'Could not find the details for the provided username or employee id.'
                          }
                        }
                      }

                      access.sendResponse(req, res, {
                        status: 200,
                        data: resultObj
                      });

                    });
                  } else {
                    access.sendResponse(req, res, {
                      status: 202,
                      data: {
                        status:false,
                        message:"Username and password does not match."
                      }
                    });
                  }
                });
              } else {
                access.sendResponse(req, res, {
                  status: 202,
                  data: {
                    status:false,
                    message:"Username does not exist."
                  }
                });
              }
            }
          })
        }
      })
    })

  });

});


// Change user password.
routes.post('/api/changePassword', function (req, res) {
  console.log(req);
  console.log(req.body);
  var un = req.body.username,
  cp = req.body.Current_Password,
  np = req.body.New_Password;

  knex1.select('id', 'username', 'password')
  .from('aa_hris_users')
  .where('username', un)
  .timeout(100000, {cancel: true})
  .map(function (row) { return row; })
  .then(function(userDetails = []){
    if ( userDetails.length ) {
      bcrypt.compare(cp, userDetails[0].password, function(err, ress) {
        if ( ress ) {
          var salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(np, salt);

          knex1('aa_hris_users')
          .where('id', userDetails[0].id)
          .update({
            password: hash,
            last_password_changed_at: knex1.fn.now()
          })
          .then(function(response){

            res.setHeader('Content-Type', 'application/json');

            access.sendResponse(req, res, {
              status: 200,
              data: {
                result: 'success',
                message:'Your password has been changed. Please log in again.',
              }
            });
            var msg = 'Your password has been changed. Please log in again.';
            // access.logUserActivity(req.authData, msg);
          });
        } else {
          var msg = 'Current password is not valid to change your password.';
          // access.logUserActivity(req.authData, msg);
          res.setHeader('Content-Type', 'application/json');

          access.sendResponse(req, res, {
            status: 200,
            data: {
              result: 'failure',
              message:'Current password is not valid to change your password.'
            }
          });

        }
      });
    } else {
      var msg = 'Sorry, could not change your password. Please contact the administrator.'
      // access.logUserActivity(req.authData, msg);
      res.setHeader('Content-Type', 'application/json');

      access.sendResponse(req, res, {
        status: 200,
        data: {
          result: 'failure',
          message:'Sorry, could not change your password. Please contact the administrator.'
        }
      });
    }
  })
  .catch(function (err) {
    console.log('Error: %s', err.toString());
    var msg = 'Some error occured. Please contact the administrator.';
    // access.logUserActivity(req.authData, msg);
    res.setHeader('Content-Type', 'application/json');

    access.sendResponse(req, res, {
      status: 202,
      data: {
        result: 'failure',
        message:'Some error occured. Please contact the administrator.'
      }
    });
  });

});


//login 

routes.post('/login',  function(req, res){
  //const { username, password } = req.body;
  let username = req.body[0].userName;
  let password =req.body[0].password;
  // console.log({"req.body": req.body});
  // console.log({"req.body": username});
  // console.log({"req.body": password});
  //  let username ="wertyq";
  //  let password = "q";
   var sql = `SELECT * FROM dmaps.company_users WHERE User_Name = '${username}' AND User_Password = '${password}'`;
   

//console.log(sql);
  if( username !== undefined && password !== undefined) {
    pool.query(sql,[username, password], function (err, results, fields) {
      //console.log({"sql":sql});
      //console.log({"err":err});
       if (!err) {
           var response = [],
               dataObj = {};
               //console.log("results",results);
           if (results.length > 0) {
            //console.log({"results":results});
			jwtTokenGenerate(password, username)
            dataObj['users'] = results[0];
               response.push({ 'result': 'success', 'data': dataObj });
              
           } else {
              console.log({"failedresults": results});
               response.push({ 'result': 'error', 'msg': 'No Results Found' });
           }
           
           res.setHeader('Content-Type', 'application/json');
            // res.status(200).send(response);
            access.sendResponse(req, res, {
                status: 200,
                data: response
            });
           
       } else {
           res.status(400).send(err);
       }
   });
  }
  else{
    console.log("username and password ");
  }
});



// Export it.
module.exports = routes;
