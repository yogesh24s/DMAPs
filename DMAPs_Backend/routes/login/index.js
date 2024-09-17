'use strict';

const routes = require('express').Router();
var access = require('../../var.js');
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
var { jwtTokenGenerate, verifyToken } = require('../Shared/jwt.js')
const crypto = require('crypto');
const bodyParser = require('body-parser');

access.DMAPFunc();

routes.use(bodyParser.json());
routes.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);
var JWT_SECRET = "fd3991ffa221a66c463b958dfedb6a72adaab45b9bf9e0ce93a29e338744bd9f"

function generateRandomPassword(length) {
	const buffer = crypto.randomBytes(length);
	return buffer.toString('base64')
	  .replace(/[/+=]/g, '') // Remove characters that might cause issues in certain contexts
	  .slice(0, length);     // Trim to the desired length
  }


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
		.timeout(100000, { cancel: true })
		.map(function (row) { return row; })
		.then(function (usersList = []) {
			var userrole = usersList.length && usersList[0].role ? usersList[0].role : 8;

			var token = {
				username: username,
				datetime: date.toString(),
				userrole: userrole
			}

			jwt.sign(token, 'secretkey', {}, (err, token) => {
				jwt.verify(token, 'secretkey', (err, authData) => {
					var path = req.route.path;
					if (err) {
						res.sendStatus(403);
					} else {
						pool.query('SELECT * FROM dmaps.user_credentials WHERE username = ?', [username], function (error, results, fields) {
							if (error) {
								access.sendResponse(req, res, {
									status: 202,
									data: {
										status: false,
										message: 'there is some error with query'
									}
								});
							} else {
								if (results.length > 0) {
									bcrypt.compare(password, results[0].password, function (err, ress) {
										if (ress) {
											pool.query('SELECT * FROM dmaps.user WHERE employee_id = ?', [results[0].username], function (error1, results1, fields1) {
												var resultObj = {};
												if (error1) {
													resultObj = {
														status: false,
														message: 'Could not find the details for the provided username or employee id.'
													}
												} else {
													if (results1.length > 0) {
														if ((results1[0].status === 'Active' || results1[0].status === 'Notice') && results1[0].login_access === 'Enabled') {
															resultObj = {
																status: true,
																message: 'User authentication is successful!',
																role: results[0].user_role,
																empid: results[0].user_name,
																Status: results1[0].status,
																Access: results1[0].login_access,
																token: token
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
													status: false,
													message: "Username and password does not match."
												}
											});
										}
									});
								} else {
									access.sendResponse(req, res, {
										status: 202,
										data: {
											status: false,
											message: "Username does not exist."
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

	var un = req.body.username,
		cp = req.body.Current_Password,
		np = req.body.New_Password;

	knex1.select('id', 'username', 'password')
		.from('aa_hris_users')
		.where('username', un)
		.timeout(100000, { cancel: true })
		.map(function (row) { return row; })
		.then(function (userDetails = []) {
			if (userDetails.length) {
				bcrypt.compare(cp, userDetails[0].password, function (err, ress) {
					if (ress) {
						var salt = bcrypt.genSaltSync(10);
						var hash = bcrypt.hashSync(np, salt);

						knex1('aa_hris_users')
							.where('id', userDetails[0].id)
							.update({
								password: hash,
								last_password_changed_at: knex1.fn.now()
							})
							.then(function (response) {

								res.setHeader('Content-Type', 'application/json');

								access.sendResponse(req, res, {
									status: 200,
									data: {
										result: 'success',
										message: 'Your password has been changed. Please log in again.',
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
								message: 'Current password is not valid to change your password.'
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
						message: 'Sorry, could not change your password. Please contact the administrator.'
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
					message: 'Some error occured. Please contact the administrator.'
				}
			});
		});

});


//login 

routes.post('/login', function (req, res) {
	//const { username, password } = req.body;
	let username = req.body[0].userName;
	let password = req.body[0].password;

	//  let username ="wertyq";
	//  let password = "q";
	var sql = `SELECT * FROM dmaps.company_users WHERE User_Name = '${username}' AND User_Password = '${password}'`;

	if (username !== undefined && password !== undefined) {
		pool.query(sql, [username, password], function (err, results, fields) {
			if (!err) {
				var response = [],
					dataObj = {};
				//console.log("results",results);
				if (results.length > 0) {
					//console.log({"results":results});
					let token = jwtTokenGenerate(password, username)
					dataObj['users'] = results[0];
					response.push({ 'result': 'success', 'data': dataObj, "token": token });

				} else {
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
	else {
		console.log("username and password ");
	}
});

//geneate password



routes.post('/api/forgotPassword', function (req, res) {

	//console.log(req.body);
	 const [{email}] = req.body
	// let email = "q@gmail.com"
	let dbEmail = `Select * from dmaps.company_users where Mail_Id = '${email}'`;

	pool.query(dbEmail, function (err, results, fields) {
		//console.log({"sql":sql});
		//console.log({"err":err});
		if (!err) {
			var response = [],
				dataObj = {};
			//console.log("results",results);
			if (results.length > 0) {
				//console.log({"results":results});

				dataObj['users'] = results[0];
				response.push({ 'result': 'success', 'data': dataObj});
				let newPassword = generateRandomPassword(12)
				let updatedata = {
					User_Password : newPassword
				}
				knex.transaction(function(t) {
					return knex('dmaps.company_users')
					.where({ Mail_Id: email})
					.update(updatedata)
					.then(function(response) {
						//result(null, { "result": response });
					})
					.then(t.commit)
					.catch(t.rollback)
				})
				.catch(function(error) {
					console.log(error);
				})
				const secret = JWT_SECRET;
				const token = jwt.sign({ email: dataObj.Mail_Id, id: dataObj.User_Employee_Id }, secret, {
					expiresIn: "24m",
				});
				//const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
				var transporter = nodemailer.createTransport({
					service: "gmail",
					auth: {
						user: "developer.dmaps@gmail.com",
						pass: "cmxw tzvu ftvf cpqh",
					},
				});

				var mailOptions = {
					from: "developer.dmaps@gmail.com",
					to: email,
					subject: "Password Reset",
					text: `Hi your password is ${newPassword}`,
				  };
			  
				  transporter.sendMail(mailOptions, function (error, info) {
					if (error) {
					  console.log(error);
					} else {
					  console.log("Email sent: " + info.response);
					}
				  });
			  




			} else {
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

	// knex1.select('id', 'username', 'password')
	// .from('aa_hris_users')
	// .where('username', un)
	// .timeout(100000, {cancel: true})
	// .map(function (row) { return row; })
	// .then(function(userDetails = []){
	//   if ( userDetails.length ) {
	//     bcrypt.compare(cp, userDetails[0].password, function(err, ress) {
	//       if ( ress ) {
	//         var salt = bcrypt.genSaltSync(10);
	//         var hash = bcrypt.hashSync(np, salt);

	//         knex1('aa_hris_users')
	//         .where('id', userDetails[0].id)
	//         .update({
	//           password: hash,
	//           last_password_changed_at: knex1.fn.now()
	//         })
	//         .then(function(response){

	//           res.setHeader('Content-Type', 'application/json');

	//           access.sendResponse(req, res, {
	//             status: 200,
	//             data: {
	//               result: 'success',
	//               message:'Your password has been changed. Please log in again.',
	//             }
	//           });
	//           var msg = 'Your password has been changed. Please log in again.';
	//           // access.logUserActivity(req.authData, msg);
	//         });
	//       } else {
	//         var msg = 'Current password is not valid to change your password.';
	//         // access.logUserActivity(req.authData, msg);
	//         res.setHeader('Content-Type', 'application/json');

	//         access.sendResponse(req, res, {
	//           status: 200,
	//           data: {
	//             result: 'failure',
	//             message:'Current password is not valid to change your password.'
	//           }
	//         });

	//       }
	//     });
	//   } else {
	//     var msg = 'Sorry, could not change your password. Please contact the administrator.'
	//     // access.logUserActivity(req.authData, msg);
	//     res.setHeader('Content-Type', 'application/json');

	//     access.sendResponse(req, res, {
	//       status: 200,
	//       data: {
	//         result: 'failure',
	//         message:'Sorry, could not change your password. Please contact the administrator.'
	//       }
	//     });
	//   }
	// })
	// .catch(function (err) {
	//   console.log('Error: %s', err.toString());
	//   var msg = 'Some error occured. Please contact the administrator.';
	//   // access.logUserActivity(req.authData, msg);
	//   res.setHeader('Content-Type',.sendResponse(req, res, {
	//     status: 202,
	//     data: {
	//       result: 'failure',
	//       message:'Some error occured. Please contact the administrator.'
	//     }
	//   });
	// });

});

routes.post('/changePassword', function (req, res) {
	// let userName = "wert";
	// let currentPassword ="2345678qwertuiopzxcvbnm"
	// let newPassword ="Hello"
	//const [{currentPassword,newPassword,token,username}] = req.body[0]
	let currentPassword = req.body[0].currentPassword
	let newPassword = req.body[0].newPassword
	let username = req.body[0].userName
	let token =req.body[0].token
	// jwt.verify(token, JWT_SECRET, (err, decoded) => {
	// 	if (err) {
	// 	  return res.status(401).json({ message: 'Invalid token' });
	// 	}
		
	// 	req.user = decoded;
	// 	console.log("req.user",req.user.username);
		var response = []
		if(username) {
			var sql = `SELECT * FROM dmaps.company_users WHERE User_Name = '${username}'`;
			pool.query(sql, [username], function (err, results, fields) {
				//console.log({"err":err});
				if (!err) {
					
					let dataObj = {};
					//console.log("results",results);
					if (results.length > 0) {
						//console.log({"results":results});
						// let token = jwtTokenGenerate(password, username)
						dataObj['users'] = results[0];
						const { users: { User_Password } } = dataObj;
						if (currentPassword === User_Password) {
							let updatedata= {User_Password:newPassword}
							knex.transaction(function(t) {
								return knex('dmaps.company_users')
								.where({ User_Name: username})
								.update(updatedata)
								.then(function(response) {
									//result(null, { "result": response });
									//responses.push({ 'result': 'success', 'message':'Password Changed Successfully'});
								})
								.then(t.commit)
								.catch(t.rollback)
							})
							.catch(function(error) {
								console.log(error);
							})
							response.push({ 'result': 'success', 'message':'Password Changed Successfully'})
						}
						else{
							response.push({ 'status': 'error', 'msg': 'Current Password is Invalid',});
						}
						
	
					} else {
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
		else {
			response.push({ 'result': 'error', 'msg': 'Enter a valid usernamed' });
		}
 	  });

	
	
	
	
	
		
	
	
// });


// Export it.
module.exports = routes;
