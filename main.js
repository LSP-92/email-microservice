"use strict";
require("dotenv").config();

const amqpConnectPromise = require("./AMQPconnect");
const testEmail = require("./lib/filterData");
const sendMailDynamicTemplate = require("./senderMail");

const queueName = process.env.QUEUENAME;

/**
 * @async @function
 * @description Funcion Async inicializa el flujo mensajes
 * Recibe un JSON como mensaje con los datos necesarios para enviar el email
 *   {
 *      "to": "email receptor",
 *      "subject": "asunto",
 *      "idTemaple": "id plantilla",
 *      "dinamicContent": {
 *        "var1": "var1",
 *        "var2": "var2",
 *         "var3": "var3"
 *       }
 *    }
 * Llama a la funcion de envio de email
 *
 *
 * @returns void
 */

(async function () {
  try {
    const conn = await amqpConnectPromise;
    const channel = await conn.createChannel();

    await channel.assertQueue(queueName, {
      durable: true,
    });

    channel.prefetch(1);

    channel.consume(queueName, (msg) => {
      const inputMessage = JSON.parse(msg.content.toString("utf8"));
      console.log(inputMessage)
      
      sendMailDynamicTemplate(inputMessage).then((data) => {
        console.log(data);
      }).catch((err) => {
        console.log(err)
        
      })

      if (testEmail(inputMessage) > 0) {
        //TODO mandar correo al remitente avisando del error
      }

      if (testEmail(inputMessage) === 2) {
        //TODO mandar correo al administrador avisando del error
      }

      channel.ack(msg);
    });
  } catch (err) {
    const error = new Error("Error queue, server no response");
    error.status = 500;
    console.log(err);
    // TODO mandar email al administrador avisando del error
  }
})();
