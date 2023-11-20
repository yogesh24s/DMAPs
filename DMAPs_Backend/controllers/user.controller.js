const CompanyUsers = require("../models/user.model.js");

exports.getCompanyUsers = (req, res) => {

    CompanyUsers.getCompanyUsers((err, data) => {
        if (err)
            res.send({
                message:
                    err.message || "Some error occured while retrieving assetTypes"
            });
        else {
            res.send(data);
        }
    });
};

exports.saveCompanyUsers = (req, res) => {
    data = req.body;
    const { User_Profile } = data;

// Decode base64 content and create a buffer
const fileBuffer = Buffer.from(User_Profile, 'base64');

// Create a unique filename
const fileName = Date.now() + '-uploaded-file';

// Specify the directory where you want to store the uploaded files
const uploadDirectory = 'C:\\Users\\Gourav Tewary\\Documents\\Dmaps-git\\DMAPs\\DMAPs_Frontend\\src\\upload';
const filePath = path.join(uploadDirectory, fileName);

// Write the buffer to a file
fs.writeFileSync(filePath, fileBuffer);

// Update the data object with the file path
data.User_Profile = filePath;


    CompanyUsers.saveCompanyUsers((err, data) => {
        if (err) {
            res.send({
                message:
                    err.message || "Some error occured while retrieving assetTypes"
            });
        }
        else {
            res.send({ "result": "Company Users are saved successfully", "data": data });
        }
    });
};