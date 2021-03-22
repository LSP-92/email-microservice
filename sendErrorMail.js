const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.emailSender);

const createErrorMessage = (to, from, message) => {
  return {
    to: to,
    from: from,
    subject: "Error Email Microservice",
    html: `
      <h1>
      Error en el envio del correo,
      succedio algo inesperado, por favor
      contacte con el administrador
      </h1>
      <br>
      <p>
      No se ha podido enviar su correo,
      revise los datos de envio y 
      vuelva a intentarlo más tarde
      </p>
      <br>
      <pre>${message}</pre>`,
  };
};


module.exports = (to, from, message) => {
  
  return sgMail.send(createErrorMessage(to, from, message));
 }