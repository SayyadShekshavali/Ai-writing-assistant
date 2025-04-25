const UserModel = require("../models/usermodel");
const { oauth2client } = require("../utils/googleconfig");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const googlelogin = async (req, res) => {
  try {
    const { code } = req.query;
    if (code) {
      const googleRes = await oauth2client.getToken(code);
      oauth2client.setCredentials(googleRes);
      const userRes = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${googleRes.tokens.access_token}`
      );
      const { email, name, picture } = userRes.data;

      let user = await UserModel.findOne({ email });
      if (!user) {
        user = await UserModel.create({ name, email, image: picture });
      }
      const { _id } = user;
      const token = jwt.sign({ _id: user._id, email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIMEOUT,
      });
      return res.status(200).json({ message: "Success", token, user });
    }
    if (email && name && loginType === "manual") {
      let user = await UserModel.findOne({ email });
      if (!user) {
        user = await UserModel.create({ name, email, image: "" });
      }

      const token = jwt.sign({ _id: user._id, email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIMEOUT,
      });

      return res
        .status(200)
        .json({ message: "Manual login success", token, user });
    }

    return res.status(400).json({ message: "Invalid login request" });
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { googlelogin };
