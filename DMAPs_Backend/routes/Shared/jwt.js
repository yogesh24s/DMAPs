
const jwt = require('jsonwebtoken');

const secretKey = 'fd3991ffa221a66c463b958dfedb6a72adaab45b9bf9e0ce93a29e338744bd9f';

function jwtTokenGenerate (password, username) {
    const token = jwt.sign({ password: password, username: username }, secretKey, { expiresIn: '24h' });
    //res.json({ token });
    console.log({"token":token});
    return token;
}

function verifyToken(req, res, next) {
	console.log("Entering function ",req );
	const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    // console.log('Authorization Header:', req.headers.authorization);

    console.log({"verifytoken":token});
	if (!token) {
	  return res.status(401).json({ message: 'Unauthorized' });
	}
  
	jwt.verify(token, secretKey, (err, decoded) => {
	  if (err) {
		return res.status(401).json({ message: 'Invalid token' });
	  }
  
	  req.user = decoded;
	  console.log("req.user",req.user);
	  next();
	});
  }
  

  module.exports = {
    jwtTokenGenerate,
    verifyToken
};

