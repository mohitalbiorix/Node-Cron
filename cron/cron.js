const User = require("../models/user");
const config = require("../config/config");
const nodemailer = require("nodemailer");
const cron = require("node-cron");

const sendMailToAllUsers = async (emailJob) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    requireTLS: true,
    auth: {
      user: config.emailUser,
      pass: config.emailPassword,
    },
    tls: {
        rejectUnauthorized: false
      }
  });

  const mailOptions = {
    from: "Node project",
    to: "alborix@protonmail.com",
    subject: "Cron test mail",
    html: "<p>This is cron testing mail</p>",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Mail has been sent:-", info.response);
    }
  });
};

const senMailAllUser = () => {
  try {
    cron.schedule("* * * * * *", async () => {
      var userData = await User.find({});
      if (userData.length > 0) {
        var emails = [];
        userData.map((user) => {
          emails.push(user.email);
        });

        sendMailToAllUsers(emails);
        console.log(emails);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  senMailAllUser,
};
