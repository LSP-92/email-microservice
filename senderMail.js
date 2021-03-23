const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.emailSender);

const createMessage = (to, idTemplate, dynamic) => {
  console.log(process.env.EMAIL)
  return {
    to: to,
    from: process.env.EMAIL,
    templateId: idTemplate,
    dynamicTemplateData: dynamic,
  };
};

module.exports = ({ to, templateId, dynamicTemplateData }) => {
  return sgMail.send(createMessage(to, templateId, dynamicTemplateData));
};

//{email desde tesorero cuando realiza registrta el pago de usuario}
//
