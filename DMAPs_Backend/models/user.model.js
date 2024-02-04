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


  const sendWelcomeEmail = (email,username, password, unitname, role) => {
    var mailOptions = {
        from: "developer.dmaps@gmail.com",
        to: email,
        subject: "Welcome to DMAPs",
        // text: `We have shared the login credentials to access DMAPs.\n Username: ${username} \n Password: ${password}`,
        text: `Hi ${username},\n Hope this email finds you well. We are excited to invite you to ${unitname} as ${role}. Please <a href="http://3.92.91.120:4001/DMAPs/login" target="_blank"> click here</href> to login to the application by using the credentials below:
        Login: ${username} \n
        Password: ${password} \n
        Please remember to change your password after the first login and update your profile. \n
        Thank you \n
        DMAPs IT Team`
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
    let userData = data[0];
    let username = userData.User_Name;
    let Unit_Name = userData.Unit_Name;
    let Role = userData.User_Role;
    const emailParts = userData.Mail_Id.split('@');
    const userPassword = emailParts[0];
    const updatedData = { ...userData, User_Password: userPassword };
    
    knex.transaction(function(t) {
        return knex('dmaps.company_users')
        .transacting(t)
        .insert(updatedData)
        .then(function(response) {
             sendWelcomeEmail(userData.Mail_Id,username,userPassword, Unit_Name,Role )
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