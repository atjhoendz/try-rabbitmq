const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, conn) => {
  if (err) throw err;

  conn.createChannel((err, channel) => {
    if (err) throw err;

    const queue = "WorkQueue";

    channel.assertQueue(queue, {
      durable: true,
    });

    channel.prefetch(1);

    console.log(" [*] Waiting for message in %s. To exit press CTRL+C", queue);

    channel.consume(
      queue,
      (msg) => {
        const secs = msg.content.toString().split(".").length - 1;

        console.log(" [x] Received: %s", msg.content.toString());

        setTimeout(() => {
          console.log(" [x] Done");
        }, secs * 1000);
      },
      {
        noAck: true,
      }
    );
  });
});
