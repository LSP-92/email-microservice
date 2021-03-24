const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.emailSender);

const createMessage = (to, idTemplate, dynamic) => {
  return {
    to: to,
    subject:"egestion",
    from: process.env.EMAIL,
    templateId: idTemplate,
    dynamicTemplateData: dynamic,
  };
};

module.exports = ({ to, templateId, dynamicTemplateData }) => {
  console.log(createMessage(to, templateId, dynamicTemplateData))
  
  return sgMail.send(createMessage(to, templateId, dynamicTemplateData));
};


