const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, conn) => {
  if (err) throw err;

  conn.createChannel((err, channel) => {
    if (err) throw err;

    const queue = "HelloQueue";

    channel.assertQueue(queue, {
      durable: false,
    });

    console.log("[*] Waiting for message in %s. To exist press CTRL+C", queue);

    channel.consume(
      queue,
      (msg) => {
        console.log("[x] Received: %s", msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  });
});
