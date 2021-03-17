const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.emailSender);

const creteMessage = (to, from, idTemplate, dynamic) => {
  console.log(to, idTemplate, dynamic)
  
  return ({
    to: to,
    from: from,
    templateId: idTemplate,
    dynamicTemplateData:
    dynamic,
  })
};

module.exports = ({ to, from, templateId, dynamicTemplateData }) => {
  
  return sgMail.send(creteMessage(to, from, templateId, dynamicTemplateData));
 }


//{email desde tesorero cuando realiza registrta el pago de usuario}
// 