const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.emailSender);

const creteMessage = (to, subject, idTemplate, dynamic) => {
  return {
    to: to,
    from: "test@example.com",
    subject: subject,
    template_id: idTemplate,
    ["dynamic_template_data"]: dynamic,
  };
};

module.exports = (to, subject, idTemplate, dynamic) =>
  sgMail.send(creteMessage(to, subject, idTemplate, dynamic));