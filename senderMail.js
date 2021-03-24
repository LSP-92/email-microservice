const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.emailSender);

const createMessage = (to, idTemplate, dynamic) => {
  return {
    to: to,
    subject:process.env.SUBJECT,
    from: process.env.EMAIL,
    templateId: idTemplate,
    dynamicTemplateData: dynamic,
  };
};

module.exports = ({ to, templateId, dynamicTemplateData }) => {
  return sgMail.send(createMessage(to, templateId, dynamicTemplateData));
};


