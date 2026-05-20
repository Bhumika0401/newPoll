 const Response = require("../models/Response");




exports.getAnalytics = async (req, res) => {
  try {

    // logic

  } catch (err) {

    res.status(500).json({
      msg: err.message
    });

  }
};