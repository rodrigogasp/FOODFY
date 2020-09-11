const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rodrigogaspp@gmail.com",
      pass: "foodfytest"
    }
  });


  module.exports = transport 