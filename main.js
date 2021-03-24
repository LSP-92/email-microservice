'use strict';

require('dotenv').config();

const amqpConnectPromise = require('./AMQPconnect');
const testEmail = require('./lib/filterData');
const sendMailDynamicTemplate = require('./senderMail');
const sendErrorMail = require('./sendErrorMail');

const queueName = process.env.QUEUENAME;
const Email = process.env.ADMIN_EMAIL;


/**
 * @async @function
 * @description Funcion Async inicializa el flujo mensajes
 * Recibe un JSON como mensaje con los datos necesarios para enviar el email
 * {
 *  "to": "email@example.com",
 *  "from": "email@example.com",
 *  "templateId": "xxx-xxx-xxx",
 *  "dynamicTemplateData": {
 *    "subject": "subject",
 *    "name": "string",
 *    "name2": "string"
 *    }
 * }
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
      const inputMessage = JSON.parse(msg.content.toString('utf8'));
      console.log('Email Input' ,'-->', new Date());
      sendMailDynamicTemplate(inputMessage)
        .then((data) => {})
        .catch((err) => {
          sendErrorMail(Email, Email, err.toString())
            .then()
            .catch((err) => console.log(err, '-->', new Date()));
        });

      if (testEmail(inputMessage) === 2) {
        sendErrorMail(Email, Email, '')
          .then(console.log('email al remitente'))
          .catch((err) => console.log(err));
        //TODO mandar correo al remitente avisando del error
      }

      channel.ack(msg);
    });
  } catch (err) {
    const error = new Error('Error queue, server no response');
    error.status = 500;
    console.log(err,'-->', new Date());
    // TODO mandar email al administrador avisando del error
  }
})();
