"use strict";

const sgMail = require("@sendgrid/mail");
const templateError = require("./templates/templateError");

sgMail.setApiKey(process.env.emailSender);

const createErrorMessage = (to, message = "") => {
  return {
    to: to,
    from: process.env.EMAIL,
    subject: "Error Email Microservice",
    html: templateError(message),
  };
};

module.exports = (to, message) => {
  return sgMail.send(createErrorMessage(to, message));
};
