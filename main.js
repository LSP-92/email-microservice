"use strict";
require("dotenv").config();

const amqpConnectPromise = require("./AMQPconnect");
const queueName = process.env.QUEUENAME;

(async function () {
  try {
    const conn = await amqpConnectPromise;
    const channel = await conn.createChannel();

    await channel.assertQueue(queueName, {
      durable: true,
    });

    channel.prefetch(1);

    channel.consume(queueName, (msg) => {
      console.log(msg)
      
      channel.ack(msg);
    });
  } catch (err) {
    const error = new Error("Error queue, server no response");
    error.status = 500;
    console.log(error);
  }
}
)()