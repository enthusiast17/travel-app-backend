import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CountriesModule } from './countries/countries.module';
import { RatesModule } from './rates/rates.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    CountriesModule,
    RatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
