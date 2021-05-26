const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, conn) => {
  if (err) throw err;

  conn.createChannel((err, channel) => {
    if (err) throw err;

    const queue = "HelloQueue";
    const msg = "Hello World!";

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(msg));

    console.log("[x] sent %s", msg);
  });

  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
});
