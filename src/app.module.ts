import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { UserCataloguesModule } from './user_catalogues/user_catalogues.module'
import { ClassGroupModule } from './class_group/class_group.module'
import { PermissionsModule } from './permissions/permissions.module'
import { CaslModule } from './casl/casl.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService], // inject the ConfigService to access the configuration values
    }),
    UsersModule,
    AuthModule,
    UserCataloguesModule,
    ClassGroupModule,
    PermissionsModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
