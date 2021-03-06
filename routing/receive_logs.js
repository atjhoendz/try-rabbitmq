const amqp = require("amqplib/callback_api");

const args = process.argv.slice(2);

if (args.length == 0) {
  console.log("Usage: receive_logs.js [info] [warning] [error]");
  process.exit(1);
}

amqp.connect("amqp://localhost", (err, conn) => {
  if (err) throw err;

  conn.createChannel((err, channel) => {
    if (err) throw err;

    const exchange = "direct_logs";

    channel.assertExchange(exchange, "direct", {
      durable: false,
    });

    channel.assertQueue(
      "",
      {
        exclusive: true,
      },
      (err, q) => {
        if (err) throw err;

        console.log(
          " [*] Waiting for message in %s. To exist press CTRL+C",
          q.queue
        );

        args.forEach((severity) => {
          channel.bindQueue(q.queue, exchange, severity);
        });

        channel.consume(
          q.queue,
          (msg) => {
            console.log(
              " [x] Received %s: '%s'",
              msg.fields.routingKey,
              msg.content.toString()
            );
          },
          {
            noAck: true,
          }
        );
      }
    );
  });
});
