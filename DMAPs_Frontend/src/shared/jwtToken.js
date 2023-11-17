
import jwt from 'jsonwebtoken';

const generateToken = (payload) => {
//   const payload = {
//     username: username, 
//     password: password, 
//   };


  const secretKey = 'fd3991ffa221a66c463b958dfedb6a72adaab45b9bf9e0ce93a29e338744bd9f'; // Same secret key used on the server

  const options = {
    expiresIn: '24h', // Token expiration time
  };

  const token = jwt.sign(payload, secretKey, options);
  console.log({"token":token});
  return token;
};

export default generateToken
