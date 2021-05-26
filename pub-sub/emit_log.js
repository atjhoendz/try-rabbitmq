const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, conn) => {
  if (err) throw err;

  conn.createChannel((err, channel) => {
    if (err) throw err;

    const exchange = "logs";
    const msg = process.argv.slice(2).join(" ") || "Hello World!";

    channel.assertExchange(exchange, "fanout", {
      durable: false,
    });

    channel.publish(exchange, "", Buffer.from(msg));

    console.log(" [x] Sent %s", msg);
  });

  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
});
