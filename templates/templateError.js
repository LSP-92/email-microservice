"use strict";

module.exports = (data) => {
  `
  <h1 style="text-align: left !important;">
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
  
  <pre>${data}</pre>`;
};
