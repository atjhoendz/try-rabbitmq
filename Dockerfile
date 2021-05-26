FROM rabbitmq:management

RUN apt update && apt install -y curl

RUN curl -L https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/3.8.9/rabbitmq_delayed_message_exchange-3.8.9-0199d11c.ez > rabbitmq_delayed_message_exchange.ez && mv rabbitmq_delayed_message_exchange.ez /opt/rabbitmq/plugins/

RUN rabbitmq-plugins enable rabbitmq_delayed_message_exchange

EXPOSE 15672 5672