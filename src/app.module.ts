import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { TelegramBotService } from './telegram-bot/telegram-bot.service';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://julasweta:19731971@cluster0.p7h90ut.mongodb.net/scrambler',
    ),
    TelegramBotModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService, TelegramBotService],
})
export class AppModule {}
