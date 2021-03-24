const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.emailSender);

const createMessage = (to, idTemplate, dynamic) => {
  return {
    to: to,
    from: process.env.ADMIN_EMAIL,
    templateId: idTemplate,
    dynamicTemplateData: dynamic.data,
  };
};

module.exports = ({ to, templateId, dynamicTemplateData }) => {
  return sgMail.send(createMessage(to, templateId, dynamicTemplateData));
};
