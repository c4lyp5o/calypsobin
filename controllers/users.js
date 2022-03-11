const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUserForm = async (req, res, next) => {
    res.render('register');
};

exports.registerUser = async (req, res, next) => {    
    try {
    // get details from body
    const { userName, password } = req.body;
    if (!(userName && password)) {
      res.status(400).send("All input is required");
    }
    console.log(userName, password);
    // check if user exist
    const oldUser = await User.findOne({ user_name: userName });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);
    // Create user in our database
    const user = await User.create({
      user_name: userName,
      password: encryptedPassword,
    });
    // Create token
    const token = jwt.sign(
      { user_id: user._id, user_name: user.user_name },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    // return new user
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
}

exports.loginUserForm = async (req, res, next) => {
    res.render('login');
}

exports.loginUser = async (req, res, next) => {
  try {
    // Get user input
    const { userName, password } = req.body;
    // Validate user input
    if (!(userName && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const valUser = await User.findOne({ user_name: userName });
    
    if (valUser == null) {
      return res.status(409).send("User does not exist");
    }

    if (valUser && (await bcrypt.compare(password, valUser.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: valUser._id, user_name: valUser.user_name },
        process.env.TOKEN_KEY,
        {
          algorithm: "HS256",
          expiresIn: "5m",
        }
      );
      // save user token
      valUser.token = token;
      
      // give cookie to user with auth token, please adjust the expiry time
      res.cookie("token", token, { maxAge: 300000 });
      return res.redirect('/users/welcome');
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
}

exports.welcome = async (req, res, next) => {
    res.render('welcome', { title: `Hey  ${req.user.user_name}`, userIn: req.user.user_name });
}

exports.logMeOut = async (req, res, next) => {
  console.log('Logging you out');
  res.clearCookie("token");
  res.redirect("/");
};