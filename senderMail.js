const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.emailSender);

const createMessage = (to, from, idTemplate, dynamic) => {

  return {
    to: to,
    from: from,
    templateId: idTemplate,
    dynamicTemplateData: dynamic,
  };
};

module.exports = ({ to, from, templateId, dynamicTemplateData }) => {
  return sgMail.send(createMessage(to, from, templateId, dynamicTemplateData));
};

//{email desde tesorero cuando realiza registrta el pago de usuario}
//
