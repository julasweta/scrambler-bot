// telegram-bot.service.ts

import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramBotService {
  private bot: TelegramBot;

  constructor() {
    this.bot = new TelegramBot(
      '7033822102:AAEXG8qnWCDh5iVpqOYDqbgPegs1mjyLTHM', // Ваш токен бота
      { polling: true },
    );

    this.setupListeners();
  }

  private setupListeners() {
    this.getWebhookInfo();
    this.deleteWebhook();
    this.bot.onText(/\/start|(.+)/, (msg) => {
      const chatId = msg.chat.id;
      this.sendMenu(chatId);
    });

    this.bot.onText(/\/contacts/, (msg) => {
      const chatId = msg.chat.id;
      this.sendContacts(chatId);
    });

    this.bot.onText(/\/locations/, (msg) => {
      const chatId = msg.chat.id;
      this.sendLocations(chatId);
    });

    this.bot.onText(/Меню/, (msg) => {
      const chatId = msg.chat.id;
      this.sendOrderOptions(chatId);
    });

    // Add more handlers for other options...
  }

  private sendMenu(chatId: number) {
    const menuOptions = {
      reply_markup: JSON.stringify({
        keyboard: [['Меню'], ['Контакти'], ['Наші адреси']],
        resize_keyboard: true,
      }),
    };

    this.bot.sendMessage(chatId, 'Виберіть опцію:', menuOptions);
  }

  private sendContacts(chatId: number) {
    this.bot.sendMessage(chatId, 'Контактна інформація');
  }

  private sendLocations(chatId: number) {
    this.bot.sendMessage(chatId, 'Наші адреси');
  }

  private sendOrderOptions(chatId: number) {
    const orderOptions = {
      reply_markup: JSON.stringify({
        keyboard: [['Замовити каву'], ['Замовити салат'], ['Замовити бургер']],
        resize_keyboard: true,
      }),
    };

    this.bot.sendMessage(
      chatId,
      'Виберіть, що ви хочете замовити:',
      orderOptions,
    );
  }

  public getWebhookInfo(): void {
    this.bot
      .getWebHookInfo()
      .then((info) => {
        console.log(info);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public deleteWebhook(): void {
    this.bot
      .deleteWebHook()
      .then(() => {
        console.log('Webhook successfully deleted');
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
