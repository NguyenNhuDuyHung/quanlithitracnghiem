import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import mongoose from 'mongoose'
import { CaslAbilityFactory } from './casl/casl-ability.factory'
import { AccessTokenAuthGuard } from './auth/passport/access-auth.guard'
import { AbilitiesGuard } from './auth/passport/abilities.guard'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // mongoose.set('debug', true)

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // automatically transform the request body to the DTO type
    })
  ) // auto validation of DTOs

  const configService = app.get(ConfigService)
  const port = configService.get('PORT')

  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  app.setGlobalPrefix('api/v1', { exclude: [''] })

  const reflector = app.get(Reflector)
  const caslAbilityFactory = app.get(CaslAbilityFactory)

  app.useGlobalGuards(
    new AccessTokenAuthGuard(reflector),
    new AbilitiesGuard(reflector, caslAbilityFactory)
  )

  await app.listen(port)
}

bootstrap()
