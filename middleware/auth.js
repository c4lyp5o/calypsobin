const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = process.env;

function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.render("404");
  }

  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}
  
module.exports = verifyToken;