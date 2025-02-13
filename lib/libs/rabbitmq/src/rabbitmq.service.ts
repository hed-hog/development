import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import * as amqp from 'amqplib';
import { RabbitModuleOptions } from './rabbitmq-module.type';
import { RABBITMQ_MODULE_OPTIONS } from './rabbitmq.consts';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: amqp.Connection;
  private channel: amqp.Channel;
  private debug = false;

  constructor(
    @Inject(RABBITMQ_MODULE_OPTIONS)
    private readonly config: RabbitModuleOptions,
  ) {}

  async log(...args: any[]) {
    if (this.debug) {
      console.log(...args);
    }
  }

  async onModuleInit() {
    if (!this.config.url) {
      throw new Error('URL de conexão com RabbitMQ não fornecida');
    }

    if (this.config.debug) {
      this.debug = true;
    }

    this.log(`Connecting to RabbitMQ at ${this.config.url}...`);

    this.connection = await amqp.connect(this.config.url);
    this.channel = await this.connection.createChannel();
    this.log('RabbitMQ connected and channel initialized');
  }

  async sendToQueue(queue: string, message: object) {
    if (!this.channel) {
      throw new Error('Canal RabbitMQ não inicializado');
    }

    await this.channel.assertQueue(queue, {
      durable: true, // Persistência da fila
    });

    const bufferMessage = Buffer.from(JSON.stringify(message));
    this.channel.sendToQueue(queue, bufferMessage, {
      persistent: true,
    });

    this.log(`Message sent to queue ${queue}:`, message);
  }

  async listenToQueue(queue: string, callback: (message: any) => void) {
    if (!this.channel) {
      throw new Error('Canal RabbitMQ não inicializado');
    }

    this.log(`Listening to queue ${queue}...`);

    this.channel.consume(queue, (msg) => {
      if (msg !== null) {
        const content = msg.content.toString();
        const parsedMessage = JSON.parse(content);

        this.log(`Message received from queue ${queue}:`, parsedMessage);

        // Passa a mensagem para o callback do usuário
        callback(parsedMessage);

        // Confirma o recebimento da mensagem
        this.channel.ack(msg);
      }
    });
  }

  async onModuleDestroy() {
    this.log('Closing RabbitMQ connection...');
    await this.channel.close();
    await this.connection.close();
    this.log(`RabbitMQ connection closed`);
  }
}
