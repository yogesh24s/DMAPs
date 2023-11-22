// constructor
const CompanyUsers = function(companyUsers) {}

const path = require('path');

// Load dependencies
var access = require('../var.js');
var nodemailer = require("nodemailer");
access.DMAPFunc();

// const nodemailer = require('nodemailer');
// const { google } = require('googleapis');
// const CLIENT_ID = '1084623199907-r8suonc5a3fba1mgmlecrrvsgb7enti4.apps.googleusercontent.com';
// const CLIENT_SECRET = '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';
// const REDIRECT_URI = 'http://localhost';
// const oAuth2Client = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLIENT_SECRET,
//     REDIRECT_URI
//   );
  
  
  

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'developer.dmaps@gmail.com',
      pass: 'cmxw tzvu ftvf cpqh',
    },
  });
  const sendWelcomeEmail = (email,username, password) => {
    var mailOptions = {
        from: "developer.dmaps@gmail.com",
        to: email,
        subject: "Welcome to DMAPS",
        text: `We have shared the login credentials to access DMAPs.\n Username: ${username} \n Password: ${password}`,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
  };
  
CompanyUsers.getCompanyUsers = result => {
    sql =`SELECT * FROM dmaps.company_users;`;
    pool.query(sql, function(err, res) {
        if (err) {
            result(null, err);
            return;
        }
        dataObj = {};
        dataObj['Company_Users'] = res;
        result(null, dataObj);
    });
};

CompanyUsers.editCompanyUsers = result => {
    console.log({"result":data[0].Unit_Short_Name});
    const userData = data[0]; // Get the first item from the data array
    const updateData = {
        User_Name: userData.User_Name,
        User_Employee_Id: userData.User_Employee_Id,
        User_Login_ID: userData.User_Login_ID,
        Department_Id: userData.Department_Id,
        Designation_Id: userData.Designation_Id,
        Mobile_Num: userData.Mobile_Num,
        Mail_Id: userData.Mail_Id,
        status: userData.status,
        User_Role: userData.User_Role,
    };

    if (!userData) {
        // Handle the case where data[0] doesn't exist
        result("No data to update", null);
        return;
    }

    knex.transaction(function(t) {
        return knex('dmaps.company_users')
        .where({ User_Employee_Id: userData.User_Employee_Id })
        .update(updateData)
        .then(function(response) {
            result(null, { "result": response });
        })
        .then(t.commit)
        .catch(t.rollback)
    })
    .catch(function(error) {
        console.log(error);
    })
}


CompanyUsers.saveCompanyUsers = result => {
    //console.log({data : data.Mail_Id});
    let userData = data[0]
    let username = userData.User_Name
    const emailParts = userData.Mail_Id.split('@');
    console.log({"emailParts":emailParts});
    const userPassword = emailParts[0];
    console.log({"userPassword":userPassword});
    const updatedData = { ...userData, User_Password: userPassword };
   // data.User_Password=userPassword
    console.log({"updatedData":updatedData});
    
    knex.transaction(function(t) {
        return knex('dmaps.company_users')
        .transacting(t)
        .insert(updatedData)
        .then(function(response) {
            console.log("email",userData.Mail_Id);
             sendWelcomeEmail(userData.Mail_Id,username,userPassword)
            result(null, { "result": response });
        })
        .then(t.commit)
        .catch(t.rollback)
    })
    .catch(function(error) {
        console.log(error);
    })

}

CompanyUsers.deleteCompanyUsers = result => {
    const unitData = data[0]; // Get the first item from the data array

    knex.transaction(function(t) {
        return knex('dmaps.company_users')
        .where({ User_Employee_Id: unitData.User_Employee_Id})
        .del()
        .then(function(response) {
            result(null, { "result": response });
        })
        .then(t.commit)
        .catch(t.rollback)
    })
    .catch(function(error) {
        console.log(error);
    })
}
    

module.exports = CompanyUsers;