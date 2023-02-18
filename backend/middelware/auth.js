const jwt = require("jsonwebtoken");

exports.cookieJwtAuth = (req, res, next) => {
  const headers = req.headers["authorization"];
  const token = headers.split(" ");
  const bearertoken = token[1];
  jwt.verify(bearertoken, "process.env.MY_SECRET", (err, payload) => {
    if (err) {
      return res.status(401).send("invalidtoken");
    }
    req.payload = payload;
    next();
  });
};
