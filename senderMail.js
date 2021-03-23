const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.emailSender);

const createMessage = (to, idTemplate, dynamic) => {

  return {
    to: to,
    from: process.env.EMAIL,
    templateId: process.env[idTemplate],
    dynamicTemplateData: dynamic,
  };
};

module.exports = ({ to, templateId, dynamicTemplateData }) => {
  return sgMail.send(createMessage(to, templateId, dynamicTemplateData));
};

//{email desde tesorero cuando realiza registrta el pago de usuario}
//
